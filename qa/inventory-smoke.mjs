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
async function expectText(text, label) {
  if (!(await page.getByText(text, { exact: false }).count())) throw new Error(label || ('Brak tekstu: ' + text));
}

try {
  await page.goto(base + '#/inventory', { waitUntil: 'networkidle' });
  await ready();
  await page.waitForTimeout(900);
  await dismiss();

  await page.getByRole('button', { name: 'Dodaj produkt do magazynu' }).click();
  await page.getByLabel('Nazwa produktu').fill('Mąka testowa');
  await page.getByLabel('Aktualny stan').fill('1');
  await page.getByLabel('Jednostka stanu').selectOption('kg');
  await page.getByLabel('Próg niskiego stanu').fill('2');
  await page.getByLabel('Cena za jednostkę (zł)').fill('3.5');
  await page.getByRole('button', { name: 'Zapisz', exact: true }).click();
  await page.waitForTimeout(250);
  await expectText('Mąka testowa', 'Nie zapisano produktu w magazynie.');
  await expectText('Niski stan', 'Nie pokazano ostrzeżenia o niskim stanie.');

  await page.getByRole('button', { name: 'Dodaj braki do zakupów' }).click();
  await page.goto(base + '#/shopping', { waitUntil: 'networkidle' });
  await ready();
  await dismiss();
  await expectText('Mąka testowa', 'Braki magazynowe nie trafiły na listę zakupów.');

  await page.goto(base + '#/inventory', { waitUntil: 'networkidle' });
  await ready();
  await dismiss();
  await page.getByRole('button', { name: 'Zarejestruj stratę: Mąka testowa' }).click();
  await page.getByLabel('Ilość straty (kg)').fill('0.5');
  await page.getByLabel('Powód').selectOption('Zepsute');
  await page.getByRole('button', { name: 'Zapisz stratę' }).click();
  await page.waitForTimeout(250);
  await expectText('1,75 zł', 'Koszt tygodniowej straty nie został obliczony poprawnie.');

  await page.getByRole('button', { name: 'Skanuj kod EAN' }).click();
  await page.waitForSelector('.scanner-frame', { timeout: 5000 });
  if (!(await page.locator('.scanner-line').count())) throw new Error('Brak animowanej linii skanowania EAN.');
  if (!(await page.getByLabel('Kod EAN').count())) throw new Error('Brak ręcznego pola kodu EAN.');
  await page.getByRole('button', { name: 'Zamknij', exact: true }).click();

} finally {
  await browser.close();
}
if (errors.length) {
  console.error('Błędy przeglądarki:\n' + errors.join('\n'));
  process.exit(1);
}
console.log('PASS: inventory, waste cost, shopping handoff, and EAN scanner UI');
