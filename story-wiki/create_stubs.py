import os

content_dir = "/home/jxlee/Desktop/WRITE/story-wiki/content"

stubs = {
    "themes": [
        "Fire and Ice Duality", "AI Dystopia", "Power Hierarchies and Combat",
        "Identity and the Double Self", "Betrayal and Loyalty", "Love and Loss",
        "Self-Worth", "Journey vs. Destination", "Memory and Alternate Realities",
        "Game as Power Allegory", "Revenge as Motivation", "Identity Erasure",
        "Fate and Choice", "Fate vs. Free Will", "Art and Obsession",
        "Illusion vs. Reality", "Love as Vulnerability", "Rival Structure"
    ],
    "techniques": [
        "Dual Timeline", "Villain Daughter Arc", "Anthology Format",
        "Object as Character", "Classical Tragedy Arc"
    ],
    "world": [
        "Cyberspace Physical Split", "Indian Mythology Layer"
    ]
}

template = """---
layout: default
title: "{title}"
---

# {title}

**Category:** {category}

## Overview
Automated stub created to resolve broken links. This thematic/technical concept is central to the Storypedia knowledge base.

## Notes
- [ ] Add detailed definition.
- [ ] List all story occurrences.
- [ ] Connect to related archetypes.

## Linked Stories
- *Pending automatic backlink population*
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
        else:
            print(f"Skipped existing: {path}")
