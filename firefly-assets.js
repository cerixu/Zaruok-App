/* Żarłok 2.0 — lokalna biblioteka zdjęć potraw.
 * Wszystkie pliki są częścią aplikacji i trafiają do cache Service Workera.
 * Gdy nazwa receptury nie pasuje do zdjęcia, art.js używa ilustracji SVG.
 */
export const FIREFLY_FOOD_ASSETS = Object.freeze({
  pizza: './assets/food/pizza-margherita.jpg',
  pasta: './assets/food/pasta-carbonara.jpg',
  risotto: './assets/food/mushroom-risotto.jpg',
  salmon: './assets/food/salmon-lemon.jpg',
  burger: './assets/food/burger-fries.jpg',
  ramen: './assets/food/ramen-bowl.jpg',
  soup: './assets/food/tomato-soup.jpg',
  salad: './assets/food/greek-salad.jpg',
  dessert: './assets/food/tiramisu.jpg',
  chicken: './assets/food/chicken-thighs.jpg',
  steak: './assets/food/steak-potatoes.jpg',
  pierogi: './assets/food/pierogi-ruskie.jpg',
  bread: './assets/food/focaccia.jpg'
});

const MATCHERS = [
  [/\bpizza\b|margherita/i, 'pizza'],
  [/risotto/i, 'risotto'],
  [/carbonara|amatriciana|gricia|spaghetti|tagliatelle|penne|ravioli|tortellini|lasagne|lasagna|pasta|makaron/i, 'pasta'],
  [/burger|hamburger/i, 'burger'],
  [/ramen|pho|udon|soba|pad thai|tom yum/i, 'ramen'],
  [/zupa|soup|rosół|rosol|barszcz|żurek|zurek|minestrone|chowder/i, 'soup'],
  [/sałatka|salatka|salad|coleslaw|tabbouleh/i, 'salad'],
  [/pierog|dumpling|gyoza|jiaozi|pelmeni|manti|knedl|kluski/i, 'pierogi'],
  [/kurcz|chicken|pollo|drób|drob|indyk|turkey/i, 'chicken'],
  [/stek|steak|wołow|wolow|beef|rostbef|antrykot|gulasz|stew/i, 'steak'],
  [/łosoś|losos|salmon|dorsz|cod|pstrąg|pstrag|trout|tuńczyk|tunczyk|tuna|ryba|fish/i, 'salmon'],
  [/focaccia|chleb|bread|baguette|bułk|bulk|pieczywo/i, 'bread'],
  [/tiramisu/i, 'dessert']
];

export function fireflyAssetForRecipe(recipe) {
  const name = String((recipe && recipe.name) || '');
  for (const [pattern, key] of MATCHERS) {
    if (pattern.test(name)) return FIREFLY_FOOD_ASSETS[key];
  }
  return null;
}
