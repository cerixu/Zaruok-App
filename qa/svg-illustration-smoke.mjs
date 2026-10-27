import fs from 'node:fs';
import assert from 'node:assert/strict';

const root = 'design/svg-hybrid';

function hasOpaqueFullCanvasPath(source, size) {
  const fullCanvasPath = new RegExp(
    '^M\\s*0\\s+0\\s*(?:H\\s*' + size + '\\s*V\\s*' + size + '\\s*H\\s*0|L\\s*' + size + '\\s+0\\s*L\\s*' + size + '\\s+' + size + '\\s*L\\s*0\\s+' + size + ')\\s*Z$',
    'i'
  );
  return [...source.matchAll(/<path\b[^>]*>/g)].some(([tag]) => {
    const d = (tag.match(/\bd="([^"]*)"/) || [])[1];
    if (!d || !fullCanvasPath.test(d.replace(/,/g, ' ').replace(/\s+/g, ' ').trim())) return false;
    const fill = ((tag.match(/\bfill="([^"]*)"/i) || [])[1] || '').trim().toLowerCase();
    const style = ((tag.match(/\bstyle="([^"]*)"/i) || [])[1] || '').toLowerCase();
    const opacity = Number((tag.match(/\bopacity="([^"]*)"/i) || [])[1] ?? 1);
    const fillOpacity = Number((tag.match(/\bfill-opacity="([^"]*)"/i) || [])[1] ?? 1);
    return fill !== 'none' && !/\bfill\s*:\s*none\b/.test(style) &&
      opacity > 0 && fillOpacity > 0 && !/\bfill-opacity\s*:\s*0(?:\.0+)?\b/.test(style) &&
      !/\bopacity\s*:\s*0(?:\.0+)?\b/.test(style);
  });
}

assert.equal(
  hasOpaqueFullCanvasPath('<svg><path d="M0 0H240V240H0Z" fill="#fff"/></svg>', 240),
  true,
  'Kontrola musi wykrywać pełnoekranowe tło narysowane ścieżką'
);
assert.equal(
  hasOpaqueFullCanvasPath('<svg><path d="M0 0H240V240H0Z" fill="none"/></svg>', 240),
  false,
  'Przezroczysta ścieżka pełnego obszaru nie może być uznana za tło'
);

const fixtures = [
  { file: 'carbonara.svg', id: 'carbonara', tokens: [/guanciale/i, /pecorino/i, /bazyli/i] },
  { file: 'margherita.svg', id: 'margherita', tokens: [/mozzarell/i, /bazyli/i, /pomidor/i] },
  { file: 'tomato-soup.svg', id: 'tomato-soup', tokens: [/krem pomidorowy/i, /śmietanki/i, /bazyli/i] },
  { file: 'burger.svg', id: 'burger', tokens: [/burger klasyczny/i, /sezamow/i, /kotlet/i] },
  { file: 'greek-salad.svg', id: 'greek-salad', tokens: [/sałatka grecka/i, /oliwk/i, /fet/i] },
  { file: 'mojito.svg', id: 'mojito', tokens: [/mojito/i, /limonk/i, /mięt/i, /słomk/i] },
  { file: 'tiramisu.svg', id: 'tiramisu', tokens: [/tiramisù/i, /mascarpone/i, /kakao/i] },
  { file: 'panna-cotta.svg', id: 'panna-cotta', tokens: [/panna cotta/i, /wanili/i, /malin/i] },
  { file: 'lasagna.svg', id: 'lasagna', tokens: [/lasagne/i, /bolognese/i, /mozzarell/i] },
  { file: 'ravioli.svg', id: 'ravioli', tokens: [/ravioli/i, /ricotta/i, /szpinak/i] },
  { file: 'risotto-funghi.svg', id: 'risotto-funghi', tokens: [/risotto/i, /grzyb/i, /parmezan/i] },
  { file: 'gnocchi.svg', id: 'gnocchi', tokens: [/gnocchi/i, /pomidor/i, /bazyli/i] },
  { file: 'sushi-maki.svg', id: 'sushi-maki', tokens: [/sushi maki/i, /łosos/i, /ogórk/i, /nori/i] },
  { file: 'salmon-lemon-butter.svg', id: 'salmon-lemon-butter', tokens: [/łosoś/i, /cytryn/i, /masł/i, /koperk/i] },
  { file: 'steak-herb-butter.svg', id: 'steak-herb-butter', tokens: [/stek/i, /wołow/i, /masł/i, /rozmaryn/i] },
  { file: 'pierogi-ruskie.svg', id: 'pierogi-ruskie', tokens: [/pierogi ruskie/i, /ziemniaczan/i, /twarogow/i, /cebul/i] },
  { file: 'caesar-salad.svg', id: 'caesar-salad', tokens: [/sałatka cezar/i, /sałatą rzymską/i, /grzank/i, /parmezan/i] },
  { file: 'mushroom-soup.svg', id: 'mushroom-soup', tokens: [/krem z grzybów/i, /śmietank/i, /grzyb/i, /tymian/i] },
  { file: 'bruschetta.svg', id: 'bruschetta', tokens: [/bruschetta/i, /pomidor/i, /bazyli/i, /grzank/i] },
  { file: 'tagliatelle-ragu.svg', id: 'tagliatelle-ragu', tokens: [/tagliatelle/i, /ragù/i, /parmezan/i, /bazyli/i] },
];

for (const fixture of fixtures) {
  const path = `${root}/${fixture.file}`;
  assert.ok(fs.existsSync(path), `Brak ilustracji: ${path}`);
  const source = fs.readFileSync(path, 'utf8');
  assert.ok(source.trim().startsWith('<svg '), `${fixture.file}: brak korzenia SVG`);
  assert.ok(source.trim().endsWith('</svg>'), `${fixture.file}: niezamknięty element SVG`);
  assert.match(source, /xmlns="http:\/\/www\.w3\.org\/2000\/svg"/, `${fixture.file}: niepoprawna przestrzeń nazw SVG`);
  assert.match(source, /viewBox="0 0 240 240"/, `${fixture.file}: oczekiwany kwadratowy viewBox 240×240`);
  assert.match(source, /role="img"/, `${fixture.file}: brak semantycznej roli obrazu`);
  assert.match(source, /aria-labelledby="title desc"/, `${fixture.file}: brak dostępnego opisu`);
  assert.match(source, /<title id="title">[\s\S]*?<\/title>/, `${fixture.file}: brak tytułu`);
  assert.match(source, /<desc id="desc">[\s\S]*?<\/desc>/, `${fixture.file}: brak opisu`);
  assert.ok(source.length < 12000, `${fixture.file}: SVG większy niż 12 KB — sprawdź niepotrzebny kod`);
  assert.ok(!/<rect\b[^>]*(?:width="(?:100%|240|\*)"[^>]*height="(?:100%|240|\*)")/i.test(source),
    `${fixture.file}: wykryto potencjalne nieprzezroczyste tło całego obszaru`);
  assert.equal(hasOpaqueFullCanvasPath(source, 240), false,
    `${fixture.file}: pełnoekranowa ścieżka może tworzyć nieprzezroczyste tło`);
  assert.ok(!/(?:href|xlink:href)="https?:\/\//i.test(source), `${fixture.file}: zależność od zewnętrznego zasobu`);
  for (const token of fixture.tokens) {
    assert.match(source, token, `${fixture.file}: brak wyróżnika dania (${token})`);
  }

  const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${fixture.file}: zduplikowane identyfikatory SVG`);
  const references = [...source.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
  for (const reference of references) {
    assert.ok(ids.includes(reference), `${fixture.file}: odwołanie do nieistniejącego id #${reference}`);
  }
  console.log(`PASS ${fixture.id}: poprawne SVG, opis dostępności, przezroczyste tło i wyróżniki dania`);
}

console.log(`PASS: ${fixtures.length} wzorcowych ilustracji SVG przeszło audyt`);


const productionRoot = 'assets/food-svg';
const productionAssets = [
  'bruschetta.svg', 'carbonara.svg', 'cacio-e-pepe.svg', 'gnocchi-pomodoro.svg', 'lasagna.svg',
  'panna-cotta.svg', 'pizza-margherita.svg', 'ravioli-ricotta-spinaci.svg',
  'risotto-funghi.svg', 'tagliatelle-ragu.svg', 'tiramisu.svg',
  'tomato-soup.svg', 'burger.svg', 'greek-salad.svg', 'mojito.svg', 'sushi-maki.svg',
  'salmon-lemon-butter.svg', 'steak-herb-butter.svg', 'pierogi-ruskie.svg', 'caesar-salad.svg', 'mushroom-soup.svg',
  'gnocchi-sage.svg', 'spaghetti-puttanesca.svg', 'spaghetti-amatriciana.svg', 'ragu-bolognese.svg',
  'penne-arrabbiata.svg', 'fettuccine-alfredo.svg', 'minestrone.svg', 'panzanella.svg', 'parmigiana-melanzane.svg', 'pizza-pepperoni.svg',
];
const serviceWorkerSource = fs.readFileSync('sw.js', 'utf8');
const photoMappingSource = fs.readFileSync('food-photos.js', 'utf8');
assert.ok(photoMappingSource.includes("  'tagliatelle-ragu': 'tagliatelle-ragu.svg',"), 'Tagliatelle al ragù musi zachować dedykowane mapowanie produkcyjnego SVG');
assert.ok(photoMappingSource.includes("  carbonara: 'carbonara.svg',"), 'Carbonara musi zachować dedykowane mapowanie produkcyjnego SVG');
assert.ok(photoMappingSource.includes("  'cacio-e-pepe': 'cacio-e-pepe.svg',"), 'Cacio e pepe musi zachować dedykowane mapowanie produkcyjnego SVG');
assert.ok(photoMappingSource.includes("  'gnocchi-pomodoro': 'gnocchi-pomodoro.svg',"), 'Gnocchi al pomodoro musi zachować dedykowane mapowanie produkcyjnego SVG');
assert.ok(photoMappingSource.includes("  lasagna: 'lasagna.svg',"), 'Lasagne alla bolognese musi zachować dedykowane mapowanie produkcyjnego SVG');
assert.ok(photoMappingSource.includes("  'pizza-margherita': 'pizza-margherita.svg',"), 'Pizza Margherita musi zachować dedykowane mapowanie produkcyjnego SVG');
assert.ok(photoMappingSource.includes("  'panna-cotta': 'panna-cotta.svg',"), 'Panna cotta musi zachować dedykowane mapowanie produkcyjnego SVG');
assert.ok(photoMappingSource.includes("  'ravioli-ricotta-spinaci': 'ravioli-ricotta-spinaci.svg',"), 'Ravioli ricotta e spinaci musi zachować dedykowane mapowanie produkcyjnego SVG');
assert.ok(photoMappingSource.includes("  'risotto-funghi': 'risotto-funghi.svg',"), 'Risotto ai funghi musi zachować dedykowane mapowanie produkcyjnego SVG');
assert.ok(photoMappingSource.includes("  'tomato-soup': 'tomato-soup.svg',"), 'Krem pomidorowy musi zachować dedykowane mapowanie produkcyjnego SVG');
assert.ok(photoMappingSource.includes("  burger: 'burger.svg',"), 'Burger klasyczny musi zachować dedykowane mapowanie produkcyjnego SVG');
assert.ok(photoMappingSource.includes("  'greek-salad': 'greek-salad.svg',"), 'Sałatka grecka musi zachować dedykowane mapowanie produkcyjnego SVG');
assert.ok(photoMappingSource.includes("  mojito: 'mojito.svg',"), 'Mojito musi zachować dedykowane mapowanie produkcyjnego SVG');
assert.ok(photoMappingSource.includes("  'sushi-maki': 'sushi-maki.svg',"), 'Sushi maki musi zachować dedykowane mapowanie produkcyjnego SVG');
assert.ok(photoMappingSource.includes("  'salmon-lemon-butter': 'salmon-lemon-butter.svg',"), 'Łosoś z cytryną i masłem musi zachować dedykowane mapowanie produkcyjnego SVG');
assert.ok(photoMappingSource.includes("  'steak-herb-butter': 'steak-herb-butter.svg',"), 'Stek z masłem ziołowym musi zachować dedykowane mapowanie produkcyjnego SVG');
assert.ok(photoMappingSource.includes("  'pierogi-ruskie': 'pierogi-ruskie.svg',"), 'Pierogi ruskie muszą zachować dedykowane mapowanie produkcyjnego SVG');
assert.ok(photoMappingSource.includes("  'caesar-salad': 'caesar-salad.svg',"), 'Sałatka cezar musi zachować dedykowane mapowanie produkcyjnego SVG');
assert.ok(photoMappingSource.includes("  'mushroom-soup': 'mushroom-soup.svg',"), 'Krem z grzybów musi zachować dedykowane mapowanie produkcyjnego SVG');
assert.ok(photoMappingSource.includes("  'gnocchi-sage': 'gnocchi-sage.svg',"), 'Gnocchi z masłem szałwiowym muszą mieć dedykowane SVG');
assert.ok(photoMappingSource.includes("  'spaghetti-puttanesca': 'spaghetti-puttanesca.svg',"), 'Spaghetti alla puttanesca musi mieć dedykowane SVG');
assert.ok(photoMappingSource.includes("  'spaghetti-amatriciana': 'spaghetti-amatriciana.svg',"), 'Spaghetti all’amatriciana musi mieć dedykowane SVG');
assert.ok(photoMappingSource.includes("  ['spaghetti-amatriciana', /"), 'Spaghetti all’amatriciana musi mieć precyzyjną regułę nazwy receptury');
assert.ok(photoMappingSource.includes("  'ragu-bolognese': 'ragu-bolognese.svg',"), 'Ragù alla bolognese musi mieć dedykowane SVG');
assert.ok(photoMappingSource.includes("  'penne-arrabbiata': 'penne-arrabbiata.svg',"), 'Penne all’arrabbiata musi mieć dedykowane SVG');
assert.ok(photoMappingSource.includes("  'fettuccine-alfredo': 'fettuccine-alfredo.svg',"), 'Fettuccine Alfredo musi mieć dedykowane SVG');
assert.ok(photoMappingSource.includes("  minestrone: 'minestrone.svg',"), 'Minestrone musi mieć dedykowane SVG');
assert.ok(photoMappingSource.includes("  panzanella: 'panzanella.svg',"), 'Panzanella musi mieć dedykowane SVG');
assert.ok(photoMappingSource.includes("  'parmigiana-melanzane': 'parmigiana-melanzane.svg',"), 'Parmigiana di melanzane musi mieć dedykowane SVG');
assert.ok(photoMappingSource.includes("  'pizza-pepperoni': 'pizza-pepperoni.svg',"), 'Pizza pepperoni musi mieć dedykowane SVG');
let productionTotalBytes = 0;
for (const file of productionAssets) {
  const path = productionRoot + '/' + file;
  assert.ok(fs.existsSync(path), 'Brak produkcyjnej ilustracji SVG: ' + path);
  const source = fs.readFileSync(path, 'utf8');
  const size = fs.statSync(path).size;
  productionTotalBytes += size;
  assert.ok(size < 1_500_000, file + ': SVG powinien mieć mniej niż 1,5 MB (ma ' + size + ' B)');
  if (file === 'carbonara.svg') assert.ok(size < 25_000, 'Carbonara powinna być lekkim SVG poniżej 25 KB (ma ' + size + ' B)');
  if (file === 'gnocchi-pomodoro.svg') assert.ok(size < 10_000, 'Gnocchi al pomodoro powinno być lekkim SVG poniżej 10 KB (ma ' + size + ' B)');
  if (file === 'lasagna.svg') assert.ok(size < 5_000, 'Lasagne powinna pozostać lekkim SVG poniżej 5 KB (ma ' + size + ' B)');
  if (file === 'pizza-margherita.svg') assert.ok(size < 5_000, 'Pizza Margherita powinna pozostać lekkim SVG poniżej 5 KB (ma ' + size + ' B)');
  if (file === 'panna-cotta.svg') assert.ok(size < 5_000, 'Panna cotta powinna pozostać lekkim SVG poniżej 5 KB (ma ' + size + ' B)');
  if (file === 'ravioli-ricotta-spinaci.svg') assert.ok(size < 5_000, 'Ravioli ricotta e spinaci powinny pozostać lekkim SVG poniżej 5 KB (ma ' + size + ' B)');
  assert.match(source, /^<svg\b/, file + ': brak korzenia SVG');
  const viewBox = source.match(/viewBox="(-?\d+) (-?\d+) ([1-9]\d*) ([1-9]\d*)"/);
  assert.ok(viewBox, file + ': brak poprawnego viewBox');
  if (file === 'carbonara.svg') {
    assert.equal(viewBox[1], '-45', 'Carbonara musi zachować przezroczysty margines po lewej stronie');
    assert.equal(viewBox[2], '-35', 'Carbonara musi zachować przezroczysty margines u góry');
    assert.equal(viewBox[3], '1517', 'Carbonara musi zachować szerokość ilustracji z marginesem');
    assert.equal(viewBox[4], '1172', 'Carbonara musi zachować wysokość ilustracji z marginesem');
  } else {
    assert.equal(viewBox[1], '0', file + ': początek viewBox X musi wynosić 0');
    assert.equal(viewBox[2], '0', file + ': początek viewBox Y musi wynosić 0');
    assert.equal(viewBox[3], viewBox[4], file + ': viewBox musi być kwadratowy');
  }
  if (file === 'spaghetti-amatriciana.svg') {
    assert.equal(hasOpaqueFullCanvasPath(source, 240), false, 'Spaghetti all’amatriciana nie może mieć nieprzezroczystej ścieżki tła całego obszaru');
    assert.doesNotMatch(source, /<rect\b[^>]*(?:width="(?:100%|240|1024)"[^>]*height="(?:100%|240|1024)"|height="(?:100%|240|1024)"[^>]*width="(?:100%|240|1024)")/i, 'Spaghetti all’amatriciana nie może mieć pełnoekranowego prostokąta tła');
    assert.match(source, /przezroczystym tle/i, 'Spaghetti all’amatriciana musi dokumentować przezroczyste tło');
  }
  if (file === 'gnocchi-pomodoro.svg') {
    assert.equal(hasOpaqueFullCanvasPath(source, 240), false, 'Gnocchi al pomodoro nie może mieć nieprzezroczystej ścieżki tła całego obszaru');
    assert.doesNotMatch(source, /<rect\b[^>]*(?:width="(?:100%|240|1024)"[^>]*height="(?:100%|240|1024)"|height="(?:100%|240|1024)"[^>]*width="(?:100%|240|1024)")/i, 'Gnocchi al pomodoro nie może mieć pełnoekranowego prostokąta tła');
    assert.match(source, /Gnocchi al pomodoro/, 'Gnocchi al pomodoro musi mieć właściwą semantykę dania');
    assert.match(source, /przezroczystym tle/i, 'Gnocchi al pomodoro musi dokumentować przezroczyste tło');
  }
  assert.match(source, /role="img"/, file + ': brak semantycznej roli obrazu');
  const ariaLabel = source.match(/aria-label="([^"]+)"/);
  const labelledBy = source.match(/aria-labelledby="([^"]+)"/);
  if (ariaLabel) {
    assert.ok(ariaLabel[1].trim(), file + ': pusty aria-label');
  } else {
    assert.ok(labelledBy, file + ': brak aria-label lub aria-labelledby');
    const titleTag = source.match(/<title id="([^"]+)">[^<]+<\/title>/);
    const descTag = source.match(/<desc id="([^"]+)">[^<]+<\/desc>/);
    assert.ok(titleTag, file + ': brak tytułu dostępności');
    assert.ok(descTag, file + ': brak opisu dostępności');
    const labelledIds = labelledBy[1].trim().split(/\s+/);
    assert.ok(labelledIds.includes(titleTag[1]) && labelledIds.includes(descTag[1]),
      file + ': aria-labelledby musi wskazywać identyfikatory title i desc');
  }
  assert.doesNotMatch(source, /<metadata\b|xmpmeta/i, file + ': pozostały metadane eksportu');
  assert.doesNotMatch(source, /<image\b|<script\b|<foreignObject\b/i, file + ': SVG nie jest samodzielną ilustracją wektorową');
  assert.doesNotMatch(source, /(?:href|xlink:href)="https?:\/\//i, file + ': zewnętrzna zależność');
  assert.doesNotMatch(source, /url\(\s*["']?https?:/i, file + ': zewnętrzna zależność w definicji stylu');
  assert.doesNotMatch(source, /rgb\(/i, file + ': nieoptymalny zapis kolorów RGB');
  const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, file + ': zduplikowane identyfikatory SVG');
  const references = [...source.matchAll(/url\(#([^)]+)\)|(?:xlink:)?href="#([^"]+)"/g)].map((match) => match[1] || match[2]);
  for (const reference of references) {
    assert.ok(ids.includes(reference), file + ': odwołanie do nieistniejącego id #' + reference);
  }
  const shapeCount = (source.match(/<(?:path|circle|ellipse|rect|polygon|polyline|line|use)\b/g) || []).length;
  assert.ok(shapeCount >= 10, file + ': ilustracja powinna zawierać co najmniej 10 elementów graficznych (ma ' + shapeCount + ')');
  assert.ok(serviceWorkerSource.includes("'" + productionRoot + "/" + file + "'"), file + ': brak w cache offline Service Workera');
  console.log('PASS production SVG ' + file + ': ' + size + ' B, dostępność, referencje i cache offline');
}
assert.ok(productionTotalBytes < 5_800_000, 'Łączny rozmiar produkcyjnych SVG przekracza limit: ' + productionTotalBytes + ' B');
console.log('PASS: ' + productionAssets.length + ' produkcyjnych SVG, łączny rozmiar ' + productionTotalBytes + ' B');
