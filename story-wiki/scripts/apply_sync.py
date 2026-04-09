#!/usr/bin/env python3
"""
apply_sync.py — Notion → Story Wiki Sync Tool
==============================================
Fetch content directly from Notion and merge it into local story wiki files.

SETUP (one-time):
    Create ~/Desktop/WRITE/story-wiki/.env with your Notion token:
        NOTION_API_TOKEN=secret_xxxxxx...

    Get your token from: https://www.notion.so/my-integrations

USAGE:

  # Sync by Notion ID only — auto-fetches title, synopsis, last-edited
  python3 scripts/apply_sync.py --notion-id 2d6d707c-4ce9-8007-a9c6-dfb5deed2d50

  # Sync multiple IDs in one command
  python3 scripts/apply_sync.py \\
      --notion-id 2d6d707c-4ce9-8007-a9c6-dfb5deed2d50 \\
      --notion-id 2d5d707c-4ce9-80b0-8943-eb819d4fe989

  # Preview changes without writing to disk
  python3 scripts/apply_sync.py --notion-id <id> --dry-run

  # Force overwrite even if local file is newer
  python3 scripts/apply_sync.py --notion-id <id> --force

  # Manual mode (no API call) — all fields provided explicitly
  python3 scripts/apply_sync.py \\
      --title "Story Name" \\
      --notion-id <id> \\
      --last-edited "2025-12-27T04:07:00.000Z" \\
      --synopsis "Full synopsis text..."
"""

import argparse
import json
import os
import re
import sys
import urllib.request
import urllib.error
from datetime import datetime, timezone
from pathlib import Path

# ── Paths ─────────────────────────────────────────────────────────────────────
WIKI_ROOT      = Path(__file__).resolve().parent.parent
STORIES_DIR    = WIKI_ROOT / "stories"
SYNC_LOG_PATH  = WIKI_ROOT / "sync_log.json"
ENV_FILE       = WIKI_ROOT / ".env"

# ── ANSI colors ────────────────────────────────────────────────────────────────
GREEN  = "\033[92m"
YELLOW = "\033[93m"
RED    = "\033[91m"
CYAN   = "\033[96m"
BOLD   = "\033[1m"
DIM    = "\033[2m"
RESET  = "\033[0m"

# ── Boilerplate template for new stories ──────────────────────────────────────
NEW_STORY_TEMPLATE = """\
---
layout: default
title: "{title}"
---

# {title}

**Status:** {status}
**Format:** TBD
**Genre:** {genre}
**Date Written:** TBD
**Core Theme:** TBD

## Synopsis

{synopsis}

## Characters

*(To be added)*

## Themes

*(To be added)*

## Techniques

*(To be added)*

## Sources

- Synced from Notion ID: `{notion_id}`
"""

# ── Token loading ─────────────────────────────────────────────────────────────

