import os
import re

content_dir = "/home/jxlee/Desktop/WRITE/story-wiki/content"

def slugify(s):
    s = s.replace(".md", "").replace(".MD", "")
    s = re.sub(r'[^a-z0-9]+', '-', s.lower())
    return s.strip('-')

all_slugs = set()
# Get all valid slugs first
for root, dirs, files in os.walk(content_dir):
    for file in files:
        if file.endswith(".md"):
            slug = slugify(file)
            all_slugs.add(slug)

print(f"Total valid slugs: {len(all_slugs)}")

broken_links = []
for root, dirs, files in os.walk(content_dir):
    for file in files:
        if file.endswith(".md"):
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()
                
                # Check [[...]]
                wiki_links = re.findall(r'\[\[([^\]|]+)(?:\|[^\]]+)?\]\]', content)
                for wl in wiki_links:
                    slug = slugify(wl)
                    if slug not in all_slugs:
                        broken_links.append((file, f"[[{wl}]]", slug))
                
                # Check [...](...)
                md_links = re.findall(r'\[[^\]]+\]\(([^)]+)\)', content)
                for ml in md_links:
                    if ml.startswith("http") or ml.startswith("#") or ml.startswith("/") or ml.startswith("mailto:"):
                        continue
                    # Extract basename
                    filename = os.path.basename(ml)
                    slug = slugify(filename)
                    if slug not in all_slugs:
                        broken_links.append((file, f"({ml})", slug))

if broken_links:
    print("\nPotentially Broken or Missing Links:")
    for f, link, slug in broken_links:
        print(f"File: {f} | Link: {link} | Slug: {slug}")
else:
    print("\nNo broken links found with basic slug matching.")
