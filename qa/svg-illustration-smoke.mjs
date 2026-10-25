import fs from 'node:fs';
import assert from 'node:assert/strict';

const root = 'design/svg-hybrid';
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
  'bruschetta.svg', 'carbonara.svg', 'gnocchi-pomodoro.svg', 'lasagna.svg',
  'panna-cotta.svg', 'pizza-margherita.svg', 'ravioli-ricotta-spinaci.svg',
  'risotto-funghi.svg', 'tagliatelle-ragu.svg', 'tiramisu.svg',
];
const serviceWorkerSource = fs.readFileSync('sw.js', 'utf8');
let productionTotalBytes = 0;
for (const file of productionAssets) {
  const path = productionRoot + '/' + file;
  assert.ok(fs.existsSync(path), 'Brak produkcyjnej ilustracji SVG: ' + path);
  const source = fs.readFileSync(path, 'utf8');
  const size = fs.statSync(path).size;
  productionTotalBytes += size;
  assert.ok(size < 1_500_000, file + ': SVG powinien mieć mniej niż 1,5 MB (ma ' + size + ' B)');
  assert.match(source, /^<svg\b/, file + ': brak korzenia SVG');
  assert.match(source, /viewBox="0 0 1024 1024"/, file + ': brak viewBox');
  assert.match(source, /role="img"/, file + ': brak semantycznej roli obrazu');
  assert.match(source, /aria-labelledby="svg-title svg-desc"/, file + ': brak powiązania opisu dostępności');
  assert.match(source, /<title id="svg-title">[^<]+<\/title>/, file + ': brak tytułu dostępności');
  assert.match(source, /<desc id="svg-desc">[^<]+<\/desc>/, file + ': brak opisu dostępności');
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
  assert.ok((source.match(/<path\b/g) || []).length > 100, file + ': nieoczekiwanie mało ścieżek ilustracji');
  assert.ok(serviceWorkerSource.includes("'" + productionRoot + "/" + file + "'"), file + ': brak w cache offline Service Workera');
  console.log('PASS production SVG ' + file + ': ' + size + ' B, dostępność, referencje i cache offline');
}
assert.ok(productionTotalBytes < 5_800_000, 'Łączny rozmiar produkcyjnych SVG przekracza limit: ' + productionTotalBytes + ' B');
console.log('PASS: ' + productionAssets.length + ' produkcyjnych SVG, łączny rozmiar ' + productionTotalBytes + ' B');
