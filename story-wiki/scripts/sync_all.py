#!/usr/bin/env python3
"""
sync_all.py — Storypedia Bulk Notion Sync
==========================================
Show sync status and optionally trigger syncs for all known stories.

SETUP (one-time):
    Create ~/Desktop/WRITE/story-wiki/.env with your Notion token:
        NOTION_API_TOKEN=secret_xxxxxx...

Usage:
    python3 scripts/sync_all.py                 # Show status table
    python3 scripts/sync_all.py --sync-pending  # Sync all ⚠️  pending stories
    python3 scripts/sync_all.py --sync-all      # Sync everything (+ force)
    python3 scripts/sync_all.py --dry-run       # Preview without writing
    python3 scripts/sync_all.py --help
"""

import json
import os
from datetime import datetime, timezone
from pathlib import Path

WIKI_ROOT   = Path(__file__).parent.parent
STORIES_DIR = WIKI_ROOT / "stories"
SYNC_LOG    = WIKI_ROOT / "sync_log.json"

# ── Known Notion pages (title → notion_id, last_edited, genre) ──────────────
# This is the full manifest from the Notion Synopsis database.
# Ask your AI assistant to update this list when new stories are added.
KNOWN_STORIES = [
    # title                               notion_id                                   last_edited                  genre
    ("The Lost Cafe",                    "2d6d707c-4ce9-8007-a9c6-dfb5deed2d50",    "2025-12-27T04:07:00.000Z", "Psychological Thriller / Drama"),
    ("DRIFT-LANDERS",                    "2d5d707c-4ce9-80b0-8943-eb819d4fe989",    "2026-01-04T16:09:00.000Z", "Action / Racing"),
    ("Poor Cleaner",                     "2d5d707c-4ce9-80a3-bd78-e9293297a3d3",    "2026-03-22T03:57:00.000Z", "Action / Drama"),
    ("Kanban World",                     "330d707c-4ce9-809d-b16e-f6ff5b489920",    "2026-03-27T05:15:00.000Z", "World-Building"),
    ("Gumsum Puppet",                    "2d8d707c-4ce9-808d-ac6c-eb33edceeb68",    "2025-12-30T07:54:00.000Z", "Drama"),
    ("Amarta",                           "2d8d707c-4ce9-808a-949b-d20d5bf0c65f",    "2025-12-30T03:17:00.000Z", "Drama"),
    ("Lvl 3 Power",                      "2d5d707c-4ce9-80f8-8f53-c335c387ba79",    "2026-02-16T08:02:00.000Z", "Action / Fantasy"),
    ("Burning Punches and Frozen Kicks", "2d5d707c-4ce9-81d6-b667-e961734122a0",    "2025-12-27T05:40:00.000Z", "Action"),
    ("8 Bit Wedding",                    "2d5d707c-4ce9-81fa-a4a5-c81f2a0ab525",    "2025-12-27T05:40:00.000Z", "Comedy / Romance"),
    ("Crazzy Punjaban",                  "2d6d707c-4ce9-8029-8702-f104c532a58b",    "2025-12-27T04:17:00.000Z", "Comedy / Drama"),
    ("The Buried Gold",                  "2d6d707c-4ce9-808d-ac6c-eb33edceeb68",    "2025-12-27T04:06:00.000Z", "Adventure / Thriller"),
    ("The Infinite Win",                 "2d6d707c-4ce9-80e5-83df-d1a635726571",    "2025-12-27T04:05:00.000Z", "Drama / Sport"),
    ("Vyapar",                           "2d5d707c-4ce9-8089-be0a-f2856e343c0a",    "2025-12-26T06:50:00.000Z", "Drama / Business"),
    ("Train Talktime",                   "2d5d707c-4ce9-80ff-9a6d-c19d78e72e7f",    "2025-12-26T02:47:00.000Z", "Drama"),
    ("Universal Saga",                   "2d4d707c-4ce9-8076-9f69-c4464fe4e132",    "2025-12-25T17:06:00.000Z", "Sci-Fi / Epic"),
    ("NF Hope",                          "2d4d707c-4ce9-80c7-baf4-e1ffc9e68703",    "2025-12-25T17:02:00.000Z", "Drama"),
    ("Grandmasters Watching Hiraku",     "2d4d707c-4ce9-8020-83c8-f4de7ba15eec",    "2025-12-25T14:50:00.000Z", "Drama / Sport"),
    ("Steel Bar King",                   "2d4d707c-4ce9-8095-ade1-f68397ac9bcb",    "2025-12-25T14:46:00.000Z", "Action"),
    ("Civil Ser-vant",                   "2d4d707c-4ce9-804e-88da-c313686c7fd9",    "2025-12-25T06:41:00.000Z", "Drama"),
    ("Cyberpunk Haunting Spirits",       "2d3d707c-4ce9-80a2-9502-d1651b87ab19",    "2025-12-24T15:12:00.000Z", "Cyberpunk / Horror"),
    ("The Rift Series",                  "2d3d707c-4ce9-80b3-830c-d19588b32fc3",    "2025-12-24T15:10:00.000Z", "Sci-Fi"),
    ("Temple of the Fallen Hearts",      "2d3d707c-4ce9-8133-9cac-fe1592f30397",    "2025-12-24T15:07:00.000Z", "Fantasy / Action"),
    ("ODD SEVEN",                        "2d3d707c-4ce9-8175-b36d-f789e1beca00",    "2025-12-24T15:06:00.000Z", "Action / Thriller"),
    ("EXPECT 0",                         "2d3d707c-4ce9-8185-b041-d020e420ea13",    "2025-12-24T14:58:00.000Z", "Sci-Fi / Thriller"),
    ("Orangutan Tiger",                  "309d707c-4ce9-80c5-a036-fa6679d0afd7",    "2026-02-16T07:51:00.000Z", "Action / Wildlife"),
    ("Marraige Hai Humse",               "309d707c-4ce9-80fc-a3cf-e10d2ced9708",    "2026-03-22T03:55:00.000Z", "Comedy / Romance"),
    ("Saga Stand Alone",                 "2ecd707c-4ce9-800f-b4b2-ea0109621a19",    "2026-01-18T08:45:00.000Z", "Action / Epic"),
]

