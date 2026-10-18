/* ==========================================================================
   Żarłok 2.0 — prawdziwe zdjęcia dań.
   Fotografie są wersjonowane lokalnie w repozytorium jako base64/JPEG, dzięki
   czemu działają również offline. Własne zdjęcie użytkownika ma pierwszeństwo;
   gdy zdjęcie nie istnieje albo się nie załaduje, zostaje ilustracja SVG.
   ========================================================================== */

const PHOTO_FILES = Object.freeze({
  pizza: 'assets/food/pizza.jpg.b64',
  carbonara: 'assets/food/carbonara.jpg.b64',
  risotto: 'assets/food/risotto.jpg.b64',
  salmon: 'assets/food/salmon.jpg.b64',
  steak: 'assets/food/steak.jpg.b64',
  dessert: 'assets/food/dessert.jpg.b64',
  salad: 'assets/food/salad.jpg.b64',
  soup: 'assets/food/soup.jpg.b64',
  seafood: 'assets/food/seafood.jpg.b64',
  pierogi: 'assets/food/pierogi.jpg.b64',
  burger: 'assets/food/burger.jpg.b64',
  focaccia: 'assets/food/focaccia.jpg.b64',
});

const CATEGORY_PHOTOS = Object.freeze({
  'cat-pizza': 'pizza',
  'cat-pasta': 'carbonara',
  'cat-mieso': 'steak',
  'cat-ryby': 'salmon',
  'cat-owoce-morza': 'seafood',
  'cat-warzywa': 'salad',
  'cat-desery': 'dessert',
  'cat-pieczywo': 'focaccia',
  'cat-zupy': 'soup',
  'cat-salatki': 'salad',
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
  ['soup', /\b(zurek)\b/],
  ['seafood', /\b(vongole|malze|mule|krewetki|krewetka|frutti di mare|owoce morza)\b/],
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
  return null;
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
