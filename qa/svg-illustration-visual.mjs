import { chromium } from 'playwright';
import fs from 'node:fs';

const baseUrl = process.env.ZARLOK_BASE_URL || 'http://127.0.0.1:4173';
fs.mkdirSync('qa-shots', { recursive: true });
const browser = await chromium.launch({ headless: true });
const errors = [];
try {
  for (const device of [
    { name: 'desktop', viewport: { width: 1280, height: 900 } },
    { name: 'iphone', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  ]) {
    const page = await browser.newPage({ viewport: device.viewport, isMobile: device.isMobile || false, hasTouch: device.hasTouch || false, deviceScaleFactor: 1 });
    page.on('pageerror', (error) => errors.push(device.name + ': ' + error.message));
    page.on('requestfailed', (request) => errors.push(device.name + ': ' + request.url() + ' — ' + request.failure()?.errorText));
    const response = await page.goto(baseUrl + '/design/svg-hybrid-preview.html', { waitUntil: 'networkidle' });
    if (!response?.ok()) throw new Error('Preview nie ładuje się na ' + device.name + ': HTTP ' + response?.status());
    await page.locator('.sample img').first().waitFor();
    await page.waitForFunction(() => {
      const imgs = [...document.querySelectorAll('.sample img')];
      return imgs.length === 24 && imgs.every((img) => img.complete && img.naturalWidth > 0 && img.naturalHeight > 0 && Math.abs(img.naturalWidth / img.naturalHeight - 1) < 0.02);
    }, null, { timeout: 10000 });
    const result = await page.evaluate(() => {
      const images = [...document.querySelectorAll('.sample img')];
      const broken = images.filter((img) => !img.naturalWidth).map((img) => img.dataset.dish);
      const groups = new Set(images.map((img) => img.dataset.dish));
      const bg = [...document.querySelectorAll('.sample')].map((el) => getComputedStyle(el).backgroundColor);
      return {
        count: images.length,
        distinctDishes: groups.size,
        broken,
        minimumRenderedWidth: Math.min(...images.map((img) => img.getBoundingClientRect().width)),
        bodyWidth: document.body.scrollWidth,
        viewportWidth: window.innerWidth,
        backgroundVariants: new Set([...document.querySelectorAll('.sample')].map((el) => getComputedStyle(el).backgroundImage + '|' + getComputedStyle(el).backgroundColor)).size,
      };
    });
    if (result.count !== 24 || result.distinctDishes !== 12 || result.broken.length) throw new Error('Niekompletny zestaw ilustracji na ' + device.name + ': ' + JSON.stringify(result));
    if (result.bodyWidth > result.viewportWidth + 1) throw new Error('Poziomy overflow na ' + device.name + ': ' + JSON.stringify(result));
    if (result.backgroundVariants < 2) throw new Error('Brak wariantów tła na ' + device.name);
    await page.screenshot({ path: 'qa-shots/svg-hybrid-' + device.name + '.png', fullPage: true });
    console.log('PASS SVG prototype visual ' + device.name + ': ' + JSON.stringify(result));

    const productionFiles = [
      'bruschetta.svg', 'carbonara.svg', 'gnocchi-pomodoro.svg', 'lasagna.svg',
      'panna-cotta.svg', 'pizza-margherita.svg', 'ravioli-ricotta-spinaci.svg',
      'risotto-funghi.svg', 'tagliatelle-ragu.svg', 'tiramisu.svg',
    ];
    await page.evaluate(({ files, origin }) => {
      const holder = document.createElement('div');
      holder.dataset.productionSvgAudit = 'true';
      holder.setAttribute('aria-hidden', 'true');
      holder.style.cssText = 'position:fixed;left:-10000px;top:0;width:640px;height:640px;overflow:hidden;visibility:hidden;pointer-events:none';
      for (const file of files) {
        const img = new Image();
        img.dataset.productionSvg = file;
        img.width = 64;
        img.height = 64;
        img.src = new URL('/assets/food-svg/' + file, origin).href;
        holder.appendChild(img);
      }
      document.body.appendChild(holder);
    }, { files: productionFiles, origin: baseUrl });
    await page.waitForFunction(() => {
      const imgs = [...document.querySelectorAll('[data-production-svg]')];
      return imgs.length === 10 && imgs.every((img) => img.complete && img.naturalWidth === 1024 && img.naturalHeight === 1024);
    }, null, { timeout: 20000 });
    const productionResult = await page.evaluate(() => [...document.querySelectorAll('[data-production-svg]')].map((img) => ({
      file: img.dataset.productionSvg, width: img.naturalWidth, height: img.naturalHeight,
    })));
    if (productionResult.length !== 10 || productionResult.some((img) => img.width !== 1024 || img.height !== 1024)) {
      throw new Error('Nie wszystkie produkcyjne SVG renderują się poprawnie na ' + device.name + ': ' + JSON.stringify(productionResult));
    }
    console.log('PASS production SVG rendering ' + device.name + ': ' + productionResult.length + ' assets, 1024×1024');
    await page.close();
  }
  if (errors.length) throw new Error(errors.join('\n'));
} finally {
  await browser.close();
}
