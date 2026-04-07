#!/usr/bin/env python3
"""
story-wiki wikilink converter / front matter injector.
Run from inside the story-wiki/ directory:

    cd /home/jxlee/Desktop/WRITE/story-wiki
    python3 _convert.py

Effects:
  1. Prepends YAML front matter (layout, title) to every .md file
     that doesn't already have it.
  2. Converts [[wikilinks]] to relative Markdown links.
     Supports:
       [[path/page]]           → [page](../path/page.md)
       [[path/page|Label]]     → [Label](../path/page.md)
       [[index]]               → [Index](../index.md)  (from subdir)
       [[index]]               → [Index](index.md)     (from root)
  3. Prints a link map with OK / BROKEN status for every conversion.

Safe to re-run — skips front matter injection if already present.
"""

import os
import re
import pathlib

WIKI_ROOT = pathlib.Path(__file__).parent.resolve()
LAYOUT = "default"

# Files to skip (this script itself, Jekyll internals)
SKIP_FILES = {"_convert.py"}
SKIP_DIRS  = {"_site", "_includes", "_layouts", "assets", ".git"}

# ── helpers ──────────────────────────────────────────────────────────────────

def slug_title(stem: str) -> str:
    """Turn filename stem into a readable title."""
    return stem

def relative_link(from_file: pathlib.Path, target_ref: str) -> tuple[str, bool]:
    """
    Resolve [[target_ref]] from from_file into a relative URL path.
    target_ref examples:
        'stories/Lvl 3 Power'
        'characters/Sato'
        'index'
        'themes/Immortality vs. Mortality'

    Returns (relative_path_str, exists: bool)
    """
    # Normalise: strip leading/trailing whitespace
    target_ref = target_ref.strip()

    # Special bare-name references that match root files
    root_files = {"index", "log"}
    if target_ref in root_files:
        target_path = WIKI_ROOT / f"{target_ref}.md"
    else:
        # Could be 'stories/X' or 'characters/X' etc.
        target_path = WIKI_ROOT / f"{target_ref}.md"

    exists = target_path.exists()

    # Build relative path from from_file's directory to target_path
    try:
        rel = os.path.relpath(target_path, from_file.parent)
    except ValueError:
        rel = str(target_path)

    # Normalise OS path separators to forward slashes
    rel = rel.replace("\\", "/")
    return rel, exists


def inject_front_matter(content: str, title: str) -> str:
    """Add YAML front matter if not already present."""
    if content.startswith("---"):
        return content  # already has front matter
    fm = f"---\nlayout: {LAYOUT}\ntitle: \"{title}\"\n---\n\n"
    return fm + content


def convert_wikilinks(content: str, from_file: pathlib.Path) -> tuple[str, list[dict]]:
    """
    Replace all [[...]] wikilinks with relative Markdown links.
    Returns (new_content, link_report) where link_report is a list of
    {wikilink, resolved, label, ok}.
    """
    report = []
    pattern = re.compile(r'\[\[([^\]]+)\]\]')

    def replace(m):
        inner = m.group(1)
        # Support [[path|Label]] syntax
        if "|" in inner:
            ref, label = inner.split("|", 1)
            ref   = ref.strip()
            label = label.strip()
        else:
            ref   = inner.strip()
            # Label = last path segment, de-slugged
            label = slug_title(ref.split("/")[-1])

        rel_path, exists = relative_link(from_file, ref)
        report.append({
            "wikilink": m.group(0),
            "resolved": rel_path,
            "label":    label,
            "ok":       exists,
        })
        return f"[{label}]({rel_path})"

    new_content = pattern.sub(replace, content)
    return new_content, report


# ── main ─────────────────────────────────────────────────────────────────────

def main():
    all_reports = []
    processed   = 0
    skipped     = 0

    for md_file in sorted(WIKI_ROOT.rglob("*.md")):
        # Skip files in jekyll/git internal dirs
        parts = md_file.relative_to(WIKI_ROOT).parts
        if any(part in SKIP_DIRS for part in parts):
            continue
        if md_file.name in SKIP_FILES:
            continue

        rel_display = md_file.relative_to(WIKI_ROOT)
        title       = slug_title(md_file.stem)

        content = md_file.read_text(encoding="utf-8")
        content = inject_front_matter(content, title)
        content, report = convert_wikilinks(content, md_file)
        md_file.write_text(content, encoding="utf-8")

        for entry in report:
            entry["file"] = str(rel_display)
            all_reports.append(entry)

        processed += 1
        print(f"  ✓  {rel_display}")

    # ── Link map ──────────────────────────────────────────────────────────────
    print(f"\n{'─'*64}")
    print(f"Processed {processed} files  |  {len(all_reports)} wikilinks converted\n")

    broken = [r for r in all_reports if not r["ok"]]
    ok     = [r for r in all_reports if r["ok"]]

    print(f"✅  OK:     {len(ok)}")
    print(f"❌  BROKEN: {len(broken)}")

    if broken:
        print(f"\n{'─'*64}")
        print("BROKEN LINKS (target .md file not found on disk):\n")
        for r in broken:
            print(f"  [{r['file']}]  {r['wikilink']}  →  {r['resolved']}")

    print(f"\n{'─'*64}\nDone. Commit and push when ready.\n")


if __name__ == "__main__":
    main()
