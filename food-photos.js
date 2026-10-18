/* ==========================================================================
   Żarłok 2.0 — prawdziwe zdjęcia dań.
   Fotografie są wersjonowane lokalnie w repozytorium jako base64/JPEG, dzięki
   czemu działają również offline. Własne zdjęcie użytkownika ma pierwszeństwo;
   gdy zdjęcie nie istnieje albo się nie załaduje, zostaje ilustracja SVG.
   ========================================================================== */

const PHOTO_FILES = Object.freeze({
  pizza: 'food-pizza.jpg.b64',
  carbonara: 'food-carbonara.jpg.b64',
  risotto: 'food-risotto.jpg.b64',
  salmon: 'food-salmon.jpg.b64',
  steak: 'food-steak.jpg.b64',
  dessert: 'food-dessert.jpg.b64',
  salad: 'food-salad.jpg.b64',
  soup: 'food-soup.jpg.b64',
  seafood: 'food-seafood.jpg.b64',
  pierogi: 'food-pierogi.jpg.b64',
  burger: 'food-burger.jpg.b64',
  focaccia: 'food-focaccia.jpg.b64',
  'pasta-tomato': 'food-pasta-tomato.jpg.b64',
  lasagna: 'food-lasagna.jpg.b64',
  'chicken-curry': 'food-chicken-curry.jpg.b64',
  schnitzel: 'food-schnitzel.jpg.b64',
  'soup-tomato': 'food-soup-tomato.jpg.b64',
  'soup-clear': 'food-soup-clear.jpg.b64',
  'soup-pumpkin': 'food-soup-pumpkin.jpg.b64',
  sourdough: 'food-sourdough.jpg.b64',
  cake: 'food-cake.jpg.b64',
  'babka-piaskowa': 'food-babka-piaskowa.jpg.b64',
  'baba-ganoush': 'food-baba-ganoush.jpg.b64',
  cocktail: 'food-cocktail.jpg.b64',
  'asian-noodles': 'food-asian-noodles.jpg.b64',
  'fried-rice': 'food-fried-rice.jpg.b64',
  barszcz: 'food-barszcz.jpg.b64',
  bigos: 'food-bigos.jpg.b64',
  'bbq-ribs': 'food-bbq-ribs.jpg.b64',
  'beef-stew': 'food-beef-stew.jpg.b64',
  brownie: 'food-brownie.jpg.b64',
  'creme-brulee': 'food-creme-brulee.jpg.b64',
  crepes: 'food-crepes.jpg.b64',
  bagel: 'food-bagel.jpg.b64',
  bibimbap: 'food-bibimbap.jpg.b64',
  'curry-chickpea': 'food-curry-chickpea.jpg.b64',
  bruschetta: 'food-bruschetta.jpg.b64',
  aperol: 'food-aperol.jpg.b64',
});

const CATEGORY_PHOTOS = Object.freeze({
  'cat-pizza': 'pizza',
  'cat-pasta': 'carbonara',
  'cat-mieso': 'steak',
  'cat-ryby': 'salmon',
  'cat-owoce-morza': 'seafood',
  'cat-warzywa': 'salad',
  'cat-desery': 'dessert',
  'cat-pieczywo': 'sourdough',
  'cat-zupy': 'soup-clear',
  'cat-salatki': 'salad',
  'cat-cocktaile': 'cocktail',
});

const normalise = (value) => String(value || '')
  .toLocaleLowerCase('pl')
  .replace(/ł/g, 'l')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

