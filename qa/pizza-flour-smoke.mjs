import { chromium } from 'playwright';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173/';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));

try {
  await page.goto(base + '#/calc/pizza', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__kucharzyna?.ready === true, null, { timeout: 15000 });

  const mode = await page.getByRole('button', { name: 'Mam mąkę' }).count();
  if (!mode) throw new Error('Brak opcji „Mam mąkę”');

  const flourInput = page.getByLabel('Masa mąki');
  if (!(await flourInput.count())) throw new Error('Brak pola „Masa mąki”');
  await flourInput.fill('7200');

  const values = await page.evaluate(async () => {
    const { pizzaCalcFromFlour } = await import('./calculator.js');
    return pizzaCalcFromFlour({ flour: 7200, hydration: 65, salt: 3, oil: 0, yeast: 0.2 });
  });

  const expected = { flour: 7200, water: 4680, salt: 216, yeast: 14.4, total: 12110.4 };
  const starter = await page.evaluate(async () => {
    const { pizzaCalcFromFlour } = await import('./calculator.js');
    const r = pizzaCalcFromFlour({ flour: 7200, hydration: 65, salt: 3, oil: 0, yeast: 0 });
    return { amount065: r.flour * 0.65 / 100, amount1: r.flour * 1 / 100 };
  });
  if (starter.amount065 !== 46.8 || starter.amount1 !== 72) throw new Error('Błędny przelicznik zakwasu: ' + JSON.stringify(starter));
  for (const [k, v] of Object.entries(expected)) {
    if (Math.abs(values[k] - v) > 0.001) throw new Error('Błędny wynik ' + k + ': ' + values[k] + ', oczekiwano ' + v);
  }

  const water = await page.locator('.results-grid').innerText();
  if (!water.includes('4 680') && !water.includes('4680')) throw new Error('Widok nie pokazuje 4680 g wody');

  await page.getByRole('button', { name: 'Kulki' }).click();
  if (!(await page.getByLabel('Liczba kulek').count())) throw new Error('Tryb kulek nie wrócił poprawnie');

  await page.getByRole('button', { name: 'Mam mąkę' }).click();
  if (!(await page.getByLabel('Masa mąki').count())) throw new Error('Powrót do trybu „Mam mąkę” nie działa');

  // Fermentation fields must retain focus across consecutive keystrokes.
  const temperature = page.getByLabel('Temperatura fermentacji');
  await temperature.click();
  await page.waitForTimeout(30);
  await temperature.press('Control+A');
  await page.keyboard.type('25');
  if (await temperature.inputValue() !== '25') throw new Error('Pole temperatury gubi fokus przy wpisywaniu znak po znaku');
  if (!(await temperature.evaluate((el) => el === document.activeElement))) throw new Error('Pole temperatury utraciło fokus');

  // Active sourdough is a 1:1:2 build: seed : added flour : added water.
  await page.getByLabel('Masa mąki').fill('1000');
  await page.getByLabel('Rodzaj zaczynu').selectOption('starter');
  if (!(await page.getByText('10 g + 10 g + 20 g = 40 g').count())) throw new Error('Brak objaśnienia proporcji zakwasu 1:1:2');
  await page.getByLabel('Aktywny zakwas procent mąki').fill('40');
  const row = (label) => page.locator('.result').filter({ hasText: label });
  if (!(await row('Zakwas macierzysty').innerText()).includes('100')) throw new Error('Zakwas macierzysty powinien mieć 100 g');
  if (!(await row('Mąka do zakwasu').innerText()).includes('100')) throw new Error('Mąka do zakwasu powinna mieć 100 g');
  if (!(await row('Woda do zakwasu').innerText()).includes('200')) throw new Error('Woda do zakwasu powinna mieć 200 g');
  if (!(await row('Aktywny zakwas łącznie').count())) throw new Error('Brak sumy aktywnego zakwasu');

  await page.getByRole('button', { name: 'Zapisz jako recepturę' }).click();
  const openRecipe = page.getByRole('button', { name: 'Otwórz' }).last();
  await openRecipe.waitFor({ state: 'visible', timeout: 5000 });
  await openRecipe.click();
  await page.waitForSelector('.detail', { state: 'visible', timeout: 5000 });
  await page.locator('.orb-more').first().click();
  await page.waitForSelector('.recipe-full-modal', { state: 'visible', timeout: 5000 });
  const savedRecipe = await page.locator('.recipe-full-modal').innerText();
  for (const item of ['Zakwas macierzysty', 'Mąka pszenna do zakwasu', 'Woda do zakwasu']) {
    if (!savedRecipe.includes(item)) throw new Error('Zapisana receptura nie zawiera składnika: ' + item);
  }

  console.log('PASS: flour-first pizza, focus-stable temperature, 1:1:2 sourdough and saved recipe');
} finally {
  await browser.close();
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
