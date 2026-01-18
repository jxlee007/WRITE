import { readFile, writeFile, readdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const inputPath = resolve(root, 'prompts.txt');
const outputPath = resolve(root, 'prompts.json');
const imagesDir = resolve(root, 'images');

const text = await readFile(inputPath, 'utf8');

const headingRegex = /^### (Case|Example)\s+(\d+): \[([^\]]+)\][^\n]*$/gm;
const sections = [];
let match;
while ((match = headingRegex.exec(text)) !== null) {
  sections.push({
    type: match[1],
    number: Number.parseInt(match[2], 10),
    title: match[3],
    index: match.index,
  });
}

const entries = [];
for (let i = 0; i < sections.length; i += 1) {
  const current = sections[i];
  const sectionStart = current.index;
  const sectionEnd = i + 1 < sections.length ? sections[i + 1].index : text.length;
  const section = text.slice(sectionStart, sectionEnd);
  const promptMatch = section.match(/\*\*prompt:\*\*[\s\S]*?```([\s\S]*?)```/i);
  if (!promptMatch) {
    continue;
  }
  const prompt = promptMatch[1].trim();
  const id = Number.isFinite(current.number)
    ? `case${current.number}`
    : undefined;
  const images = new Set();
  const imgRegex = /<img\s+src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/gi;
  let imgMatch;
  while ((imgMatch = imgRegex.exec(section)) !== null) {
    const src = imgMatch[1];
    const alt = imgMatch[2] || '';
    const looksLikePreview = /output|result|after|final|preview|render|photo|scene|display/i.test(alt) || /output|result|after|final|preview|render/i.test(src);
    if (looksLikePreview) {
      images.add(src.replace(/^\//, ''));
    }
  }
  if (id) {
    const dirPath = resolve(imagesDir, id);
    try {
      const files = await readdir(dirPath);
      const sortedFiles = files
        .filter((file) => /\.(png|jpe?g|webp|gif)$/i.test(file))
        .sort((a, b) => a.localeCompare(b));
      const outputFiles = sortedFiles.filter((file) => /output/i.test(file));
      const preferredFiles = outputFiles.length > 0 ? outputFiles : sortedFiles;
      preferredFiles.forEach((file) => {
        images.add(`images/${id}/${file}`);
      });
    } catch (error) {
      // ignore missing directories
    }
  }
  const previewImageUrls = Array.from(images);
  entries.push({
    id,
    category: sections[i].title,
    prompt,
    previewImageUrls,
  });
}

await writeFile(outputPath, `${JSON.stringify(entries, null, 2)}\n`, 'utf8');

console.log(`Generated ${entries.length} prompt entries at ${outputPath}`);
