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
      return imgs.length === 40 && imgs.every((img) => img.complete && img.naturalWidth > 0 && img.naturalHeight > 0 && Math.abs(img.naturalWidth / img.naturalHeight - 1) < 0.02);
    }, null, { timeout: 10000 });
    const result = await page.evaluate(() => {
      function opaqueEdgeSamples(img, rasterSize, inset, step) {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = rasterSize;
        const context = canvas.getContext('2d', { willReadFrequently: true });
        context.drawImage(img, 0, 0, rasterSize, rasterSize);
        const pixels = context.getImageData(0, 0, rasterSize, rasterSize).data;
        let count = 0;
        const sample = (x, y) => {
          if (pixels[(y * rasterSize + x) * 4 + 3] > 16) count += 1;
        };
        for (let p = inset; p < rasterSize - inset; p += step) {
          sample(p, inset);
          sample(p, rasterSize - 1 - inset);
          sample(inset, p);
          sample(rasterSize - 1 - inset, p);
        }
        return count;
      }
      const uniqueImages = [...new Map([...document.querySelectorAll('.sample img')].map((img) => [img.dataset.dish, img])).values()];
      const opaqueEdges = uniqueImages.map((img) => ({
        dish: img.dataset.dish,
        samples: opaqueEdgeSamples(img, 240, 2, 6),
      })).filter((entry) => entry.samples > 0);

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
        opaqueEdges,
      };
    });
    if (result.count !== 40 || result.distinctDishes !== 20 || result.broken.length) throw new Error('Niekompletny zestaw ilustracji na ' + device.name + ': ' + JSON.stringify(result));
    if (result.opaqueEdges.length) throw new Error('Nieprzezroczyste piksele na krawędzi prototypu SVG na ' + device.name + ': ' + JSON.stringify(result.opaqueEdges));
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
      return imgs.length === 10 && imgs.every((img) => { const ratio = img.naturalWidth / img.naturalHeight; const expected = img.dataset.productionSvg === 'carbonara.svg' ? (1427 / 1102) : 1; return img.complete && img.naturalWidth > 0 && img.naturalHeight > 0 && Math.abs(ratio - expected) < 0.02; });
    }, null, { timeout: 20000 });
    const productionResult = await page.evaluate(() => [...document.querySelectorAll('[data-production-svg]')].map((img) => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 128;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      context.drawImage(img, 0, 0, 128, 128);
      const pixels = context.getImageData(0, 0, 128, 128).data;
      let opaqueEdgeSamples = 0;
      const sample = (x, y) => { if (pixels[(y * 128 + x) * 4 + 3] > 16) opaqueEdgeSamples += 1; };
      for (let p = 3; p < 125; p += 8) {
        sample(p, 3); sample(p, 124); sample(3, p); sample(124, p);
      }
      return {
        file: img.dataset.productionSvg, width: img.naturalWidth, height: img.naturalHeight,
        opaqueEdgeSamples,
      };
    }));
    if (productionResult.length !== 10 || productionResult.some((img) => img.width <= 0 || img.height <= 0 || Math.abs(img.width / img.height - (img.file === 'carbonara.svg' ? (1427 / 1102) : 1)) >= 0.02)) {
      throw new Error('Nie wszystkie produkcyjne SVG renderują się poprawnie na ' + device.name + ': ' + JSON.stringify(productionResult));
    }
    const migratedBruschetta = productionResult.find((asset) => asset.file === 'bruschetta.svg');
    if (!migratedBruschetta || migratedBruschetta.opaqueEdgeSamples !== 0) throw new Error('Bruschetta produkcyjna nie ma przezroczystych krawędzi na ' + device.name + ': ' + JSON.stringify(migratedBruschetta));
    const migratedTagliatelle = productionResult.find((asset) => asset.file === 'tagliatelle-ragu.svg');
    if (!migratedTagliatelle || migratedTagliatelle.opaqueEdgeSamples !== 0) throw new Error('Tagliatelle al ragù nie ma przezroczystych krawędzi na ' + device.name + ': ' + JSON.stringify(migratedTagliatelle));
    const migratedCarbonara = productionResult.find((asset) => asset.file === 'carbonara.svg');
    if (!migratedCarbonara || migratedCarbonara.opaqueEdgeSamples !== 0) throw new Error('Carbonara produkcyjna nie ma przezroczystych krawędzi na ' + device.name + ': ' + JSON.stringify(migratedCarbonara));
    const migratedLasagna = productionResult.find((asset) => asset.file === 'lasagna.svg');
    if (!migratedLasagna || migratedLasagna.opaqueEdgeSamples !== 0) throw new Error('Lasagne produkcyjne nie mają przezroczystych krawędzi na ' + device.name + ': ' + JSON.stringify(migratedLasagna));
    const migratedPizza = productionResult.find((asset) => asset.file === 'pizza-margherita.svg');
    if (!migratedPizza || migratedPizza.opaqueEdgeSamples !== 0) throw new Error('Pizza Margherita nie ma przezroczystych krawędzi na ' + device.name + ': ' + JSON.stringify(migratedPizza));
    const migratedPannaCotta = productionResult.find((asset) => asset.file === 'panna-cotta.svg');
    if (!migratedPannaCotta || migratedPannaCotta.opaqueEdgeSamples !== 0) throw new Error('Panna cotta nie ma przezroczystych krawędzi na ' + device.name + ': ' + JSON.stringify(migratedPannaCotta));
    const migratedRavioli = productionResult.find((asset) => asset.file === 'ravioli-ricotta-spinaci.svg');
    if (!migratedRavioli || migratedRavioli.opaqueEdgeSamples !== 0) throw new Error('Ravioli ricotta e spinaci nie mają przezroczystych krawędzi na ' + device.name + ': ' + JSON.stringify(migratedRavioli));
    const migratedRisotto = productionResult.find((asset) => asset.file === 'risotto-funghi.svg');
    if (!migratedRisotto || migratedRisotto.opaqueEdgeSamples !== 0) throw new Error('Risotto ai funghi nie ma przezroczystych krawędzi na ' + device.name + ': ' + JSON.stringify(migratedRisotto));
    const legacyBackgrounds = productionResult.filter((asset) => asset.opaqueEdgeSamples > 0);
    console.log('PASS production SVG rendering ' + device.name + ': ' + productionResult.length + ' assetów; Carbonara zachowuje proporcje 1427×1102, pozostałe są kwadratowe; bruschetta, tagliatelle, carbonara, lasagne, pizza Margherita, panna cotta, ravioli i risotto mają przezroczyste krawędzie');
    if (legacyBackgrounds.length) console.warn('AUDIT: production SVG z nieprzezroczystymi pikselami przy krawędzi (do osobnej migracji): ' + legacyBackgrounds.map((asset) => asset.file + '=' + asset.opaqueEdgeSamples).join(', '));
    const compareResponse = await page.goto(baseUrl + '/design/svg-production-compare.html', { waitUntil: 'networkidle' });
    if (!compareResponse?.ok()) throw new Error('Podgląd porównawczy SVG nie ładuje się na ' + device.name + ': HTTP ' + compareResponse?.status());
    await page.waitForFunction(() => {
      const imgs = [...document.querySelectorAll('img[data-asset-id]')];
      return imgs.length === 90 && imgs.every((img) => img.complete && img.naturalWidth > 0 && img.naturalHeight > 0);
    }, null, { timeout: 30000 });
    const compareResult = await page.evaluate(() => {
      const imgs = [...document.querySelectorAll('img[data-asset-id]')];
      const groups = new Map();
      for (const img of imgs) {
        const id = img.dataset.assetId;
        if (!groups.has(id)) {
          groups.set(id, {
            id,
            kind: img.dataset.assetKind,
            kinds: new Set(),
            sources: new Set(),
            backgrounds: new Set(),
            count: 0,
            missingAlt: 0,
          });
        }
        const group = groups.get(id);
        group.kinds.add(img.dataset.assetKind);
        group.sources.add(img.getAttribute('src'));
        group.backgrounds.add(img.dataset.background);
        group.count += 1;
        if (!img.alt.trim()) group.missingAlt += 1;
      }
      const unique = (kind) => new Set(imgs.filter((img) => img.dataset.assetKind === kind).map((img) => img.dataset.assetId)).size;
      return {
        renderedImages: imgs.length,
        uniqueAssets: new Set(imgs.map((img) => img.dataset.assetId)).size,
        productionAssets: unique('production'),
        prototypeAssets: unique('prototype'),
        backgroundVariants: new Set(imgs.map((img) => img.dataset.background)).size,
        externalSources: imgs.filter((img) => new URL(img.currentSrc || img.src, location.href).origin !== location.origin).map((img) => img.src),
        bodyWidth: document.body.scrollWidth,
        viewportWidth: window.innerWidth,
        broken: imgs.filter((img) => !img.naturalWidth).map((img) => img.dataset.assetId),
        assetGroups: [...groups.values()].map((group) => ({
          id: group.id,
          kind: group.kind,
          kinds: [...group.kinds].sort(),
          sources: [...group.sources].sort(),
          backgrounds: [...group.backgrounds].sort(),
          count: group.count,
          missingAlt: group.missingAlt,
        })),
      };
    });
    if (compareResult.renderedImages !== 90 || compareResult.uniqueAssets !== 30 ||
        compareResult.productionAssets !== 10 || compareResult.prototypeAssets !== 20 ||
        compareResult.backgroundVariants !== 3 || compareResult.broken.length || compareResult.externalSources.length) {
      throw new Error('Niekompletny lub zewnętrzny zasób w podglądzie porównawczym na ' + device.name + ': ' + JSON.stringify(compareResult));
    }

    const expectedAssetMappings = [
      ...fs.readdirSync('assets/food-svg').filter((file) => /\.svg$/i.test(file)).map((file) => ({
        id: 'production:' + file.replace(/\.svg$/i, ''),
        kind: 'production',
        src: '../assets/food-svg/' + file,
      })),
      ...fs.readdirSync('design/svg-hybrid').filter((file) => /\.svg$/i.test(file)).map((file) => ({
        id: 'prototype:' + file.replace(/\.svg$/i, ''),
        kind: 'prototype',
        src: 'svg-hybrid/' + file,
      })),
    ].sort((a, b) => a.id.localeCompare(b.id));
    const actualAssetMappings = compareResult.assetGroups.map((asset) => ({
      id: asset.id,
      kind: asset.kind,
      src: asset.sources.length === 1 ? asset.sources[0] : '[multiple sources]',
    })).sort((a, b) => a.id.localeCompare(b.id));
    const invalidAssetGroups = compareResult.assetGroups.filter((asset) =>
      asset.kinds.length !== 1 ||
      asset.sources.length !== 1 ||
      asset.count !== 3 ||
      asset.backgrounds.join('|') !== 'checker|dark|light' ||
      asset.missingAlt > 0
    );
    if (invalidAssetGroups.length) {
      throw new Error('Niespójne tła, źródła lub alt SVG w podglądzie na ' + device.name + ': ' + JSON.stringify(invalidAssetGroups));
    }
    if (JSON.stringify(actualAssetMappings) !== JSON.stringify(expectedAssetMappings)) {
      throw new Error('Identyfikatory SVG nie odpowiadają plikom w repozytorium na ' + device.name +
        ': ' + JSON.stringify({ expectedAssetMappings, actualAssetMappings }));
    }
    if (compareResult.bodyWidth > compareResult.viewportWidth + 1) throw new Error('Poziomy overflow podglądu porównawczego na ' + device.name + ': ' + JSON.stringify(compareResult));
    await page.screenshot({ path: 'qa-shots/svg-production-compare-' + device.name + '.png', fullPage: true });
    console.log('PASS SVG production/prototype comparison ' + device.name + ': ' + JSON.stringify(compareResult));
    await page.close();
  }
  if (errors.length) throw new Error(errors.join('\n'));
} finally {
  await browser.close();
}
