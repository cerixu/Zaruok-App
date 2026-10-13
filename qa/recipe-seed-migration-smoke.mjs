import fs from 'node:fs';
import assert from 'node:assert/strict';
import { migrateSeedRecipe } from '../recipe-migrations.js';

const cases = [
  {
    current: { id: 'rcp_seed_fish_and_chips', name: 'Fish and chips', description: 'Ryba w kruchym cieście piwnym z grubymi frytkami.', notes: 'Moja notatka', servings: 2, updatedAt: 10 },
    seed: { id: 'rcp_seed_fish_and_chips', name: 'Ryba z frytkami', description: 'Ryba w kruchym cieście piwnym z grubymi frytkami.' },
    expectedName: 'Ryba z frytkami',
  },
  {
    current: { id: 'rcp_seed_pulled_pork', name: 'Pulled pork', description: 'Mój własny opis', notes: 'Moja notatka', updatedAt: 10 },
    seed: { id: 'rcp_seed_pulled_pork', name: 'Szarpana wieprzowina', description: 'Szarpana wieprzowina z łopatki — idealna do burgerów.' },
    expectedName: 'Szarpana wieprzowina',
  },
  {
    current: { id: 'rcp_seed_shepherd_s_pie', name: "Shepherd's pie", description: 'Mięso mielone z warzywami pod puree ziemniaczanym.', updatedAt: 10 },
    seed: { id: 'rcp_seed_shepherd_s_pie', name: 'Zapiekanka pasterska', description: 'Mięso mielone z warzywami pod puree ziemniaczanym.' },
    expectedName: 'Zapiekanka pasterska',
  },
];

for (const { current, seed, expectedName } of cases) {
  const result = migrateSeedRecipe(current, seed);
  assert.ok(result, 'Miała zostać przetłumaczona nazwa ' + current.name);
  assert.equal(result.id, current.id, 'ID receptury musi pozostać stabilne');
  assert.equal(result.name, expectedName);
  assert.equal(result.notes, current.notes, 'Migracja nie może kasować prywatnych notatek');
}
const oldDescription = {
  id: 'stable-fried-rice-id',
  name: 'Smażony ryż z jajkiem',
  description: 'Wok-fried rice z warzywami i jajkiem.',
  notes: 'Zachować moje uwagi',
};
const newDescription = { ...oldDescription, description: 'Smażony ryż z warzywami i jajkiem, przygotowany na mocno rozgrzanym woku.' };
const migratedDescription = migrateSeedRecipe(oldDescription, newDescription);
assert.equal(migratedDescription.description, newDescription.description);
assert.equal(migratedDescription.notes, oldDescription.notes);

const editedName = { ...cases[0].current, name: 'Moja własna ryba' };
assert.equal(migrateSeedRecipe(editedName, cases[0].seed), null, 'Własna nazwa nie może być nadpisana');
const editedDescription = { ...oldDescription, description: 'Mój zmieniony opis.' };
assert.equal(migrateSeedRecipe(editedDescription, newDescription), null, 'Własny opis nie może być nadpisany');
assert.equal(migrateSeedRecipe(cases[0].current, { ...cases[0].seed, id: 'inny-id' }), null, 'Migracja nie może obejmować innych rekordów');

const recipesSource = fs.readFileSync(new URL('../recipes.js', import.meta.url), 'utf8');
assert.match(recipesSource, /imports*{s*migrateSeedRecipes*}s*froms*['"]./recipe-migrations.js['"]/);
assert.match(recipesSource, /migrateSeedRecipe(current,s*seed)/, 'addNewSeeds musi wykonać migrację przed końcem');
console.log('PASS: selective seed migration preserves stable IDs and user edits');