# ── Helpers ──────────────────────────────────────────────────────────────────

def load_log() -> dict:
    if SYNC_LOG.exists():
        with open(SYNC_LOG) as f:
            return json.load(f)
    return {}

def fmt_dt(iso: str) -> str:
    try:
        dt = datetime.fromisoformat(iso.replace("Z", "+00:00"))
        return dt.strftime("%Y-%m-%d %H:%M")
    except Exception:
        return iso or "—"

def find_local(title: str) -> Path | None:
    import re
    target = re.sub(r"\s+", " ", title.strip()).lower()
    for f in STORIES_DIR.glob("*.md"):
        if f.stem.lower() == target:
            return f
    for f in STORIES_DIR.glob("*.md"):
        if target in f.stem.lower() or f.stem.lower() in target:
            return f
    return None

# ── Status display ────────────────────────────────────────────────────────────

def show_status():
    log = load_log()

    GREEN  = "\033[92m"
    YELLOW = "\033[93m"
    RED    = "\033[91m"
    CYAN   = "\033[96m"
    BOLD   = "\033[1m"
    RESET  = "\033[0m"

    print(f"\n{BOLD}{'─' * 80}{RESET}")
    print(f"{BOLD}  📚 Storypedia — Notion Sync Status{RESET}")
    print(f"  Wiki root : {WIKI_ROOT}")
    print(f"  Log file  : {SYNC_LOG.name} ({len(log)} entries)")
    print(f"{BOLD}{'─' * 80}{RESET}\n")

    synced_count   = 0
    pending_count  = 0
    missing_count  = 0

    rows = []
    for (title, notion_id, last_edited, genre) in KNOWN_STORIES:
        local = find_local(title)
        entry = log.get(notion_id, {})
        last_synced = entry.get("last_synced")
        log_status  = entry.get("status", "")

        if last_synced and log_status == "synced":
            status_tag = f"{GREEN}✅ synced{RESET}"
            synced_count += 1
        elif local and not last_synced:
            status_tag = f"{YELLOW}⚠️  local only{RESET}"
            pending_count += 1
        elif not local:
            status_tag = f"{RED}❌ not synced{RESET}"
            missing_count += 1
        else:
            status_tag = f"{YELLOW}⚠️  pending{RESET}"
            pending_count += 1

        local_name = local.name if local else f"{CYAN}(no local file){RESET}"
        rows.append((title, status_tag, fmt_dt(last_edited), fmt_dt(last_synced) if last_synced else "—", local_name))

    # Print table
    print(f"  {'Title':<35} {'Status':<20} {'Notion Edit':<17} {'Last Synced':<17}")
    print(f"  {'─'*35} {'─'*20} {'─'*17} {'─'*17}")
    for (title, status_tag, notion_edit, last_sync, local_name) in rows:
        print(f"  {title:<35} {status_tag:<30} {notion_edit:<17} {last_sync:<17}")

    print(f"\n{BOLD}  Summary: {GREEN}{synced_count} synced{RESET}  "
          f"{YELLOW}{pending_count} local-only / pending{RESET}  "
          f"{RED}{missing_count} not synced{RESET}\n")

    print(f"\n{'─' * 80}\n")
    return synced_count, pending_count, missing_count


