import { chromium } from 'playwright';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
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
  await page.goto(base, { waitUntil: 'networkidle' });
  await ready();
  await dismiss();

  const forms = await page.evaluate(async () => {
    const { fmtUnit } = await import('./util.js');
    const cases = [
      [1, 'łyżka', 'łyżka'],
      [1.5, 'łyżka', 'łyżki'],
      [2, 'łyżka', 'łyżki'],
      [4, 'łyżka', 'łyżki'],
      [5, 'łyżka', 'łyżek'],
      [12, 'łyżka', 'łyżek'],
      [21, 'łyżka', 'łyżek'],
      [22, 'łyżka', 'łyżki'],
      [3, 'łyżeczka', 'łyżeczki'],
      [5, 'łyżeczka', 'łyżeczek'],
      [2, 'szczypta', 'szczypty'],
      [5, 'szczypta', 'szczypt'],
      [1, 'porcja', 'porcja'],
      [4, 'porcja', 'porcje'],
      [5, 'porcja', 'porcji'],
      [250, 'g', 'g'],
      [2, 'szt.', 'szt.'],
    ];
    return cases.map(([n, u, expected]) => ({ n, u, actual: fmtUnit(n, u), expected }));
  });
  const bad = forms.filter((x) => x.actual !== x.expected);
  if (bad.length) throw new Error('Błędna odmiana: ' + JSON.stringify(bad));

  await page.goto(base + '#/recipe/rcp_seed_ragu_alla_bolognese', { waitUntil: 'networkidle' });
  await ready();
  await dismiss();
  await page.waitForSelector('.detail', { state: 'visible', timeout: 8000 });

  const units = await page.locator('.detail .ing-qty .unit').allTextContents();
  const visibleBad = units.filter((u) => /\błyżka\b|\błyżeczka\b|\bszczypta\b|\bporcja\b/.test(u.trim()));
  if (visibleBad.length) throw new Error('Widok receptury renderuje surową jednostkę zamiast odmiany: ' + JSON.stringify(visibleBad));

  console.log('PASS: Polish unit grammar runtime + recipe rendering');
} finally {
  await browser.close();
}

if (errors.length) {
  console.error('Błędy przeglądarki:\n' + errors.join('\n'));
  process.exit(1);
}
