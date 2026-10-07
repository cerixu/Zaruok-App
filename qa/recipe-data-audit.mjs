import fs from 'node:fs';

const SOURCES = ['seeds.js', 'seeds-pl.js', 'seeds-world.js', 'seeds-more.js'];
const EXPECTED_SOURCE_COUNT = 225;
const EXPECTED_HAND_COUNT = 3;
const BAD_ENGLISH = /\b(almonds|butter|flour|sugar|cream|cheese|milk|cup|cups|tbsp|tsp|tablespoon|teaspoon|yellow)\b/i;
const BAD_QTY_GRAMMAR = [
  /\b[234]\\s+łyżka\b/i,
  /\b[1]\\s+łyżki\b/i,
  /\b[5-9]\\s+łyżki\b/i,
  /\b\d+\\s+łyżeczka\b/i,
  /\bjeden\\s+zółt/i,
];

function normalizeName(s) {
  return s.toLocaleLowerCase('pl').normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

const issues = [];
const names = new Map();
let sourceCount = 0;

for (const file of SOURCES) {
  const text = fs.readFileSync(file, 'utf8');
  const recipeNames = [...text.matchAll(/^# (.+)$/gm)].map((m) => m[1].trim());
  sourceCount += recipeNames.length;

  if (!recipeNames.length) issues.push(file + ': brak receptur');
  recipeNames.forEach((name, idx) => {
    const key = normalizeName(name);
    if (!key) issues.push(file + ': pusta nazwa #' + (idx + 1));
    if (names.has(key)) issues.push('DUPLIKAT NAZWY: "' + name + '" oraz "' + names.get(key) + '"');
    else names.set(key, name);
    if (BAD_ENGLISH.test(name)) issues.push(file + ': angielski fragment w nazwie: "' + name + '"');
  });

  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith('# ') || line.startsWith('@ ') || line.startsWith(': ') || line.startsWith('## ') || line.startsWith('> ')) continue;
    if (line.includes('|')) {
      const parts = line.split('|');
      const left = parts[0].trim();
      const ing = parts.slice(1).join('|').trim();
      if (!ing) issues.push(file + ':' + (i + 1) + ': pusty składnik');
      if (BAD_ENGLISH.test(ing)) issues.push(file + ':' + (i + 1) + ': angielski fragment w składniku/opisie: "' + ing + '"');
      BAD_QTY_GRAMMAR.forEach((re) => { if (re.test(left)) issues.push(file + ':' + (i + 1) + ': podejrzana odmiana jednostki: "' + left + '"'); });
    }
    if (line.startsWith('> ') && BAD_ENGLISH.test(line)) issues.push(file + ':' + (i + 1) + ': angielski fragment w kroku: "' + line.slice(2) + '"');
    if (line.startsWith(': ') && BAD_ENGLISH.test(line)) issues.push(file + ':' + (i + 1) + ': angielski fragment w opisie: "' + line.slice(2) + '"');
  }
}

const handSource = fs.readFileSync('recipes.js', 'utf8');
const handIds = ['rcp_seed_pizza', 'rcp_seed_carbonara', 'rcp_seed_sos'];
const handCount = handIds.filter((id) => handSource.includes("id: '" + id + "'")).length;

if (sourceCount !== EXPECTED_SOURCE_COUNT) issues.push('Nieoczekiwana liczba seedów: ' + sourceCount + ' (oczekiwano ' + EXPECTED_SOURCE_COUNT + ')');
if (handCount !== EXPECTED_HAND_COUNT) issues.push('Nieoczekiwana liczba ręcznych seedów: ' + handCount + ' (oczekiwano ' + EXPECTED_HAND_COUNT + ')');

console.log(JSON.stringify({ sourceCount, handCount, total: sourceCount + handCount, uniqueNames: names.size, issues: issues.length }, null, 2));

if (issues.length) {
  console.error('\nRECIPE DATA AUDIT FAIL\n' + issues.slice(0, 120).join('\n'));
  if (issues.length > 120) console.error('…i ' + (issues.length - 120) + ' kolejnych.');
  process.exit(1);
}
if (names.size !== sourceCount) process.exit(1);
console.log('PASS: recipe source audit');
