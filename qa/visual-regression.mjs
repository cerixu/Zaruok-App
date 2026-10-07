import { chromium } from 'playwright';
import fs from 'node:fs';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173/';
fs.mkdirSync('qa-shots', { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});

const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

async function ready() {
  await page.waitForFunction(() => window.__kucharzyna?.ready === true, null, { timeout: 15000 });
}
async function dismissWhatsNew() {
  const overlay = page.locator('#overlays .overlay').first();
  if (!(await overlay.count())) return;
  if (!(await overlay.isVisible().catch(() => false))) return;
  const start = page.getByRole('button', { name: 'Zaczynamy' }).first();
  if (await start.count()) {
    await start.click();
  } else {
    await page.keyboard.press('Escape');
  }
  await page.waitForTimeout(150);
}

async function shot(name) {
  await page.screenshot({ path: 'qa-shots/' + name, fullPage: true });
}

async function box(sel) {
  const loc = page.locator(sel).first();
  assert(await loc.count(), 'Brak elementu: ' + sel);
  return loc.boundingBox();
}

try {
  await page.goto(base, { waitUntil: 'networkidle' });
  await ready();
  await page.waitForTimeout(1200);
  await dismissWhatsNew();

  const startBox = await box('.zf-head');
  const tabBox = await box('#tabbar');
  assert(startBox.width > 300, 'Nagłówek Start jest za wąski.');
  assert(tabBox.height >= 50 && tabBox.y >= 780, 'Dolna nawigacja ma nieprawidłową pozycję/rozmiar.');
  await shot('01-start.png');

  await page.goto(base + '#/recipes', { waitUntil: 'networkidle' });
  await ready();
  await dismissWhatsNew();
  const grid = await box('.rgrid, .rail');
  assert(grid.width > 300, 'Lista/siatka receptur nie zajmuje prawidłowej szerokości.');

  const recipe = page.locator('a[href^="#/recipe/"]').first();
  assert(await recipe.count(), 'Brak receptury testowej.');
  const heart = recipe.locator('xpath=ancestor::*[contains(@class,"rtile")][1]//button[contains(@class,"heart")]');
  assert(await heart.count(), 'Brak serduszka na karcie receptury.');

  await recipe.click();
  await page.waitForTimeout(300);
  const hero = await box('.detail-hero');
  const orbit = await box('.orbit');
  assert(hero.width > 300, 'Hero receptury ma nieprawidłową szerokość.');
  assert(orbit.width > 300, 'Łuk składników ma nieprawidłową szerokość.');
  await shot('02-recipe.png');

  const more = page.locator('.orb-more').first();
  assert(await more.count(), 'Brak przycisku „więcej”.');
  await more.click();
  await page.waitForTimeout(250);

  const modal = await box('.recipe-full-modal');
  assert(modal.width >= 330 && modal.width <= 390, 'Modal pełnej receptury ma nieprawidłową szerokość.');
  assert(await page.locator('.recipe-modal-ing-icon').count() > 0, 'Brak ikon składników w pełnej recepturze.');
  await shot('03-full-recipe.png');

  const modalScroll = await page.locator('.recipe-full-modal .scroll').first().evaluate((el) => ({
    scrollHeight: el.scrollHeight,
    clientHeight: el.clientHeight,
  })).catch(() => null);
  if (modalScroll) assert(modalScroll.scrollHeight >= modalScroll.clientHeight, 'Modal ma uszkodzony obszar przewijania.');
} finally {
  await browser.close();
}

if (errors.length) {
  console.error('Błędy przeglądarki:\n' + errors.join('\n'));
  process.exit(1);
}
console.log('PASS: mobile visual regression smoke');
