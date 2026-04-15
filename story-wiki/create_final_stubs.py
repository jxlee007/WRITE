import os

content_dir = "/home/jxlee/Desktop/WRITE/story-wiki/content"

stubs = {
    "themes": ["Surveillance and the Rogue Operative"],
    "analyses": ["Genre Map"]
}

template = """---
layout: default
title: "{title}"
---

# {title}

**Category:** {category}

## Overview
Stub created for navigation integrity.

## Notes
- [ ] Content to be updated from Notion.
"""

for category, titles in stubs.items():
    cat_dir = os.path.join(content_dir, category)
    os.makedirs(cat_dir, exist_ok=True)
    for title in titles:
        filename = f"{title}.md"
        path = os.path.join(cat_dir, filename)
        if not os.path.exists(path):
            with open(path, 'w') as f:
                f.write(template.format(title=title, category=category[:-1].capitalize()))
            print(f"Created stub: {path}")
