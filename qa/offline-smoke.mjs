import fs from 'node:fs';
import { chromium } from 'playwright';

const swSource = fs.readFileSync('sw.js', 'utf8');
const swVersion = swSource.match(/const VERSION = '([^']+)'/);
if (!swVersion) throw new Error('Nie można odczytać wersji cache z sw.js.');
const serviceWorkerCacheName = swVersion[1];

const base = process.env.BASE_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();

const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

async function ready() {
  await page.waitForFunction(() => window.__kucharzyna?.ready === true, null, { timeout: 15000 });
}
async function dismiss() {
  const start = page.getByRole('button', { name: 'Zaczynamy' }).first();
  if (await start.count() && await start.isVisible().catch(() => false)) await start.click();
}

try {
  // Online bootstrap and cache installation.
  await page.goto(base, { waitUntil: 'networkidle' });
  await ready();
  await dismiss();

  await page.goto(base + '#/recipes', { waitUntil: 'networkidle' });
  await ready();
  await page.waitForSelector('a[href^="#/recipe/"]', { state: 'visible', timeout: 8000 });

  await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) throw new Error('Service Worker API niedostępne.');
    await navigator.serviceWorker.ready;
  });
  await page.waitForFunction(() => !!navigator.serviceWorker.controller, null, { timeout: 10000 });

  const recipePhotoFiles = [
    'food-golabki.jpg.b64', 'food-sernik.jpg.b64', 'food-aglio-olio.jpg.b64', 'food-caesar-salad.jpg.b64',
    'food-pizza-diavola.jpg.b64', 'food-vegan-burger.jpg.b64', 'food-risotto-milanese.jpg.b64', 'food-pesto-genovese.jpg.b64',
    'food-tom-yum.jpg.b64',
    'food-ramen-tonkotsu.jpg.b64',
    'food-sushi-maki.jpg.b64',
    'food-pho-bo.jpg.b64',
  ];
  async function assertRecipePhotosCached(label) {
    const cached = await page.evaluate(async ({ files, cacheName }) => {
      const names = await caches.keys();
      if (!names.includes(cacheName)) throw new Error('Brak cache Service Workera: ' + cacheName);
      const cache = await caches.open(cacheName);
      return Promise.all(files.map(async (path) => ({
        path,
        cached: !!(await cache.match(new URL(path, location.href).href)),
      })));
    }, { files: recipePhotoFiles, cacheName: serviceWorkerCacheName });
    const missing = cached.filter((item) => !item.cached).map((item) => item.path);
    if (missing.length) throw new Error(label + ': brak zdjęć receptur w cache offline: ' + missing.join(', '));
  }
  await assertRecipePhotosCached('Przed odłączeniem sieci');

  const onlineCount = await page.locator('a[href^="#/recipe/"]').count();
  const href = await page.locator('a[href^="#/recipe/"]').first().getAttribute('href');
  if (onlineCount < 1 || !href) throw new Error('Brak receptury do testu offline.');

  // Hard network cut after the service worker is controlling the page.
  await context.setOffline(true);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await ready();
  await dismiss();
  await page.waitForSelector('a[href^="#/recipe/"]', { state: 'visible', timeout: 12000 });
  await assertRecipePhotosCached('Po odłączeniu sieci');

  const offlineCount = await page.locator('a[href^="#/recipe/"]').count();
  if (offlineCount < onlineCount) {
    throw new Error('Offline utracił receptury: online=' + onlineCount + ', offline=' + offlineCount);
  }

  await page.goto(base + href, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.detail', { state: 'visible', timeout: 8000 });
  if (!(await page.locator('.detail').count())) throw new Error('Receptura nie otworzyła się offline.');

} finally {
  await context.close();
  await browser.close();
}

if (errors.length) {
  console.error('Błędy przeglądarki:\n' + errors.join('\n'));
  process.exit(1);
}
console.log('PASS: strict offline PWA smoke');
