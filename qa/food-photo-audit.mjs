import fs from 'node:fs';
import { recipePhotoKey } from '../food-photos.js';

const photosSource = fs.readFileSync('food-photos.js', 'utf8');
const photoFiles = new Map(
  [...photosSource.matchAll(/^\s*(['"]?[a-z][a-z0-9-]*['"]?)\s*:\s*'([^']+\.b64)'\s*,?\s*$/gm)]
    .map((match) => [match[1].replace(/['"]/g, ''), match[2]])
);
const recipeRulesBlock = photosSource.match(/const RECIPE_RULES = \[([\s\S]*?)\n\];/);
const categoryBlock = photosSource.match(/const CATEGORY_PHOTOS = Object\.freeze\(\{([\s\S]*?)\n\}\);/);
if (!recipeRulesBlock || !categoryBlock) throw new Error('Nie znaleziono map zdjęć do audytu.');

const ruleKeys = [...recipeRulesBlock[1].matchAll(/^\s*\['([^']+)'\s*,/gm)].map((match) => match[1]);
const categoryKeys = [...categoryBlock[1].matchAll(/^\s*['"]?([a-z][a-z0-9-]*)['"]?\s*:\s*'([^']+)'/gm)];
const duplicates = ruleKeys.filter((key, index) => ruleKeys.indexOf(key) !== index);
if (duplicates.length) throw new Error('Powtórzone klucze RECIPE_RULES: ' + [...new Set(duplicates)].join(', '));

for (const key of [...ruleKeys, ...categoryKeys.map((match) => match[2])]) {
  if (!photoFiles.has(key)) throw new Error('Reguła wskazuje nieistniejący klucz zdjęcia: ' + key);
}
const assetContents = new Map();
for (const [key, file] of photoFiles) {
  if (!fs.existsSync(file)) throw new Error('Brak pliku zdjęcia ' + key + ': ' + file);
  const raw = fs.readFileSync(file, 'utf8').trim();
  if (!raw.startsWith('/9j/') || raw.length < 1000) throw new Error('Nieprawidłowy JPEG base64: ' + file);
  const bytes = Buffer.from(raw, 'base64');
  if (bytes.length < 500 || bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[bytes.length - 2] !== 0xff || bytes[bytes.length - 1] !== 0xd9) {
    throw new Error('Uszkodzony strumień JPEG: ' + file);
  }
  const duplicateOf = assetContents.get(raw);
  if (duplicateOf) throw new Error('Dwa pliki zawierają identyczną fotografię: ' + duplicateOf + ' oraz ' + file);
  assetContents.set(raw, file);
}
const sauceCategory = categoryKeys.find((match) => match[1].replace(/[\'\"]/g, '') === 'cat-sosy');
if (!sauceCategory || sauceCategory[2] !== 'sauce') {
  throw new Error('Kategoria sosów musi korzystać z dedykowanego zdjęcia sosu, nie zdjęcia makaronu.');
}
const recipesThatMustKeepIllustrations = [
  { name: 'Krewetki kung pao', category: 'cat-owoce-morza' },
  { name: 'Matcha tiramisu', category: 'cat-desery' },
  { name: 'Sos carbonara', category: 'cat-sosy' },
  { name: 'Chleb pszenny na drożdżach', category: 'cat-pieczywo' },
];
for (const recipe of recipesThatMustKeepIllustrations) {
  if (recipePhotoKey(recipe) !== null) {
    throw new Error('Niepasujące zdjęcie zostało użyte dla receptury: ' + recipe.name + ' → ' + recipePhotoKey(recipe));
  }
}
const mustNotUseUnrelatedPhotos = [
  { name: 'Krem z brokułów', category: 'cat-zupy' },
  { name: 'Zupa z soczewicy', category: 'cat-zupy' },
  { name: 'Kurczak teriyaki', category: 'cat-mieso' },
  { name: 'Fettuccine Alfredo', category: 'cat-pasta' },
  { name: 'Shepherd’s pie', category: 'cat-mieso' },
  { name: 'Croissant z masłem', category: 'cat-pieczywo' },
  { name: 'Quiche Lorraine', category: 'cat-desery' },
  { name: 'Onigiri z łososiem', category: 'cat-ryby' },
  { name: 'Mojito', category: 'cat-napoje' },
  { name: 'Kurczak pieczony', category: 'cat-mieso' },
  { name: 'Ciabatta', category: 'cat-pieczywo' },
  { name: 'Naan', category: 'cat-pieczywo' },
  { name: 'Brioche', category: 'cat-pieczywo' },
  { name: 'Falafel', category: 'cat-przekaski' },
  { name: 'Hummus', category: 'cat-przekaski' },
  { name: 'Chaczapuri adżarskie', category: 'cat-pieczywo' },
  { name: 'Spanakopita', category: 'cat-przekaski' },
  { name: 'Tosty francuskie', category: 'cat-sniadania' },
  { name: 'Gofry brukselskie', category: 'cat-desery' },
  { name: 'Jajecznica na maśle', category: 'cat-sniadania' },
  { name: 'Pulled pork', category: 'cat-mieso' },
  { name: 'Quesadilla z serem i kurczakiem', category: 'cat-przekaski' },
  { name: 'Tacos al pastor', category: 'cat-mieso' },
  { name: 'Skrzydełka Buffalo', category: 'cat-mieso' },
  { name: 'Zielone curry tajskie', category: 'cat-mieso' },
  { name: 'Kurczak kung pao', category: 'cat-mieso' },
  { name: 'Gyoza', category: 'cat-przekaski' },
  { name: 'Nigiri z łososiem', category: 'cat-ryby' },
  { name: 'Pho ga', category: 'cat-zupy' },
  { name: 'Bun cha', category: 'cat-mieso' },
  { name: 'Gnocchi z masłem szałwiowym', category: 'cat-pasta' },
  { name: 'Orecchiette z brokułem', category: 'cat-pasta' },
  { name: 'Tagliatelle al ragù', category: 'cat-pasta' },
  { name: 'Cannelloni ricotta', category: 'cat-pasta' },
  { name: 'Ragù alla bolognese', category: 'cat-sosy' },
  { name: 'Pączki', category: 'cat-desery' },
  { name: 'Faworki', category: 'cat-desery' },
  { name: 'Churros', category: 'cat-desery' },
  { name: 'Baklava', category: 'cat-desery' },
  { name: 'Pavlova', category: 'cat-desery' },
  { name: 'Racuchy z jabłkami', category: 'cat-desery' },
  { name: 'Kurczak w sosie słodko-kwaśnym', category: 'cat-mieso' },
  { name: 'Wołowina kung pao', category: 'cat-mieso' },
  { name: 'Pstrąg z masłem i migdałami', category: 'cat-ryby' },
  { name: 'Ryba po grecku', category: 'cat-ryby' },
  { name: 'Karp smażony', category: 'cat-ryby' },
  { name: 'Śledź w oleju z cebulą', category: 'cat-ryby' },
  { name: 'Kopytka', category: 'cat-pasta' },
  { name: 'Kluski śląskie', category: 'cat-pasta' },
  { name: 'Ravioli ricotta e spinaci', category: 'cat-pasta' },
  { name: 'Ciasto na pierogi', category: 'cat-pasta' },
  { name: 'Panzanella', category: 'cat-salatki' },
  { name: 'Croque monsieur', category: 'cat-przekaski' },
  { name: 'Pico de gallo', category: 'cat-sosy' },
];
for (const recipe of mustNotUseUnrelatedPhotos) {
  if (recipePhotoKey(recipe) !== null) {
    throw new Error('Niepasujące zdjęcie zostało użyte dla receptury: ' + recipe.name + ' → ' + recipePhotoKey(recipe));
  }
}
const correctPhotoCases = [
  [{ name: 'Pizza Diavola', category: 'cat-pizza' }, 'pizza-diavola'],
  [{ name: 'Burger wegański z czarnej fasoli', category: 'cat-mieso' }, 'vegan-burger'],
  [{ name: 'Risotto alla milanese', category: 'cat-pasta' }, 'risotto-milanese'],
  [{ name: 'Pesto genovese', category: 'cat-sosy' }, 'pesto-genovese'],
  [{ name: 'Tom yum z krewetkami', category: 'cat-zupy' }, 'tom-yum'],
  [{ name: 'Zupa ramen tonkotsu', category: 'cat-zupy' }, 'ramen-tonkotsu'],
  [{ name: 'Sushi maki z ogórkiem i łososiem', category: 'cat-ryby' }, 'sushi-maki'],
  [{ name: 'Pho bo', category: 'cat-zupy' }, 'pho-bo'],
  [{ name: 'Gołąbki w sosie pomidorowym', category: 'cat-mieso' }, 'golabki'],
  [{ name: 'Sernik klasyczny', category: 'cat-desery' }, 'sernik'],
  [{ name: 'Naleśniki z serem', category: 'cat-desery' }, 'crepes'],
  [{ name: 'Spaghetti aglio e olio', category: 'cat-pasta' }, 'aglio-olio'],
  [{ name: 'Sałatka Cezar', category: 'cat-salatki' }, 'caesar-salad'],
  [{ name: 'Pizza Margherita', category: 'cat-pizza' }, 'pizza'],
  [{ name: 'Caprese', category: 'cat-salatki' }, 'salad'],
  [{ name: 'Spaghetti Carbonara', category: 'cat-pasta' }, 'carbonara'],
  [{ name: 'Risotto z grzybami', category: 'cat-pasta' }, 'risotto'],
  [{ name: 'Spaghetti alle vongole', category: 'cat-owoce-morza' }, 'seafood'],
  [{ name: 'Burger domowy', category: 'cat-mieso' }, 'burger'],
  [{ name: 'Sos pomidorowy do makaronu', category: 'cat-sosy' }, 'sauce'],
  [{ name: 'Łosoś pieczony z cytryną', category: 'cat-ryby' }, 'salmon'],
];
for (const [recipe, expected] of correctPhotoCases) {
  const actual = recipePhotoKey(recipe);
  if (actual !== expected) {
    throw new Error('Brak poprawnego dopasowania zdjęcia dla "' + recipe.name + '": oczekiwano ' + expected + ', otrzymano ' + actual);
  }
}
console.log('Photo mapping QA passed: ' + photoFiles.size + ' zdjęć, ' + ruleKeys.length + ' unikalnych reguł, ' + categoryKeys.length + ' zdjęć kategorii.');
