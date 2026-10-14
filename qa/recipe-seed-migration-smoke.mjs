import fs from 'node:fs';
import assert from 'node:assert/strict';
import { migrateSeedRecipe } from '../recipe-migrations.js';

const names = [
  {
    current: { id: 'rcp_seed_fish_and_chips', name: 'Fish and chips', notes: 'Moja notatka', description: 'Mój opis' },
    seed: { id: 'rcp_seed_fish_and_chips', name: 'Ryba z frytkami', description: 'Opis startowy' },
    expectedName: 'Ryba z frytkami',
  },
  {
    current: { id: 'rcp_seed_pulled_pork', name: 'Pulled pork', notes: 'Moja notatka', description: 'Opis własny' },
    seed: { id: 'rcp_seed_pulled_pork', name: 'Szarpana wieprzowina', description: 'Opis startowy' },
    expectedName: 'Szarpana wieprzowina',
  },
  {
    current: { id: 'rcp_seed_shepherd_s_pie', name: "Shepherd's pie", notes: 'Moja notatka', description: 'Opis własny' },
    seed: { id: 'rcp_seed_shepherd_s_pie', name: 'Zapiekanka pasterska', description: 'Opis startowy' },
    expectedName: 'Zapiekanka pasterska',
  },
];

for (const { current, seed, expectedName } of names) {
  const result = migrateSeedRecipe(current, seed);
  assert.ok(result, 'Stara nazwa seedowana powinna zostać przetłumaczona');
  assert.equal(result.id, current.id, 'ID przepisu musi pozostać stabilne');
  assert.equal(result.name, expectedName);
  assert.equal(result.notes, current.notes, 'Prywatne notatki muszą pozostać bez zmian');
  assert.equal(result.description, current.description, 'Własny opis nie może zostać nadpisany');
}
const oldRice = {
  id: 'smazony_ryz_z_jajkiem',
  name: 'Smażony ryż z jajkiem',
  description: 'Wok-fried rice z warzywami i jajkiem.',
  notes: 'Moje uwagi do ryżu',
};
const newRice = {
  ...oldRice,
  description: 'Smażony ryż z warzywami i jajkiem, przygotowany na mocno rozgrzanym woku.',
};
const migratedRice = migrateSeedRecipe(oldRice, newRice);
assert.ok(migratedRice);
assert.equal(migratedRice.description, newRice.description);
assert.equal(migratedRice.notes, oldRice.notes);

const recipesSource = fs.readFileSync(new URL('../recipes.js', import.meta.url), 'utf8');
assert.ok(recipesSource.includes("import { migrateSeedRecipe } from './recipe-migrations.js';'));
assert.ok(recipesSource.includes('migrateSeedRecipe(current, seed)'));
const parserSource = fs.readFileSync(new URL('../seeds.js', import.meta.url), 'utf8');
assert.ok(parserSource.includes("if (k === 'id')"));
console.log('PASS: translated seed migrations preserve stable IDs and user-edited data');
