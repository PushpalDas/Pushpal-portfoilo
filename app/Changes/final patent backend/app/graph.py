"""Microsoft Graph client: auth, share-URL resolution, download, workbook range updates."""
import base64
import re
import time
import urllib.parse

import requests

GRAPH = "https://graph.microsoft.com/v1.0"


class GraphError(RuntimeError):
    pass


class GraphNetworkError(GraphError):
    """No connectivity to Microsoft (DNS failure, connection reset, timeout)."""


def _share_id(url: str) -> str:
    return "u!" + base64.urlsafe_b64encode(url.encode()).decode().rstrip("=")


def _sourcedoc_guid(url: str) -> str | None:
    m = re.search(r"sourcedoc=%7B([0-9A-Fa-f-]+)%7D", url) or re.search(
        r"sourcedoc=\{([0-9A-Fa-f-]+)\}", urllib.parse.unquote(url)
    )
    return m.group(1).upper() if m else None


def _site_path(url: str) -> str | None:
    m = re.search(r"https://([^/]+)/personal/([^/]+)/", url)
    return f"{m.group(1)}:/personal/{m.group(2)}" if m else None


def _file_name(url: str) -> str | None:
    q = urllib.parse.parse_qs(urllib.parse.urlparse(url).query)
    return q["file"][0] if "file" in q else None


