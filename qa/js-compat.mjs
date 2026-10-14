#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const files = fs.readdirSync(root).filter((f) => f.endsWith('.js')).sort();
const bad = [];
for (const file of files) {
  try { execFileSync(process.execPath, ['--check', path.join(root, file)], { stdio: 'pipe' }); }
  catch (e) { bad.push(file + ': ' + String(e.stderr || e.stdout || e.message).trim()); }
}
const source = files.map((f) => fs.readFileSync(path.join(root, f), 'utf8')).join('\n');
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
const coreMatch = sw.match(/const CORE = \\[([\\s\\S]*?)\\];/);
const moduleCacheIssues = [];
if (!coreMatch) {
  moduleCacheIssues.push('Nie znaleziono listy CORE w sw.js');
} else {
  const cached = new Set([...coreMatch[1].matchAll(/(['\"])(.*?)\\1/g)].map((m) => path.basename(m[2].replace(/^\\.\\//, ''))));
  for (const file of files) {
    const text = fs.readFileSync(path.join(root, file), 'utf8');
    const imports = [...text.matchAll(/\\b(?:from\\s*|import\\s*(?:\\(\\s*)?)(['\"])(\\.\\/[^'\"]+\\.js)\\1/g)];
    for (const m of imports) {
      const target = path.resolve(root, m[2]);
      const basename = path.basename(m[2]);
      if (!fs.existsSync(target)) moduleCacheIssues.push(file + ' imports missing module ' + m[2]);
      else if (!cached.has(basename)) moduleCacheIssues.push(file + ' imports module not precached by sw.js: ' + basename);
    }
  }
}
if (moduleCacheIssues.length) {
  console.error('Offline module cache audit failed:\\n' + moduleCacheIssues.join('\\n'));
  process.exit(1);
}
console.log('PASS: all local JS modules are precached for offline startup');
const patterns = [
  ['findLast', /\.findLast\s*\(/],
  ['toSorted', /\.toSorted\s*\(/],
  ['toReversed', /\.toReversed\s*\(/],
  ['Object.hasOwn', /Object\.hasOwn\s*\(/],
];
const flagged = patterns.filter(([, re]) => re.test(source)).map(([name]) => name);
if (bad.length) { console.error('JS syntax failures:\n' + bad.join('\n')); process.exit(1); }
console.log('PASS: Node syntax check for ' + files.length + ' JS files');
console.log(flagged.length ? 'Compatibility review needed: ' + flagged.join(', ') : 'No high-risk modern JS patterns found');