def load_token() -> str | None:
    """
    Load the Notion API token from:
      1. NOTION_API_TOKEN environment variable
      2. .env file in the wiki root
    """
    token = os.environ.get("NOTION_API_TOKEN")
    if token:
        return token.strip()

    if ENV_FILE.exists():
        for line in ENV_FILE.read_text().splitlines():
            line = line.strip()
            if line.startswith("NOTION_API_TOKEN="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")

    return None

# ── Notion REST API helpers ───────────────────────────────────────────────────

NOTION_VERSION = "2022-06-28"
BASE_URL       = "https://api.notion.com/v1"

def _notion_get(token: str, path: str) -> dict:
    """Make a GET request to the Notion API."""
    url = f"{BASE_URL}{path}"
    req = urllib.request.Request(url, headers={
        "Authorization": f"Bearer {token}",
        "Notion-Version": NOTION_VERSION,
    })
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        raise RuntimeError(f"Notion API error {e.code} on {path}: {body}")


def fetch_page_meta(token: str, page_id: str) -> dict:
    """Return the page title, last_edited_time, and Tags/Genre from Notion."""
    data = _notion_get(token, f"/pages/{page_id}")
    props = data.get("properties", {})

    # Extract title from Name/title property
    title = ""
    for key in ("Name", "title", "Title"):
        prop = props.get(key, {})
        title_list = prop.get("title", [])
        if title_list:
            title = "".join(t.get("plain_text", "") for t in title_list)
            break

    # Extract tags / genre from multi_select Tags
    genre = "TBD"
    tags_prop = props.get("Tags", {}).get("multi_select", [])
    if tags_prop:
        genre = ", ".join(t["name"] for t in tags_prop)

    return {
        "id": data["id"],
        "title": title.strip(),
        "last_edited_time": data.get("last_edited_time", ""),
        "genre": genre,
    }


def fetch_page_content(token: str, page_id: str) -> str:
    """Recursively fetch all text blocks from a Notion page and return as Markdown."""
    data = _notion_get(token, f"/blocks/{page_id}/children?page_size=100")
    return _blocks_to_md(token, data.get("results", []), indent=0)


def _blocks_to_md(token: str, blocks: list, indent: int) -> str:
    lines = []
    prefix = "  " * indent
    numbered = {}  # track numbered list index per indent

    for block in blocks:
        btype = block.get("type", "")
        data  = block.get(btype, {})
        rich  = data.get("rich_text", []) or data.get("text", [])
        text  = "".join(r.get("plain_text", "") for r in rich).strip()

        if not text and btype not in ("bulleted_list_item", "numbered_list_item", "divider", "image"):
            lines.append("")
            continue

        if btype == "paragraph":
            lines.append(f"{prefix}{text}" if text else "")
        elif btype == "heading_1":
            lines.append(f"\n{prefix}# {text}")
        elif btype == "heading_2":
            lines.append(f"\n{prefix}## {text}")
        elif btype == "heading_3":
            lines.append(f"\n{prefix}### {text}")
        elif btype == "bulleted_list_item":
            lines.append(f"{prefix}- {text}")
        elif btype == "numbered_list_item":
            idx = numbered.get(indent, 0) + 1
            numbered[indent] = idx
            lines.append(f"{prefix}{idx}. {text}")
        elif btype == "quote":
            lines.append(f"{prefix}> {text}")
        elif btype == "code":
            lang = data.get("language", "")
            lines.append(f"{prefix}```{lang}\n{prefix}{text}\n{prefix}```")
        elif btype == "divider":
            lines.append(f"{prefix}---")
        elif btype == "callout":
            emoji = data.get("icon", {}).get("emoji", "ℹ️")
            lines.append(f"{prefix}> {emoji} {text}")
        elif btype == "to_do":
            checked = "x" if data.get("checked") else " "
            lines.append(f"{prefix}- [{checked}] {text}")
        elif btype == "image":
            url = (data.get("external") or data.get("file") or {}).get("url", "")
            caption = "".join(r.get("plain_text", "") for r in data.get("caption", []))
            lines.append(f"{prefix}![{caption}]({url})")
        else:
            if text:
                lines.append(f"{prefix}{text}")

        # Recurse into children
        if block.get("has_children") and btype not in ("child_database", "child_page"):
            try:
                child_data = _notion_get(token, f"/blocks/{block['id']}/children?page_size=100")
                child_md = _blocks_to_md(token, child_data.get("results", []), indent + 1)
                if child_md.strip():
                    lines.append(child_md)
            except Exception:
                pass  # silently skip inaccessible children

    return "\n".join(lines)

# ── Sync log ──────────────────────────────────────────────────────────────────

def load_sync_log() -> dict:
    if SYNC_LOG_PATH.exists():
        with open(SYNC_LOG_PATH) as f:
            return json.load(f)
    return {}


def save_sync_log(log: dict):
    with open(SYNC_LOG_PATH, "w") as f:
        json.dump(log, f, indent=2)

# ── Markdown section parser ───────────────────────────────────────────────────

def title_to_filename(title: str) -> str:
    return re.sub(r"\s+", " ", title.strip())


def find_local_file(title: str) -> Path | None:
    target = title_to_filename(title).lower()
    for f in STORIES_DIR.glob("*.md"):
        if f.stem.lower() == target:
            return f
    for f in STORIES_DIR.glob("*.md"):
        if target in f.stem.lower() or f.stem.lower() in target:
            return f
    return None


def parse_sections(content: str) -> dict:
    sections = {}
    fm_match = re.match(r"^---\n(.*?)\n---\n", content, re.DOTALL)
    if fm_match:
        sections["_frontmatter"] = fm_match.group(0)
        content = content[fm_match.end():]
    else:
        sections["_frontmatter"] = ""

    h1_match = re.match(r"^(# .+\n)", content)
    if h1_match:
        sections["_h1"] = h1_match.group(1)
        content = content[h1_match.end():]
    else:
        sections["_h1"] = ""

    pattern = re.compile(r"^(## .+)$", re.MULTILINE)
    parts   = pattern.split(content)
    sections["_meta"] = parts[0]

    i = 1
    while i < len(parts) - 1:
        heading = parts[i].strip("# ").strip()
        body    = parts[i + 1]
        sections[heading] = body
        i += 2

    return sections


def rebuild_content(sections: dict) -> str:
    output   = []
    ordering = ["Synopsis", "Characters", "Themes", "Techniques", "Worlds", "Sources"]
    written  = set()

    output.append(sections.get("_frontmatter", ""))
    output.append(sections.get("_h1", ""))
    output.append(sections.get("_meta", ""))

    for heading in ordering:
        if heading in sections:
            output.append(f"## {heading}\n")
            output.append(sections[heading])
            written.add(heading)

    for heading, body in sections.items():
        if heading.startswith("_") or heading in written:
            continue
        output.append(f"## {heading}\n")
        output.append(body)

    return "".join(output)


def iso_to_dt(iso_str: str) -> datetime:
    return datetime.fromisoformat(iso_str.replace("Z", "+00:00"))

# ── Core sync function ────────────────────────────────────────────────────────

def sync_story(
    notion_id:   str,
    title:       str,
    last_edited: str,
    synopsis:    str,
    genre:       str  = "TBD",
    status:      str  = "Draft",
    force:       bool = False,
    dry_run:     bool = False,
):
    tag = f"{CYAN}[DRY RUN]{RESET} " if dry_run else ""
    print(f"\n{tag}{BOLD}Syncing:{RESET} {title!r}  {DIM}({notion_id}){RESET}")

    log       = load_sync_log()
    notion_dt = iso_to_dt(last_edited)
    local_file = find_local_file(title)

    # ── Existing file ──────────────────────────────────────────────────────
    if local_file:
        local_mtime = datetime.fromtimestamp(local_file.stat().st_mtime, tz=timezone.utc)
        prev_synced = (
            iso_to_dt(log[notion_id]["last_synced"])
            if notion_id in log and log[notion_id].get("last_synced")
            else None
        )

        print(f"  📄 Local file  : {local_file.name}")
        print(f"  🕐 Notion edit : {notion_dt.strftime('%Y-%m-%d %H:%M')} UTC")
        print(f"  🕐 Local mtime : {local_mtime.strftime('%Y-%m-%d %H:%M')} UTC")
        print(f"  🕐 Last synced : {prev_synced.strftime('%Y-%m-%d %H:%M') + ' UTC' if prev_synced else '—'}")

        if not force:
            if prev_synced and prev_synced >= notion_dt:
                print(f"  {GREEN}✅ Already up to date — skipping.{RESET}")
                return
            if local_mtime > notion_dt and not prev_synced:
                print(f"  {YELLOW}⚠️  Local file is newer than Notion. Use --force to override.{RESET}")
                log[notion_id] = {
                    "title": title, "local_file": str(local_file),
                    "notion_last_edited": last_edited,
                    "last_synced": None, "status": "skipped_local_newer",
                }
                if not dry_run:
                    save_sync_log(log)
                return

        content  = local_file.read_text(encoding="utf-8")
        sections = parse_sections(content)
        sections["Synopsis"] = f"\n{synopsis.strip()}\n\n"
        new_content = rebuild_content(sections)

        if dry_run:
            print(f"  {CYAN}📝 Would update Synopsis section:{RESET}")
            print("  " + "─" * 60)
            preview = synopsis[:400] + ("…" if len(synopsis) > 400 else "")
            for line in preview.splitlines():
                print(f"  {DIM}{line}{RESET}")
            print("  " + "─" * 60)
        else:
            local_file.write_text(new_content, encoding="utf-8")
            print(f"  {GREEN}✔ Updated {local_file.name}{RESET}")

    # ── New file ───────────────────────────────────────────────────────────
    else:
        new_name = STORIES_DIR / f"{title_to_filename(title)}.md"
        print(f"  🆕 No local file found — will create: {new_name.name}")
        new_content = NEW_STORY_TEMPLATE.format(
            title=title, status=status, genre=genre,
            synopsis=synopsis.strip(), notion_id=notion_id,
        )
        if dry_run:
            print(f"  {CYAN}📝 Would create:{RESET} {new_name.name}")
            print(new_content[:400] + "…")
        else:
            new_name.write_text(new_content, encoding="utf-8")
            print(f"  {GREEN}✔ Created {new_name.name}{RESET}")
        local_file = new_name

    # ── Update sync log ────────────────────────────────────────────────────
    now_iso = datetime.now(tz=timezone.utc).isoformat()
    log[notion_id] = {
        "title": title,
        "local_file": str(local_file),
        "notion_last_edited": last_edited,
        "last_synced": now_iso,
        "status": "dry_run" if dry_run else "synced",
    }
    if not dry_run:
        save_sync_log(log)
        print(f"  {DIM}✔ sync_log.json updated{RESET}")

# ── Fetch-and-sync from Notion ID ─────────────────────────────────────────────

def fetch_and_sync(
    token:    str,
    page_id:  str,
    force:    bool = False,
    dry_run:  bool = False,
    genre:    str  = None,
    status:   str  = "Draft",
):
    print(f"\n{DIM}Fetching from Notion: {page_id}…{RESET}")

    # 1. Get page metadata
    meta = fetch_page_meta(token, page_id)
    title       = meta["title"] or page_id
    last_edited = meta["last_edited_time"]
    resolved_genre = genre or meta["genre"]

    if not title:
        print(f"  {YELLOW}⚠️  Could not resolve title for {page_id}. Skipping.{RESET}")
        return

    print(f"  📑 Title       : {title}")
    print(f"  🕐 Last edited : {last_edited}")
    print(f"  🏷  Genre       : {resolved_genre}")

    # 2. Idempotency pre-check (skip API content call if already up to date)
    log = load_sync_log()
    if not force and page_id in log and log[page_id].get("last_synced"):
        prev_synced = iso_to_dt(log[page_id]["last_synced"])
        notion_dt   = iso_to_dt(last_edited)
        if prev_synced >= notion_dt:
            print(f"  {GREEN}✅ Already up to date (last synced {prev_synced.strftime('%Y-%m-%d')}) — skipping.{RESET}")
            return

    # 3. Fetch block content
    print(f"  {DIM}Fetching page blocks…{RESET}", end="", flush=True)
    synopsis = fetch_page_content(token, page_id).strip()
    print(f" {GREEN}done{RESET} ({len(synopsis)} chars)")

    if not synopsis:
        print(f"  {YELLOW}⚠️  Page has no text content. Creating stub entry.{RESET}")
        synopsis = "*(No content in Notion page — add synopsis here.)*"

    # 4. Merge
    sync_story(
        notion_id=page_id,
        title=title,
        last_edited=last_edited,
        synopsis=synopsis,
        genre=resolved_genre,
        status=status,
        force=force,
        dry_run=dry_run,
    )

# ── CLI ───────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Sync Notion story synopses to local story-wiki Markdown files.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
examples:
  # Auto-fetch from Notion (needs NOTION_API_TOKEN in .env or env var)
  python3 scripts/apply_sync.py --notion-id 2d6d707c-4ce9-8007-a9c6-dfb5deed2d50

  # Sync multiple IDs
  python3 scripts/apply_sync.py \\
      --notion-id 2d6d707c-4ce9-8007-a9c6-dfb5deed2d50 \\
      --notion-id 2d5d707c-4ce9-80b0-8943-eb819d4fe989

  # Manual mode (no API call needed)
  python3 scripts/apply_sync.py \\
      --title "My Story" --notion-id <id> \\
      --last-edited "2025-12-27T04:07:00.000Z" \\
      --synopsis "Full synopsis..."
""")

    parser.add_argument(
        "--notion-id", dest="notion_ids", action="append", metavar="ID",
        help="Notion page ID (repeat for multiple). Auto-fetches content from Notion API.",
    )
    parser.add_argument("--title",       help="[Manual mode] Story title")
    parser.add_argument("--last-edited", help="[Manual mode] ISO timestamp of last Notion edit")
    parser.add_argument("--synopsis",    help="[Manual mode] Full synopsis text")
    parser.add_argument("--genre",       default=None,    help="Genre override")
    parser.add_argument("--status",      default="Draft", help="Status (default: Draft)")
    parser.add_argument("--force",       action="store_true", help="Force overwrite even if local is newer")
    parser.add_argument("--dry-run",     action="store_true", help="Preview changes without writing")

    args = parser.parse_args()

    # ── Manual mode: all fields provided ──────────────────────────────────
    if args.title and args.last_edited and args.synopsis:
        if not args.notion_ids or len(args.notion_ids) != 1:
            parser.error("Manual mode requires exactly one --notion-id along with --title, --last-edited, --synopsis")
        sync_story(
            notion_id=args.notion_ids[0],
            title=args.title,
            last_edited=args.last_edited,
            synopsis=args.synopsis,
            genre=args.genre or "TBD",
            status=args.status,
            force=args.force,
            dry_run=args.dry_run,
        )
        return

    # ── Auto-fetch mode: uses Notion API ──────────────────────────────────
    if not args.notion_ids:
        parser.print_help()
        print(f"\n{YELLOW}Tip: run with --notion-id <ID> to auto-fetch from Notion.{RESET}")
        print(f"{YELLOW}     Or run sync_all.py to see status of all stories.{RESET}\n")
        sys.exit(0)

    token = load_token()
    if not token:
        print(f"\n{RED}✖  No Notion API token found.{RESET}")
        print(f"   Create {ENV_FILE} with:")
        print(f"   {BOLD}NOTION_API_TOKEN=secret_xxxxxxxxxxxxxxxx{RESET}")
        print(f"   Get your token at: https://www.notion.so/my-integrations\n")
        sys.exit(1)

    print(f"\n{BOLD}🔑 Notion token loaded{RESET}  {DIM}({token[:12]}…){RESET}")
    print(f"{DIM}   Wiki root: {WIKI_ROOT}{RESET}")

    for page_id in args.notion_ids:
        page_id = page_id.strip().replace("-", "").strip()
        # Re-add dashes in standard Notion UUID format if missing
        if len(page_id) == 32:
            page_id = f"{page_id[:8]}-{page_id[8:12]}-{page_id[12:16]}-{page_id[16:20]}-{page_id[20:]}"
        try:
            fetch_and_sync(
                token=token,
                page_id=page_id,
                force=args.force,
                dry_run=args.dry_run,
                genre=args.genre,
                status=args.status,
            )
        except RuntimeError as e:
            print(f"\n  {RED}✖ Notion API error: {e}{RESET}")
        except Exception as e:
            print(f"\n  {RED}✖ Unexpected error: {e}{RESET}")

    print(f"\n{BOLD}Done.{RESET}\n")


if __name__ == "__main__":
    main()
