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
  try {
    await page.waitForSelector('#view', { state: 'attached', timeout: 10000 });
    await page.waitForFunction(() => window.__kucharzyna?.ready === true, null, { timeout: 30000 });
  } catch (error) {
    const body = await page.locator('body').innerText().catch(() => '');
    const href = page.url();
    throw new Error('App readiness timeout. URL=' + href + '\\nBODY=' + body.slice(0, 2000) + '\\nCAUSE=' + error.message);
  }
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

async function assertNoPageOverflow(label) {
  const metrics = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  assert(metrics.document <= metrics.viewport && metrics.body <= metrics.viewport,
    label + ': poziomy overflow strony ' + JSON.stringify(metrics));
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

  const designStylesLoaded = await page.evaluate(() => Array.from(document.styleSheets).some((s) => s.href && s.href.includes('claude-completion.css')));
  assert(designStylesLoaded, 'Brak pełnej warstwy stylu Claude / Liquid Glass.');

  const startBox = await box('.zf-head');
  const tabBox = await box('#tabbar');
  assert(startBox.width > 300, 'Nagłówek Start jest za wąski.');
  assert(tabBox.height >= 50 && tabBox.y >= 780, 'Dolna nawigacja ma nieprawidłową pozycję/rozmiar.');
  await shot('01-start.png');

  // Responsive overflow sweep: horizontal rails may scroll internally, but the page itself must not widen.
  for (const width of [375, 390, 932]) {
    await page.setViewportSize({ width, height: width === 932 ? 430 : 844 });
    await page.waitForTimeout(100);
    await assertNoPageOverflow('Start @ ' + width + 'px');
  }
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto(base + '#/recipes', { waitUntil: 'networkidle' });
  await ready();
  await dismissWhatsNew();
  const grid = await box('.rgrid, .rail');
  assert(grid.width > 300, 'Lista/siatka receptur nie zajmuje prawidłowej szerokości.');

  for (const width of [375, 390, 932]) {
    await page.setViewportSize({ width, height: width === 932 ? 430 : 844 });
    await page.waitForTimeout(100);
    await assertNoPageOverflow('Receptury @ ' + width + 'px');
  }
  await page.setViewportSize({ width: 390, height: 844 });

  const recipeLinks = await page.locator('a[href^="#/recipe/"]').evaluateAll((els) =>
    [...new Set(els.map((el) => el.getAttribute('href')))].slice(0, 20));
  assert(recipeLinks.length > 0, 'Brak receptury testowej.');
  let selectedRecipe = null;
  let typedIngredientIcons = 0;
  for (const href of recipeLinks) {
    // Change route inside the SPA; do not reload the entire app for every candidate.
    await page.evaluate((target) => { location.hash = target; }, href);
    await page.waitForFunction((target) => location.hash === target, href, { timeout: 5000 });
    await page.waitForSelector('.detail', { state: 'visible', timeout: 5000 });
    await page.waitForTimeout(150);
    await dismissWhatsNew();
    typedIngredientIcons = await page.locator('.orb-dot[data-kind]').count();
    if (typedIngredientIcons > 0) { selectedRecipe = href; break; }
  }
  assert(selectedRecipe, 'Nie znaleziono receptury z ikonami składników do testu.');
  assert(await page.locator('.orb-dot[data-kind] svg').count() > 0, 'Łuk składników nie renderuje ikon wektorowych.');
  assert(await page.locator('.orb-dot[data-kind] svg').first().evaluate((el) => el.namespaceURI) === 'http://www.w3.org/2000/svg', 'Ikony na łuku muszą używać przestrzeni nazw SVG.');
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
  const modalFacts = await page.locator('.recipe-modal-facts').innerText();
  assert(modalFacts.includes('1 porcja'), 'Receptura nie otwiera się domyślnie na jedną porcję.');
  assert(modal.width >= 330 && modal.width <= 390, 'Modal pełnej receptury ma nieprawidłową szerokość.');
  assert(await page.locator('.recipe-modal-ing-icon[data-kind]').count() > 0, 'Brak ikon składników z kolorami semantycznymi w pełnej recepturze.');
  assert(await page.locator('.recipe-modal-ing-icon svg').count() > 0, 'Ikony składników nie są renderowane jako wektorowe grafiki SVG.');
  assert(await page.locator('.recipe-modal-ing-icon svg').first().evaluate((el) => el.namespaceURI) === 'http://www.w3.org/2000/svg', 'Ikony pełnej receptury muszą używać przestrzeni nazw SVG.');
  const ingredientIconRadius = await page.locator('.recipe-modal-ing-icon').first().evaluate((el) => getComputedStyle(el).borderRadius);
  assert(['13px', '14px'].includes(ingredientIconRadius), 'Warstwa Liquid Glass nie wystylowała ikon składników.');
  await shot('03-full-recipe.png');

  const modalScroll = await page.locator('.recipe-full-modal .scroll').first().evaluate((el) => ({
    scrollHeight: el.scrollHeight,
    clientHeight: el.clientHeight,
  })).catch(() => null);
  if (modalScroll) assert(modalScroll.scrollHeight >= modalScroll.clientHeight, 'Modal ma uszkodzony obszar przewijania.');
  // Additional mobile surfaces: design QA must cover the whole app, not only Start.
  async function captureSurface(path, name, label) {
    await page.goto(base + '#' + path, { waitUntil: 'domcontentloaded' });
    await ready();
    await page.waitForTimeout(350);
    await dismissWhatsNew();
    assert(await page.locator('#view .screen').count(), label + ': ekran nie został wyrenderowany.');
    await assertNoPageOverflow(label);
    await shot(name);
  }
  await captureSurface('/calc', '04-calculators.png', 'Kalkulatory');
  await captureSurface('/cook', '05-cook-entry.png', 'Gotuję');
  await captureSurface('/inventory', '06-inventory.png', 'Magazyn');
  assert(await page.locator('.inventory-head-actions .iconbtn svg path').count() > 0, 'Przyciski Magazynu nie mają widocznych ikon SVG.');
  await captureSurface('/more', '07-more.png', 'Więcej');
  await captureSurface('/shopping', '08-shopping.png', 'Zakupy');
  await captureSurface('/search', '09-search.png', 'Wyszukiwanie');
  await captureSurface('/settings', '10-settings.png', 'Ustawienia');

  await page.goto(base + '#/recipes', { waitUntil: 'networkidle' });
  await ready();
  await dismissWhatsNew();
  const cookingRecipe = page.locator('a[href^="#/recipe/"]').first();
  assert(await cookingRecipe.count(), 'Brak receptury do testu widoku gotowania.');
  await cookingRecipe.click();
  await page.waitForSelector('.detail', { state: 'visible', timeout: 5000 });
  await page.getByRole('button', { name: 'GOTUJĘ' }).first().click();
  await page.waitForTimeout(250);
  assert(await page.locator('.guide').count(), 'Nie otworzył się widok prowadzenia gotowania.');
  const guideServings = await page.locator('.guide .stepper-val').innerText();
  assert(guideServings.includes('1') && guideServings.includes('porcja'), 'Tryb prowadzenia nie startuje na jedną porcję.');
  await assertNoPageOverflow('Gotowanie');
  await shot('11-cooking.png');

} finally {
  await browser.close();
}

if (errors.length) {
  console.error('Błędy przeglądarki:\n' + errors.join('\n'));
  process.exit(1);
}
console.log('PASS: mobile visual regression smoke');
