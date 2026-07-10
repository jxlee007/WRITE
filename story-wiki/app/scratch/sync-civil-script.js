import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const scriptPath = path.resolve(__dirname, '../../content/stories/anime-series/Civil-Ser-vant/prose/SB-PILOT.md');
const dataPath = path.resolve(__dirname, '../src/data/scripts.ts');

if (!fs.existsSync(scriptPath)) {
  console.error('Source script not found:', scriptPath);
  process.exit(1);
}
if (!fs.existsSync(dataPath)) {
  console.error('Target database not found:', dataPath);
  process.exit(1);
}

const mdContent = fs.readFileSync(scriptPath, 'utf8');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// Escape backticks and backslashes for JS template literal
const escapedContent = mdContent
  .replace(/\\/g, '\\\\')
  .replace(/`/g, '\\`')
  .replace(/\${/g, '\\${');

// Find civil-ser-vant-pilot-script and replace its content
const slugMarker = "slug: 'civil-ser-vant-pilot-script',";
const slugIdx = dataContent.indexOf(slugMarker);
if (slugIdx === -1) {
  console.error('Could not find slug marker in scripts.ts');
  process.exit(1);
}

// Find the content: ` start after the slug
const contentStartMarker = "content: `";
const contentStartIdx = dataContent.indexOf(contentStartMarker, slugIdx);
if (contentStartIdx === -1) {
  console.error('Could not find content start marker');
  process.exit(1);
}

const contentValueStartIdx = contentStartIdx + contentStartMarker.length;

// Find the closing backtick of the content template literal
// We find the next "`," or "`\n  }" which marks the end of the content field
let contentEndIdx = -1;
let scanIdx = contentValueStartIdx;
while (scanIdx < dataContent.length) {
  if (dataContent[scanIdx] === '`' && dataContent[scanIdx - 1] !== '\\') {
    // Check if it's followed by a comma or a newline/space and close bracket
    const after = dataContent.substring(scanIdx + 1, scanIdx + 20).trim();
    if (after.startsWith(',') || after.startsWith('}') || after.startsWith('genre:')) {
      contentEndIdx = scanIdx;
      break;
    }
  }
  scanIdx++;
}

if (contentEndIdx === -1) {
  console.error('Could not find closing backtick for content');
  process.exit(1);
}

const newFileContent = 
  dataContent.substring(0, contentValueStartIdx) +
  escapedContent +
  dataContent.substring(contentEndIdx);

fs.writeFileSync(dataPath, newFileContent, 'utf8');
console.log('Successfully synced SB-PILOT.md into scripts.ts!');
