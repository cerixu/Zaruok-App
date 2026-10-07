import { chromium } from 'playwright';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
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
  await page.goto(base + '#/recipes', { waitUntil: 'networkidle' });
  await ready();
  await dismiss();
  await page.waitForSelector('a[href^="#/recipe/"]', { state: 'visible', timeout: 8000 });

  // Service Worker must be registered in production. Local HTTP may intentionally
  // skip it, so the test accepts either an active SW or an already-cached app shell.
  const swState = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return 'unsupported';
    const reg = await navigator.serviceWorker.getRegistration();
    return reg?.active ? 'active' : 'none';
  });

  // Simulate loss of network after the app has loaded.
  await context.setOffline(true);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1800);

  const bodyText = await page.locator('body').innerText();
  const shellVisible = await page.locator('#view').isVisible().catch(() => false);
  if (!shellVisible) throw new Error('Aplikacja nie wyrenderowała powłoki po przejściu offline.');

  // If a SW is active, recipes should remain available. If not, report the
  // exact state instead of falsely treating localhost as a production PWA.
  const recipeCount = await page.locator('a[href^="#/recipe/"]').count();
  if (swState === 'active' && recipeCount === 0) {
    throw new Error('Service Worker aktywny, ale po offline nie ma receptur. BODY=' + bodyText.slice(0, 1200));
  }

  await context.setOffline(false);
  if (errors.length) {
    console.error('Błędy przeglądarki:\n' + errors.join('\n'));
    process.exit(1);
  }
  console.log('PASS: offline smoke · serviceWorker=' + swState + ' · recipes=' + recipeCount);
} finally {
  await browser.close();
}
