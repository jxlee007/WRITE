import os
import re

content_dir = "/home/jxlee/Desktop/WRITE/story-wiki/content"

# Fix 007 Spy Continue links
spy_path = os.path.join(content_dir, "stories/007 Spy Continue.md")
if os.path.exists(spy_path):
    with open(spy_path, 'r') as f:
        content = f.read()
    content = content.replace("[[Pawha's Daughter]]", "[[Pawhas Daughter]]")
    with open(spy_path, 'w') as f:
        f.write(content)
    print(f"Fixed: {spy_path}")

# Fix Maskarray link (Speed -> Skatze or just link to Speed.md if it exists)
# Let's check Speed.md existence again
speed_path = os.path.join(content_dir, "characters/Speed.md")
mask_path = os.path.join(content_dir, "characters/Maskarray.md")
if os.path.exists(mask_path):
    with open(mask_path, 'r') as f:
        content = f.read()
    # If Speed.md exists but slug is failing, maybe it's the period at end of line?
    # Actually Maskarray had [[Speed]]. 
    content = content.replace("[[Speed]]", "[[Speed|Speed]]") # Explicit text
    with open(mask_path, 'w') as f:
        f.write(content)
    print(f"Refined: {mask_path}")

# Final cleanup of [[...]] in Sarah and Alpha
files_to_clean = ["characters/Dr. Sarah Kumar.md", "characters/Subject Alpha.md"]
for rel_path in files_to_clean:
    abs_path = os.path.join(content_dir, rel_path)
    if os.path.exists(abs_path):
        with open(abs_path, 'r') as f:
            content = f.read()
        # Remove all [[...]] that are not recognized slugs
        # For simplicity, just replace known bad ones
        content = re.sub(r'\[\[PRESUMED DEAD\]\]', '**PRESUMED DEAD**', content)
        content = re.sub(r'\[\[Former college friend of Subject Alpha\.\]\]', '**Former college friend of Subject Alpha**', content)
        content = re.sub(r'\[\[Close relationship with Subject Alpha before his disappearance\]\]', '**Close relationship with Subject Alpha before his disappearance**', content)
        content = re.sub(r'\[\[Identity officially erased following RAW recruitment\.\]\]', '**Identity officially erased following RAW recruitment.**', content)
        content = re.sub(r'\[\[presumed dead\]\]', '**presumed dead**', content)
        with open(abs_path, 'w') as f:
            f.write(content)
        print(f"Cleaned: {abs_path}")

