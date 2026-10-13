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
const badRequests = [];
page.on('pageerror', (e) => errors.push(String(e.stack || e)));
page.on('requestfailed', (req) => badRequests.push(req.url() + ' :: ' + String(req.failure()?.errorText || 'request failed')));
page.on('response', (res) => { if (/\\.js(?:\\?|$)/.test(res.url()) && !res.ok()) badRequests.push(res.status() + ' ' + res.url()); });
page.on('console', (m) => { if (m.type() === 'error') errors.push('CONSOLE ' + m.text() + ' @ ' + JSON.stringify(m.location())); });
page.on('requestfailed', (r) => errors.push('REQUESTFAIL ' + r.url() + ' ' + (r.failure()?.errorText || '')));
page.on('response', (r) => { if (r.status() >= 400) errors.push('HTTP ' + r.status() + ' ' + r.url()); });

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
    throw new Error('App readiness timeout. URL=' + href + '\\nBODY=' + body.slice(0, 2000) + '\\nERRORS=' + errors.join(' | ') + '\\nBAD_REQUESTS=' + badRequests.join(' | ') + '\\nCAUSE=' + error.message);
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
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await ready();
  await page.waitForTimeout(1200);
  await dismissWhatsNew();

  const designStylesLoaded = await page.evaluate(() => Array.from(document.styleSheets).some((s) => s.href && s.href.includes('claude-completion.css')));
  assert(designStylesLoaded, 'Brak pełnej warstwy stylu Claude / Liquid Glass.');

  const startBox = await box('.zf-head');
  const tabBox = await box('#tabbar');
  assert(startBox.width > 300, 'Nagłówek Start jest za wąski.');
  const tabMetrics = await page.evaluate(() => {
    const bar = document.querySelector('#tabbar');
    const rect = bar.getBoundingClientRect();
    const style = getComputedStyle(bar);
    const tabs = [...bar.querySelectorAll('.tab')];
    const icons = tabs.map((tab) => tab.querySelector('.tab-ico')?.getBoundingClientRect());
    return {
      viewport: innerWidth,
      x: rect.x, y: rect.y, width: rect.width, height: rect.height,
      bottomGap: innerHeight - rect.bottom,
      centerError: Math.abs((rect.left + rect.right) / 2 - innerWidth / 2),
      firstIconShiftX: (() => {
        const svg = bar.querySelector('.tab:nth-child(1) .tab-ico svg');
        if (!svg) return null;
        const transform = getComputedStyle(svg).transform;
        return transform === 'none' ? 0 : new DOMMatrixReadOnly(transform).m41;
      })(),
      leftGap: rect.left,
      rightGap: innerWidth - rect.right,
      radius: style.borderRadius,
      backgroundColor: style.backgroundColor,
      position: style.position,
      tabs: tabs.length,
      activeMarkerDisplay: getComputedStyle(tabs.find((tab) => tab.classList.contains('on')) || bar.querySelector('.tab'), '::after').display,
      activeTabTransform: getComputedStyle(tabs.find((tab) => tab.classList.contains('on')) || bar.querySelector('.tab')).transform,
      iconsInside: icons.every((icon) => icon && icon.left >= rect.left && icon.right <= rect.right && icon.top >= rect.top && icon.bottom <= rect.bottom),
      widths: tabs.map((tab) => tab.getBoundingClientRect().width),
    };
  });
  assert(tabBox.height >= 50 && tabBox.height <= 80, 'Dolna nawigacja ma nieprawidłową wysokość: ' + JSON.stringify(tabMetrics));
  assert(tabMetrics.position === 'absolute' && tabMetrics.width < tabMetrics.viewport && tabMetrics.x > 0 && tabMetrics.centerError <= 2 && tabMetrics.leftGap >= 8 && tabMetrics.rightGap >= 8,
    'Dolna nawigacja nie jest równo wycentrowaną pływającą kapsułą: ' + JSON.stringify(tabMetrics));
  assert(tabMetrics.backgroundColor.includes('0.95') || tabMetrics.backgroundColor.includes('0.97'),
    'Dolna nawigacja jest zbyt przezroczysta i przepuszcza tekst/karty spod spodu: ' + JSON.stringify(tabMetrics));
  assert(tabMetrics.bottomGap >= 5 && tabMetrics.bottomGap < 70,
    'Dolna nawigacja koliduje z dolnym obszarem bezpiecznym: ' + JSON.stringify(tabMetrics));
  assert(tabMetrics.tabs === 5 && tabMetrics.widths.every((w) => w >= 45) && tabMetrics.iconsInside,
    'Ikony lub zakładki dolnej nawigacji są ściśnięte albo wychodzą poza pasek: ' + JSON.stringify(tabMetrics));
  assert(tabMetrics.firstIconShiftX !== null && Math.abs(tabMetrics.firstIconShiftX) <= 0.1,
    'Pierwsza ikona dolnego paska jest przesunięta poza optyczny środek: ' + JSON.stringify(tabMetrics));
  assert(tabMetrics.activeMarkerDisplay === 'none',
    'Aktywna zakładka ma odziedziczony marker/kropkę, która psuje wyrównanie: ' + JSON.stringify(tabMetrics));
  assert(tabMetrics.activeTabTransform === 'none',
    'Cała aktywna zakładka nie może skakać podczas przejść stanów: ' + JSON.stringify(tabMetrics));

  // Ustawienie podpisów zakładek musi działać w obu stanach; stare reguły CSS
  // wcześniej wymuszały display:block nawet przy data-tablabels="off".
  const tabLabelStates = await page.evaluate(() => {
    const root = document.documentElement;
    const old = root.getAttribute('data-tablabels');
    const labels = [...document.querySelectorAll('#tabbar .tab .tab-label')];
    root.setAttribute('data-tablabels', 'off');
    const hiddenWhenOff = labels.length === 5 && labels.every((el) => getComputedStyle(el).display === 'none');
    root.setAttribute('data-tablabels', 'on');
    const shownWhenOn = labels.length === 5 && labels.every((el) => getComputedStyle(el).display !== 'none');
    const bar = document.querySelector('#tabbar').getBoundingClientRect();
    const labelsInsideBar = labels.every((el) => {
      const r = el.getBoundingClientRect();
      return r.left >= bar.left - 1 && r.right <= bar.right + 1;
    });
    if (old === null) root.removeAttribute('data-tablabels');
    else root.setAttribute('data-tablabels', old);
    return { hiddenWhenOff, shownWhenOn, labelsInsideBar, count: labels.length };
  });
  assert(tabLabelStates.hiddenWhenOff && tabLabelStates.shownWhenOn && tabLabelStates.labelsInsideBar,
    'Podpisy zakładek nie respektują ustawienia lub wychodzą poza pasek: ' + JSON.stringify(tabLabelStates));

  const tabCentering = await page.evaluate(() => {
    const bar = document.querySelector('#tabbar').getBoundingClientRect();
    return [...document.querySelectorAll('#tabbar .tab')].map((tab) => {
      const icon = tab.querySelector('.tab-ico').getBoundingClientRect();
      return Math.abs((icon.left + icon.right) / 2 - (tab.getBoundingClientRect().left + tab.getBoundingClientRect().right) / 2);
    });
  });
  assert(tabCentering.length === 5 && tabCentering.every((n) => n <= 1.5),
    'Ikony zakładek nie są wycentrowane we własnych polach: ' + JSON.stringify(tabCentering));

  const tapTarget = page.locator('#tabbar .tab[data-tab="recipes"]');
  const tapBox = await tapTarget.boundingBox();
  await page.mouse.move(tapBox.x + tapBox.width / 2, tapBox.y + tapBox.height / 2);
  await page.mouse.down();
  const pressTransforms = await tapTarget.evaluate((el) => ({
    tab: getComputedStyle(el).transform,
    icon: getComputedStyle(el.querySelector('.tab-ico')).transform,
  }));
  await page.mouse.move(2, 2); // release poza linkiem, żeby nie nawigować podczas testu :active
  await page.mouse.up();
  assert(pressTransforms.tab === 'none' && pressTransforms.icon !== 'none',
    'Naciśnięcie nawigacji powinno animować tylko kapsułę ikony, bez przesuwania całej zakładki: ' + JSON.stringify(pressTransforms));
  await shot('01-start.png');

  // Responsive overflow sweep: horizontal rails may scroll internally, but the page itself must not widen.
  for (const width of [375, 390, 932]) {
    await page.setViewportSize({ width, height: width === 932 ? 430 : 844 });
    await page.waitForTimeout(100);
    await assertNoPageOverflow('Start @ ' + width + 'px');
  }
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto(base + '#/recipes', { waitUntil: 'domcontentloaded' });
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

  // Capture and assert the exact screen affected by the recipe search/filter styling.
  const recipeUi = await page.evaluate(() => {
    const box = document.querySelector('.topbar .searchbox');
    const input = document.querySelector('.topbar .search-input');
    const chip = document.querySelector('.topbar .chips .chip.on');
    if (!box || !input || !chip) return null;
    const bs = getComputedStyle(box);
    const ins = getComputedStyle(input);
    const cs = getComputedStyle(chip);
    return {
      radius: parseFloat(bs.borderTopLeftRadius),
      inputBorder: parseFloat(ins.borderTopWidth),
      inputBackground: ins.backgroundColor,
      chipColor: cs.color,
      searchboxWidth: box.getBoundingClientRect().width
    };
  });
  assert(recipeUi, 'Brakuje wyszukiwarki lub aktywnego filtra na liście receptur.');
  assert(recipeUi.radius >= 16, 'Pole wyszukiwania nie ma zaokrąglonego kształtu: ' + JSON.stringify(recipeUi));
  assert(recipeUi.inputBorder === 0, 'Wyszukiwarka ma dodatkową ramkę wewnątrz szklanego kontenera: ' + JSON.stringify(recipeUi));
  const chipRgb = (recipeUi.chipColor.match(/\d+/g) || []).slice(0, 3).map(Number);
  assert(chipRgb.length === 3 && chipRgb[0] > 180 && chipRgb[1] > 150,
    'Aktywny filtr ma zbyt ciemny tekst zamiast jasnego kontrastu: ' + JSON.stringify(recipeUi));
  await shot('02-recipes-list.png');

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

  await page.goto(base + '#/recipes', { waitUntil: 'domcontentloaded' });
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