# ── Bulk sync ─────────────────────────────────────────────────────────────────

def run_bulk_sync(pending_only: bool = True, dry_run: bool = False, force: bool = False):
    """Import apply_sync and run fetch_and_sync for each qualifying story."""
    import importlib.util, sys as _sys

    # Dynamically import apply_sync from the same scripts/ dir
    spec = importlib.util.spec_from_file_location(
        "apply_sync", Path(__file__).parent / "apply_sync.py"
    )
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)

    token = mod.load_token()
    if not token:
        print(f"\n\033[91m✖  No Notion API token found.\033[0m")
        print(f"   Create {WIKI_ROOT / '.env'} with:")
        print(f"   \033[1mNOTION_API_TOKEN=secret_xxxxxxxxxxxxxxxx\033[0m")
        print(f"   Get yours at: https://www.notion.so/my-integrations\n")
        _sys.exit(1)

    print(f"\n\033[1m🔑 Notion token loaded\033[0m  \033[2m({token[:12]}…)\033[0m")

    log = load_log()
    queued = []

    for (title, notion_id, last_edited, genre) in KNOWN_STORIES:
        entry      = log.get(notion_id, {})
        last_synced = entry.get("last_synced")
        log_status  = entry.get("status", "")

        is_synced = last_synced and log_status == "synced"

        if pending_only and is_synced and not force:
            continue  # skip already-synced stories

        queued.append((title, notion_id, genre))

    if not queued:
        print("\n\033[92m✅ All stories are already synced!\033[0m\n")
        return

    print(f"\n\033[1mQueued {len(queued)} stories for sync:\033[0m")
    for t, _, _ in queued:
        print(f"  • {t}")
    print()

    ok, failed = 0, 0
    for (title, notion_id, genre) in queued:
        try:
            mod.fetch_and_sync(
                token=token,
                page_id=notion_id,
                force=force,
                dry_run=dry_run,
                genre=genre,
            )
            ok += 1
        except Exception as e:
            print(f"\n  \033[91m✖ {title}: {e}\033[0m")
            failed += 1

    print(f"\n\033[1mBulk sync complete:\033[0m {ok} synced, {failed} failed.\n")


# ── Entry point ───────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Storypedia — Notion sync status and bulk sync tool.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("--sync-pending", action="store_true",
                        help="Sync all stories not yet synced (requires .env token)")
    parser.add_argument("--sync-all", action="store_true",
                        help="Force-sync ALL stories, even already-synced ones")
    parser.add_argument("--dry-run", action="store_true",
                        help="Preview changes without writing to disk")

    args = parser.parse_args()

    if args.sync_all:
        show_status()
        run_bulk_sync(pending_only=False, dry_run=args.dry_run, force=True)
    elif args.sync_pending:
        show_status()
        run_bulk_sync(pending_only=True, dry_run=args.dry_run)
    else:
        show_status()
        print(f"  \033[1mTip:\033[0m To sync pending stories: python3 scripts/sync_all.py --sync-pending")
        print(f"       To sync everything:       python3 scripts/sync_all.py --sync-all\n")
