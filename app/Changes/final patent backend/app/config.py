"""Configuration: Azure credentials, source file registry, runtime settings."""
import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

AZURE_TENANT_ID = os.environ["AZURE_TENANT_ID"]
AZURE_CLIENT_ID = os.environ["AZURE_CLIENT_ID"]
AZURE_CLIENT_SECRET = os.environ["AZURE_CLIENT_SECRET"]

# Seconds between automatic change checks. 0 disables the background poller.
POLL_INTERVAL_SECONDS = int(os.getenv("POLL_INTERVAL_SECONDS", "60"))

# Granted patents that are not licensed: shown in the master dashboard as "+NP"
# (e.g. 8 granted -> "5+3P", 50 total -> "47+3P").
UNLICENSED_GRANTED = int(os.getenv("UNLICENSED_GRANTED", "3"))

# Which source the unlicensed granted patents belong to.
# The source's own dashboard and the master's Per-Source Summary row
# will show Granted as "X+YP" instead of a plain number.
UNLICENSED_SOURCE = os.getenv("UNLICENSED_SOURCE", "purdue_kk")

STATE_FILE = BASE_DIR / "state.json"

# Set USE_TEST_FILES=1 in .env to run against the copied test files instead of
# the real ones (both sets defined below).
USE_TEST_FILES = os.getenv("USE_TEST_FILES", "0") == "1"

# The three source workbooks. `label` is what goes into the master's Source column.
PROD_SOURCES = [
    {
        "key": "purdue_kk",
        "label": "Purdue, K&K",
        "share_url": "https://10xar-my.sharepoint.com/:x:/r/personal/shreyas_ixana_ai/_layouts/15/Doc.aspx?sourcedoc=%7BDD15CE15-ADB0-4C5C-92BF-6CC19C485AAA%7D&file=Ixana%20dashboard%20Purdue%2C%20K%26K.xlsx&action=default&mobileredirect=true",
    },
    {
        "key": "metayage",
        "label": "Metayage",
        "share_url": "https://10xar-my.sharepoint.com/:x:/r/personal/shreyas_ixana_ai/_layouts/15/Doc.aspx?sourcedoc=%7B6C6C0CF8-264A-4CD2-A45A-50F634ED536A%7D&file=Ixana%20dashboard%20Metayage.xlsx&action=default&mobileredirect=true",
    },
    {
        "key": "pipf",
        "label": "PIP",
        "share_url": "https://10xar-my.sharepoint.com/:x:/r/personal/shreyas_ixana_ai/_layouts/15/Doc.aspx?sourcedoc=%7BA8561970-EF3A-4F4B-9F5D-3E9995430DC2%7D&file=Ixana%20dashboard%20PIPF.xlsx&action=default&mobileredirect=true",
    },
]

# The consolidated master workbook.
PROD_MASTER = {
    "key": "master",
    "label": "Master",
    "share_url": "https://10xar-my.sharepoint.com/:x:/r/personal/anuj_dubey_ixana_ai/_layouts/15/Doc.aspx?sourcedoc=%7B031AB948-52AD-4BA7-A6B4-D6A7C7739099%7D&file=Ixana%20patents.xlsx&action=default&mobileredirect=true",
}

# Copies used for testing (in anuj_dubey's OneDrive).
TEST_SOURCES = [
    {
        "key": "purdue_kk",
        "label": "Purdue, K&K",
        "share_url": "https://10xar-my.sharepoint.com/:x:/r/personal/anuj_dubey_ixana_ai/_layouts/15/Doc.aspx?sourcedoc=%7BE2AF383C-726C-4ED7-935D-10E98A451658%7D&file=Ixana%20dashboard%20Purdue%2C%20K%26K.xlsx&action=default&mobileredirect=true",
    },
    {
        "key": "metayage",
        "label": "Metayage",
        "share_url": "https://10xar-my.sharepoint.com/:x:/r/personal/anuj_dubey_ixana_ai/_layouts/15/Doc.aspx?sourcedoc=%7B415A2094-A304-4F45-8F0F-CF1743493E5B%7D&file=Ixana%20dashboard%20Metayage.xlsx&action=default&mobileredirect=true",
    },
    {
        "key": "pipf",
        "label": "PIP",
        "share_url": "https://10xar-my.sharepoint.com/:x:/r/personal/anuj_dubey_ixana_ai/_layouts/15/Doc.aspx?sourcedoc=%7BEEBF0119-B9F7-4A48-98EB-C9C0F091C9BD%7D&file=Ixana%20dashboard%20PIPF.xlsx&action=default&mobileredirect=true",
    },
]

TEST_MASTER = {
    "key": "master",
    "label": "Master",
    "share_url": "https://10xar-my.sharepoint.com/:x:/r/personal/anuj_dubey_ixana_ai/_layouts/15/Doc.aspx?sourcedoc=%7B1ABE0E7A-5D04-47CF-9FDE-4D5A1F151079%7D&file=Ixana%20patents.xlsx&action=default&mobileredirect=true",
}

SOURCES = TEST_SOURCES if USE_TEST_FILES else PROD_SOURCES
MASTER = TEST_MASTER if USE_TEST_FILES else PROD_MASTER

# Keep separate sync states for test and prod file sets.
STATE_FILE = BASE_DIR / ("state.test.json" if USE_TEST_FILES else "state.json")
