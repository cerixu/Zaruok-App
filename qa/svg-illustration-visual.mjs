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
      return imgs.length === 12 && imgs.every((img) => img.complete && img.naturalWidth === 240 && img.naturalHeight === 240);
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
        backgroundVariants: new Set(bg).size,
      };
    });
    if (result.count !== 12 || result.distinctDishes !== 6 || result.broken.length) throw new Error('Niekompletny zestaw ilustracji na ' + device.name + ': ' + JSON.stringify(result));
    if (result.bodyWidth > result.viewportWidth + 1) throw new Error('Poziomy overflow na ' + device.name + ': ' + JSON.stringify(result));
    if (result.backgroundVariants < 2) throw new Error('Brak wariantów tła na ' + device.name);
    await page.screenshot({ path: 'qa-shots/svg-hybrid-' + device.name + '.png', fullPage: true });
    console.log('PASS SVG visual ' + device.name + ': ' + JSON.stringify(result));
    await page.close();
  }
  if (errors.length) throw new Error(errors.join('\n'));
} finally {
  await browser.close();
}
