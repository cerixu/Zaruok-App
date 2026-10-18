/* Żarłok 1.9.31 — lokalne zdjęcia wygenerowane w Adobe Firefly. */
export const FIREFLY_FOOD_ASSETS = Object.freeze({
  pizza: './assets/food/pizza-margherita.jpg',
  carbonara: './assets/food/tagliatelle-carbonara.jpg',
  risotto: './assets/food/mushroom-risotto.jpg',
  salmon: './assets/food/salmon-lemon-butter.jpg'
});
const MATCHERS = [
  [/^pizza margherita$/i, 'pizza'],
  [/^spaghetti carbonara$/i, 'carbonara'],
  [/^risotto z grzybami$/i, 'risotto'],
  [/^łosoś pieczony z cytryną$/i, 'salmon']
];
export function fireflyAssetForRecipe(recipe) {
  const name = String((recipe && recipe.name) || '').normalize('NFC').trim();
  for (const entry of MATCHERS) if (entry[0].test(name)) return FIREFLY_FOOD_ASSETS[entry[1]];
  return null;
}