class GraphClient:
    def __init__(self, tenant_id: str, client_id: str, client_secret: str):
        self.tenant_id = tenant_id
        self.client_id = client_id
        self.client_secret = client_secret
        self._token = None
        self._token_exp = 0.0
        self._resolve_cache: dict[str, dict] = {}

    # ---------- auth ----------

    def _get_token(self) -> str:
        if self._token and time.time() < self._token_exp - 120:
            return self._token
        for attempt in range(3):
            try:
                r = requests.post(
                    f"https://login.microsoftonline.com/{self.tenant_id}/oauth2/v2.0/token",
                    data={
                        "client_id": self.client_id,
                        "client_secret": self.client_secret,
                        "scope": "https://graph.microsoft.com/.default",
                        "grant_type": "client_credentials",
                    },
                    timeout=30,
                )
                break
            except (requests.ConnectionError, requests.Timeout) as e:
                if attempt == 2:
                    raise GraphNetworkError(f"cannot reach login.microsoftonline.com: {str(e)[:200]}") from e
                time.sleep(2**attempt)
        if r.status_code != 200:
            raise GraphError(f"token request failed: {r.status_code} {r.text[:300]}")
        data = r.json()
        self._token = data["access_token"]
        self._token_exp = time.time() + int(data.get("expires_in", 3600))
        return self._token

    def _request(self, method: str, url: str, *, headers: dict | None = None, retries: int = 4, **kw):
        h = {"Authorization": f"Bearer {self._get_token()}"}
        if headers:
            h.update(headers)
        for attempt in range(retries):
            try:
                r = requests.request(method, url, headers=h, timeout=60, **kw)
            except (requests.ConnectionError, requests.Timeout) as e:
                if attempt == retries - 1:
                    raise GraphNetworkError(f"cannot reach graph.microsoft.com: {str(e)[:200]}") from e
                time.sleep(2**attempt)
                continue
            if r.status_code in (429, 502, 503, 504) and attempt < retries - 1:
                wait = int(r.headers.get("Retry-After", "0")) or 2**attempt
                time.sleep(wait)
                continue
            return r
        return r

    # ---------- item resolution ----------

    def resolve_item(self, share_url: str) -> dict:
        """Resolve a SharePoint sharing URL to {drive_id, item_id, etag, last_modified, name}.

        Tries the /shares API first; falls back to searching the owner's OneDrive
        and matching the sourcedoc GUID from the URL against item eTags (some
        Doc.aspx links are not resolvable through /shares with app-only tokens).
        """
        cached = self._resolve_cache.get(share_url)
        if cached:
            r = self._request(
                "GET",
                f"{GRAPH}/drives/{cached['drive_id']}/items/{cached['item_id']}"
                "?$select=id,name,eTag,lastModifiedDateTime",
            )
            if r.status_code == 200:
                d = r.json()
                return {**cached, "etag": d["eTag"], "last_modified": d["lastModifiedDateTime"], "name": d["name"]}
            self._resolve_cache.pop(share_url, None)

        r = self._request(
            "GET",
            f"{GRAPH}/shares/{_share_id(share_url)}/driveItem"
            "?$select=id,name,eTag,lastModifiedDateTime,parentReference",
        )
        if r.status_code == 200:
            d = r.json()
            info = {
                "drive_id": d["parentReference"]["driveId"],
                "item_id": d["id"],
                "etag": d["eTag"],
                "last_modified": d["lastModifiedDateTime"],
                "name": d["name"],
            }
            self._resolve_cache[share_url] = {"drive_id": info["drive_id"], "item_id": info["item_id"]}
            return info

        info = self._resolve_via_search(share_url)
        if info:
            self._resolve_cache[share_url] = {"drive_id": info["drive_id"], "item_id": info["item_id"]}
            return info
        raise GraphError(f"could not resolve share URL ({r.status_code} {r.text[:200]}): {share_url[:120]}")

    def _resolve_via_search(self, share_url: str) -> dict | None:
        site_path = _site_path(share_url)
        fname = _file_name(share_url)
        guid = _sourcedoc_guid(share_url)
        if not (site_path and fname):
            return None
        r = self._request("GET", f"{GRAPH}/sites/{site_path}")
        if r.status_code != 200:
            return None
        site_id = r.json()["id"]
        q = urllib.parse.quote(fname.rsplit(".", 1)[0].replace("'", "''"))
        r = self._request("GET", f"{GRAPH}/sites/{site_id}/drive/root/search(q='{q}')")
        if r.status_code != 200:
            return None
        candidates = [it for it in r.json().get("value", []) if it.get("name") == fname]
        match = None
        if guid:
            match = next((it for it in candidates if guid in it.get("eTag", "").upper()), None)
        if match is None and len(candidates) == 1:
            match = candidates[0]
        if match is None:
            return None
        return {
            "drive_id": match["parentReference"]["driveId"],
            "item_id": match["id"],
            "etag": match["eTag"],
            "last_modified": match["lastModifiedDateTime"],
            "name": match["name"],
        }

    # ---------- content ----------

    def download(self, drive_id: str, item_id: str) -> bytes:
        r = self._request("GET", f"{GRAPH}/drives/{drive_id}/items/{item_id}/content")
        if r.status_code != 200:
            raise GraphError(f"download failed: {r.status_code} {r.text[:300]}")
        return r.content

    # ---------- workbook API ----------

    def create_session(self, drive_id: str, item_id: str) -> str | None:
        r = self._request(
            "POST",
            f"{GRAPH}/drives/{drive_id}/items/{item_id}/workbook/createSession",
            json={"persistChanges": True},
        )
        if r.status_code in (200, 201):
            return r.json().get("id")
        return None

    def close_session(self, drive_id: str, item_id: str, session_id: str | None) -> None:
        if not session_id:
            return
        self._request(
            "POST",
            f"{GRAPH}/drives/{drive_id}/items/{item_id}/workbook/closeSession",
            headers={"workbook-session-id": session_id},
        )

    def clear_range(
        self,
        drive_id: str,
        item_id: str,
        sheet: str,
        address: str,
        session_id: str | None = None,
    ) -> None:
        headers = {"workbook-session-id": session_id} if session_id else {}
        sheet_q = urllib.parse.quote(sheet)
        self._request(
            "POST",
            f"{GRAPH}/drives/{drive_id}/items/{item_id}/workbook/worksheets/{sheet_q}/range(address='{address}')/clear",
            headers=headers,
            json={"applyTo": "Contents"},
        )

    def patch_range(
        self,
        drive_id: str,
        item_id: str,
        sheet: str,
        address: str,
        values: list[list],
        session_id: str | None = None,
    ) -> None:
        headers = {"workbook-session-id": session_id} if session_id else {}
        sheet_q = urllib.parse.quote(sheet)
        url = f"{GRAPH}/drives/{drive_id}/items/{item_id}/workbook/worksheets/{sheet_q}/range(address='{address}')"
        r = self._request("PATCH", url, headers=headers, json={"values": values})
        if r.status_code == 500:
            # Some legacy array-formula remnants make writes fail with a
            # GeneralException; clearing the cell contents first unblocks them.
            self.clear_range(drive_id, item_id, sheet, address, session_id)
            r = self._request("PATCH", url, headers=headers, json={"values": values})
        if r.status_code != 200:
            raise GraphError(f"range update failed [{sheet}!{address}]: {r.status_code} {r.text[:300]}")
