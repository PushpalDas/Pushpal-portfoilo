# Ixana Patent Dashboard Sync

FastAPI backend that keeps the patent-portfolio Excel files on SharePoint in sync:

- **Sources** (dashboards recomputed in place):
  - `Ixana dashboard Purdue, K&K.xlsx`
  - `Ixana dashboard Metayage.xlsx`
  - `Ixana dashboard PIPF.xlsx`
- **Master** (`Ixana patents.xlsx`): its Patents sheet is rebuilt from all source rows
  (with the `Source` column) and its Dashboard shows the combined totals — refreshed
  whenever any source file changes.

## Counting rules

- A patent that appears as several rows (same title repeated, or a blank-title row
  directly under its parent — e.g. a PCT filing after the non-provisional) counts as
  **one** patent; the **status of the last row** of the group is the patent's status.
  (The only any-row rule: a patent is "ready for grant" if any of its rows mentions
  a notice of allowance in Action Items.)
- All cell updates go through the Microsoft Graph workbook API, so formatting,
  merged cells, and everything else in the files stays untouched. Dashboard count
  cells become computed values (the old live formulas double-counted duplicates).
- Source Patents sheets are never modified.

## Setup

```
pip install -r requirements.txt
```

`.env` (already present) needs:

```
AZURE_TENANT_ID=...
AZURE_CLIENT_ID=...
AZURE_CLIENT_SECRET=...
POLL_INTERVAL_SECONDS=60    # optional; default 60, 0 disables background polling
USE_TEST_FILES=1            # optional; 1 = use the copied test files, 0/absent = real files
```

The app registration needs application permission `Files.ReadWrite.All`
(or `Sites.ReadWrite.All`) with admin consent.

## Run

```
uvicorn app.main:app --host 127.0.0.1 --port 8000
```

## Endpoints

| Method | Path       | What it does |
|--------|------------|--------------|
| GET    | `/health`  | Liveness check |
| GET    | `/stats`   | Dry run — computed deduplicated stats, nothing written |
| GET    | `/status`  | Last sync state (etags, timestamps, last written stats) |
| POST   | `/sync`    | Refresh only if one of the 3 sources changed since last sync |
| POST   | `/refresh` | Force refresh of all dashboards + master |

A background poller runs the equivalent of `/sync` immediately at startup and
then every `POLL_INTERVAL_SECONDS` (default 60s):

- If a **source** file changed, its dashboard is recomputed and the master is
  rebuilt from all three sources.
- If the **master** was edited by anyone else (its eTag no longer matches what
  the backend last wrote), it is treated as drift and rebuilt from the sources —
  the master always matches the three source files.

Change detection uses the files' eTags (stored in `state.json` / `state.test.json`);
the backend's own writes are recorded so they don't retrigger a refresh.
