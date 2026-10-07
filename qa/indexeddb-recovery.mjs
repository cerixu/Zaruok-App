import { chromium } from 'playwright';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });

await page.addInitScript(() => {
  const proto = Object.getPrototypeOf(indexedDB);
  const original = proto.open;
  let failed = false;
  proto.open = function (...args) {
    if (!failed) {
      failed = true;
      throw new DOMException('Simulated Safari IndexedDB startup failure', 'InvalidStateError');
    }
    return original.apply(this, args);
  };
});

const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

try {
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__kucharzyna?.ready === true, null, { timeout: 15000 });

  const start = page.locator('.zf-head').first();
  if (!(await start.count())) throw new Error('Start nie wyrenderował się po recovery IndexedDB');

  const recipes = page.locator('.tab[data-tab="recipes"]').first();
  await recipes.click();
  await page.waitForFunction(() => location.hash === '#/recipes', null, { timeout: 5000 });
  if (!(await page.locator('a[href^="#/recipe/"]').count())) throw new Error('Receptury nie załadowały się po recovery IndexedDB');
} finally {
  await browser.close();
}

if (errors.length) {
  console.error('Błędy przeglądarki:\n' + errors.join('\n'));
  process.exit(1);
}
console.log('PASS: IndexedDB startup recovery');
