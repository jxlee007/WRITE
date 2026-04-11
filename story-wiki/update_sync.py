import json
import datetime
import os

sync_log_path = "/home/jxlee/Desktop/WRITE/story-wiki/sync_log.json"
index_md_path = "/home/jxlee/Desktop/WRITE/story-wiki/index.md"
log_md_path = "/home/jxlee/Desktop/WRITE/story-wiki/log.md"

with open(sync_log_path, "r") as f:
    data = json.load(f)

new_entries = [
    ("2d6d707c-4ce9-808d-ac6c-eb33edceeb68", "The buried gold in the ground"),
    ("2d5d707c-4ce9-8072-b484-c9536e9a0ce5", "Climax"),
    ("2d4d707c-4ce9-80b4-b3b6-f1bf13c1440e", "Story concepts (cards)"),
    ("2d4d707c-4ce9-8003-84e7-e798d2950812", "Phamtom"),
    ("2d4d707c-4ce9-8054-bb99-d658bf332ef6", "Only her"),
    ("2d5d707c-4ce9-80d6-bddd-e08e11cb6388", "Intro"),
    ("2d4d707c-4ce9-80c0-b36f-fa150ec36605", "Concept and scene")
]

now = datetime.datetime.now(datetime.timezone.utc).isoformat()

for notion_id, title in new_entries:
    data[notion_id] = {
        "title": title,
        "local_file": f"/home/jxlee/Desktop/WRITE/story-wiki/raw-sources/ideas/{title}.md",
        "notion_last_edited": "2025-12-01T00:00:00.000Z",
        "last_synced": now,
        "status": "synced"
    }

with open(sync_log_path, "w") as f:
    json.dump(data, f, indent=2)

with open(log_md_path, "a") as f:
    f.write(f"\n- {datetime.datetime.now().strftime('%Y-%m-%d')}: Synced 7 Notion idea pages into raw-sources/ideas/ via Notion MCP pipeline.\n")

print("Updated sync_log.json and log.md")
