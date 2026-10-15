import fs from 'node:fs';
import { artKindFor } from '../art.js';

const SOURCES = ['seeds.js', 'seeds-pl.js', 'seeds-world.js', 'seeds-more.js', 'seeds-curated.js'];

if (artKindFor({ name: 'Baba ganoush', category: 'sauce', art: 'sauce:tomato' }) !== 'dip:eggplant') throw new Error('Baba ganoush musi używać ilustracji dipu z bakłażana, nawet jeśli ma stary wariant grafiki.');
if (artKindFor({ name: 'Pizza Margherita', category: 'main', art: 'plate' }) !== 'pizza') throw new Error('Pizza Margherita musi używać ilustracji pizzy.');
const EXPECTED_SOURCE_COUNT = 453;
const EXPECTED_HAND_COUNT = 3;
const BAD_ENGLISH = /\b(almonds|butter|flour|sugar|cream|cheese|milk|cup|cups|tbsp|tsp|tablespoon|teaspoon|yellow)\b/i;
const BAD_QTY_GRAMMAR = [
  /\b[234]\s+łyżka\b/i,
  /\b(?:[5-9]|[1-9]\d+)\s+łyżka\b/i,
  /\b1\s+łyżki\b/i,
  /\b[234]\s+łyżeczka\b/i,
  /\b(?:[5-9]|[1-9]\d+)\s+łyżeczka\b/i,
  /\b1\s+łyżeczki\b/i,
  /\b\d+[,.]\d+\s+łyż(?:ka|eczka)\b/i,
  /\bjeden\s+zółt/i,
];

function normalizeName(s) {
  return s.toLocaleLowerCase('pl').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

const issues = [];
const names = new Map();
let sourceCount = 0;

for (const file of SOURCES) {
  const text = fs.readFileSync(file, 'utf8');
  const recipeBlocks = text.split(/\\n(?=# )/).filter((block) => block.startsWith('# '));
  const recipeNames = [...text.matchAll(/^# (.+)$/gm)].map((m) => m[1].trim());
  sourceCount += recipeNames.length;

  for (const block of recipeBlocks) {
    const lines = block.split('\\n');
    const name = lines[0].slice(2).trim();
    const ingredientLines = lines.filter((line) => line.includes('|') && !line.startsWith('@ '));
    const steps = lines.filter((line) => line.startsWith('> ')).map((line) => line.slice(2).trim());
    if (!lines.some((line) => line.startsWith('@ '))) issues.push(file + ': brak metadanych: ' + name);
    if (!lines.some((line) => line.startsWith(': '))) issues.push(file + ': brak opisu: ' + name);
    if (ingredientLines.length < 2) issues.push(file + ': mniej niż 2 składniki: ' + name);
    if (!steps.length) issues.push(file + ': brak instrukcji: ' + name);
    const normalizedSteps = steps.map((step) => step.toLocaleLowerCase('pl').replace(/\\s+/g, ' ').trim());
    if (normalizedSteps.some((step, idx) => normalizedSteps.indexOf(step) !== idx)) {
      issues.push(file + ': powtórzony krok w tej samej recepturze: ' + name);
    }
  }

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
    if (!line) continue;
    if (line.startsWith('> ')) {
      if (BAD_ENGLISH.test(line.slice(2))) issues.push(file + ':' + (i + 1) + ': angielski fragment w kroku: "' + line.slice(2) + '"');
      continue;
    }
    if (line.startsWith(': ')) {
      if (BAD_ENGLISH.test(line.slice(2))) issues.push(file + ':' + (i + 1) + ': angielski fragment w opisie: "' + line.slice(2) + '"');
      continue;
    }
    if (line.startsWith('# ') || line.startsWith('@ ') || line.startsWith('## ')) continue;
    if (line.includes('|')) {
      const parts = line.split('|');
      const left = parts[0].trim();
      const ing = parts.slice(1).join('|').trim();
      if (!ing) issues.push(file + ':' + (i + 1) + ': pusty składnik');
      if (BAD_ENGLISH.test(ing)) issues.push(file + ':' + (i + 1) + ': angielski fragment w składniku: "' + ing + '"');
      BAD_QTY_GRAMMAR.forEach((re) => { if (re.test(left)) issues.push(file + ':' + (i + 1) + ': podejrzana odmiana jednostki: "' + left + '"'); });
    }
  }
}

const curatedText = fs.readFileSync('seeds-curated.js', 'utf8');
const curatedBlocks = curatedText.split(/\n(?=# )/).filter((block) => block.startsWith('# '));
const GENERIC_STEPS = /^(?:Przygotuj bazę\.|Dodaj dodatki\.|Podawaj od razu\.|Przygotuj składniki\.|Dopraw i podawaj\.)$/i;
for (const block of curatedBlocks) {
  const name = block.split('\n')[0].slice(2).trim();
  const ingredients = block.split('\n').filter((line) => line.includes('|') && !line.startsWith('@ '));
  const steps = [...block.matchAll(/^> (.+)$/gm)].map((m) => m[1].trim());
  if (ingredients.length < 3) issues.push('Receptura bez minimum 3 składników: ' + name);
  if (steps.length < 4) issues.push('Za mało kroków w recepturze: ' + name);
  if (steps.some((step) => GENERIC_STEPS.some((pattern) => pattern.test(step)))) issues.push('Pozostał generyczny krok w recepturze: ' + name);
  const meta = block.split('\\n').find((line) => line.startsWith('@ ')) || '';
  if (/\\btags=wok\\b/.test(meta)) {
    const firstIngredient = ingredients[0]?.split('|').slice(1).join('|').trim() || '';
    const expectedCategory = /krewetki/i.test(firstIngredient) ? 'owoce-morza' : /tofu/i.test(firstIngredient) ? 'warzywa' : 'mieso';
    if (!new RegExp('\\\\bcat=' + expectedCategory + '\\\\b').test(meta)) issues.push('Nieprawidłowa kategoria dania z woka: ' + name);
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