const RECIPE_RULES = [
  ['pizza', /\b(pizza|pinsa|margherita|diavola|capricciosa|napoletana|quattro formaggi)\b/],
  ['carbonara', /\b(carbonara)\b/],
  ['risotto', /\b(risotto)\b/],
  ['salmon', /\b(losos|salmon)\b/],
  ['steak', /\b(stek|steak|antrykot|ribeye|rostbef|t bone)\b/],
  ['dessert', /\b(tiramisu|deser kawowy)\b/],
  ['salad', /\b(burrata|caprese|salatka|salad)\b/],
  ['aperol', /\baperol spritz\b/],
  ['barszcz', /\bbarszcz (czerwony|ukrainski)\b/],
  ['bigos', /\bbigos\b/],
  ['bbq-ribs', /\b(bbq ribs|zeberka bbq|zeberka w sosie bbq|zeberka grillowane)\b/],
  ['beef-stew', /\b(boeuf bourguignon|gulasz wegierski|gulasz wolowy)\b/],
  ['brownie', /\bbrownie\b/],
  ['creme-brulee', /\bcreme brulee\b/],
  ['crepes', /\b(crepes|nalesniki)\b/],
  ['bagel', /\b(bagel z lososiem|bagel.*losos)\b/],
  ['bibimbap', /\bbibimbap\b/],
  ['curry-chickpea', /\b(curry z ciecierzycy|chickpea curry)\b/],
  ['bruschetta', /\bbruschetta\b/],
  ['cocktail', /\b(americano|old fashioned|whiskey sour|gin tonic|moscow mule|mojito|negroni|margarita|koktajl|cocktail|drink)\b/],
  ['lasagna', /\b(lasagna|lasagne)\b/],
  ['chicken-curry', /\b(tikka masala|butter chicken|chicken curry)\b/],
  ['schnitzel', /\b(kotlet schabowy|schabowy|wiener schnitzel|schnitzel)\b/],
  ['soup-tomato', /\b(zupa pomidorowa|pomidorowa|tomato soup)\b/],
  ['soup-clear', /\b(rosol|bulion drobiowy|chicken broth|chicken stock)\b/],
  ['soup-pumpkin', /\b(krem z dyni|zupa dyniowa|pumpkin soup)\b/],
  ['pasta-tomato', /\b(spaghetti al pomodoro|sos pomidorowy do makaronu|pasta pomodoro|pasta marinara|spaghetti all amatriciana)\b/],
  ['asian-noodles', /\b(pad thai|pad see ew|pad see|mie goreng|chow mein)\b/],
  ['fried-rice', /\b(fried rice|smazony ryz|nasi goreng)\b/],
  ['cake', /\b(szarlotka|apple pie)\b/],
  ['babka-piaskowa', /\b(babka piaskowa|babka cytrynowa|babka drozdzowa)\b/],
  ['baba-ganoush', /\b(baba ganoush|baba ghanoush|mutabal)\b/],
  ['sourdough', /\b(chleb na zakwasie|sourdough|chleb zytni|chleb pszenny na drozdzach|bagietka|baguette|bread)\b/],
  ['soup', /\b(zurek)\b/],
  ['seafood', /\b(vongole|malze|mussels|krewetki|krewetka|frutti di mare|owoce morza)\b/],
  ['pierogi', /\b(pierogi|pierog|uszka)\b/],
  ['burger', /\b(burger|hamburger)\b/],
  ['focaccia', /\b(focaccia|ciabatta)\b/],
];

const photoPromises = new Map();

function recipePhotoKey(recipe) {
  if (!recipe || recipe.thumb || recipe.photo) return null;
  const name = normalise(recipe.name);
  for (const [key, pattern] of RECIPE_RULES) {
    if (pattern.test(name)) return key;
  }
  // Zdjęcie kategorii jest lepszym, spójnym fallbackiem niż ilustracja,
  // gdy nazwa potrawy nie ma jeszcze własnej fotografii.
  return CATEGORY_PHOTOS[recipe.category] || null;
}

function loadPhoto(key) {
  if (!PHOTO_FILES[key]) return Promise.resolve(null);
  if (!photoPromises.has(key)) {
    const url = new URL(PHOTO_FILES[key], import.meta.url);
    photoPromises.set(key, fetch(url.href, { cache: 'force-cache' })
      .then((response) => {
        if (!response.ok) throw new Error('Nie udało się odczytać zdjęcia ' + key);
        return response.text();
      })
      .then((base64) => {
        const data = base64.trim();
        if (!data.startsWith('/9j/') || data.length < 1000) throw new Error('Nieprawidłowe zdjęcie ' + key);
        return 'data:image/jpeg;base64,' + data;
      })
      .catch((error) => {
        photoPromises.delete(key);
        console.warn('[Żarłok 2.0] Zdjęcie niedostępne, używam ilustracji:', key, error);
        return null;
      }));
  }
  return photoPromises.get(key);
}

function attach(img, key) {
  if (!img || !key) return;
  img.dataset.photoRequested = key;
  loadPhoto(key).then((src) => {
    if (!src || !img.isConnected || img.dataset.photoRequested !== key) return;
    img.classList.remove('art');
    img.dataset.photoSource = key;
    img.src = src;
  }).catch(() => {});
}

/** Podmień ilustrację wyłącznie wtedy, gdy nazwa naprawdę pasuje do dania. */
export function attachRecipePhoto(img, recipe) {
  attach(img, recipePhotoKey(recipe));
}

/** Zdjęcie reprezentacyjne dla kafla kategorii (nie dla konkretnej receptury). */
export function attachCategoryPhoto(img, categoryId) {
  attach(img, CATEGORY_PHOTOS[categoryId] || null);
}

/** Przydatne przy wyborze wyróżnionej receptury na ekranie Start. */
export function hasFoodPhoto(recipe) {
  return !!(recipe && (recipe.thumb || recipe.photo || recipePhotoKey(recipe)));
}
