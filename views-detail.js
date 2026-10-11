/* ==========================================================================
   views-detail.js — podgląd receptury: GOTUJĘ, PRZELICZ, procenty piekarskie,
   food cost, historia zmian, własne uwagi (autozapis).
   ========================================================================== */
import {
  h, icon, screen, button, iconBtn, toast, openSheet, confirmDialog, field, numInput, selectEl, segmented, textArea, emptyState,
} from './ui.js';
import { navigate, goBack } from './router.js';
import {
  subscribe, getRecipe, markOpened, patchRecipe, saveRecipe, deleteRecipe, duplicateRecipe, getHistory, restoreVersion,
  cloneRecipe, allIngredients, getSetting, setSetting, catName,
} from './recipes.js';
import {
  scaleRecipe, factorFromServings, factorFromYield, factorFromIngredient, effectiveYield, bakersTable, bakersRecalc, recipeCost,
  priceForFoodCost,
} from './calculator.js';
import { fmtAmount, fmtNum, fmtPct, fmtMoney, fmtMinutes, fmtDateTime, fmtDate, copyText, debounce, uid } from './util.js';
import { heartBtn, tradMark, qtyParts, recipeToText, originOf, sideInfo } from './components.js';
import { ingEmoji } from './kitchen.js';
import { estimateKcal } from './nutrition.js';
import { openAddToShopping } from './shopping.js';
import { hostOf } from './importer.js';
import { recipeArtUrl } from './art.js';

const KIND_LABEL = { flour: 'mąka', water: 'woda', salt: 'sól', yeast: 'drożdże', fat: 'tłuszcz', other: '' };

function ingredientKind(name) {
  const n = String(name || '').toLocaleLowerCase('pl');
  if (/(wołow|wieprz|kurcz|indyk|boczek|szynk|guanciale|mięso|salami|kiełbas|jagnię|baranin|prosciutto)/i.test(n)) return 'meat';
  if (/(ryb|łosoś|tuńczyk|dorsz|krewet|małż|ośmiornic|kalm|anchois|sardyn|śledź|makrel|pstrąg)/i.test(n)) return 'fish';
  if (/(tahini|sos|passata|koncentrat|ketchup|musztard|majonez|bulion|ocet|pesto)/i.test(n)) return 'sauce';
  if (/(mąk|ryż|makaron|kasz|płatki|chleb|bułk|ciasto|drożdż|zakwas|semolina|spaghetti|fusilli|penne|farfalle|panko|bułka tarta)/i.test(n)) return 'grain';
  if (/(ser|mleko|śmietan|masło|jogurt|kefir|ricotta|mozzarella|pecorino|parmezan|jajk|żółtk|twaróg|śmietank)/i.test(n)) return 'dairy';
  if (/(oliw|olej|smalec|tłuszcz)/i.test(n)) return 'oil';
  if (/(sól|pieprz|papryk[aię]|cynamon|kurkum|kumin|oregano|bazylia|tymianek|rozmaryn|przypraw|gałka|kardamon|goździk|szafran|chili|chilli|kolendra|kminek)/i.test(n)) return 'spice';
  if (/(cytryn|pomarańcz|limonk|jabłk|gruszk|banan|mango|ananas|winogron|owoc|truskawk|malin|borówk|żurawin|brzoskwini)/i.test(n)) return 'fruit';
  if (/(warzyw|bakłażan|cebula|czosnek|marchew|seler|pietruszk|ziemniak|papryka|cukinia|ogórek|sałat|rukol|szpinak|brokuł|kalafior|kapust|fasol|groch|ciecierzyc|soczewic|grzyb|pieczark|kurk|oliwk|szparag|burak|kukurydz|dynia|pomidor|pomidory|rzodkiew|por)/i.test(n)) return 'vegetable';
  return 'other';
}

export function detailView({ id }) {
  const base0 = getRecipe(id);
  if (!base0) {
    const s = screen({ title: 'Receptura', left: iconBtn('left', 'Wstecz', () => goBack('/recipes')) },
      emptyState('🤷', 'Nie ma takiej receptury', 'Mogła zostać usunięta.', button('Wszystkie receptury', { kind: 'primary', onClick: () => navigate('/recipes', { replace: true }) })));
    return { el: s.el };
  }
  markOpened(id);

  let scaled = null;          // przeliczona kopia (niezapisana) albo null
  let scaleLabel = '';
  let skipPaint = false;
  const base = () => getRecipe(id);
  const cur = () => scaled || base();

  const heartSlot = h('span', { class: 'heart-slot' });
  const s = screen({
    title: base0.name || 'Receptura', left: iconBtn('left', 'Wstecz', () => goBack('/recipes')),
    right: h('div', { class: 'row' }, heartSlot, iconBtn('more', 'Więcej', () => openMore())), cls: 'detail', large: 'hero',
  });

  /* ----- Przeliczanie ----- */

  function applyScaled(r, label) {
    const b = base();
    const same = JSON.stringify(allIngredients(r).map((i) => i.amount)) === JSON.stringify(allIngredients(b).map((i) => i.amount)) && r.servings === b.servings;
    if (same) { scaled = null; scaleLabel = ''; } else { scaled = r; scaleLabel = label; }
    paint();
    if (scaled) s.scroll.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function applyFactor(k, label) {
    if (!(k > 0) || !Number.isFinite(k)) { toast('Podaj poprawną wartość', { type: 'error' }); return false; }
    const r = scaleRecipe(base(), k);
    applyScaled(r, label || `×${fmtNum(k, 3)}`);
  }

  function openScale() {
    const r = base();
    let mode = 'servings';
    const y = effectiveYield(r);
    let servings = cur().servings || r.servings, yAmt = y ? y.amount * (cur().servings && r.servings ? cur().servings / r.servings : 1) : null, yUnit = (y && y.unit) || 'g';
    const ings = allIngredients(r).filter((i) => i.name && i.amount > 0 && i.unit !== '%');
    let ingId = ings[0] ? ings[0].id : '', ingAmt = null, ingUnit = ings[0] ? ings[0].unit : 'g';
    const out = h('div', { class: 'preview-line' });
    const holder = h('div', { class: 'stack' });

    const factor = () => {
      if (mode === 'servings') return factorFromServings(r, servings);
      if (mode === 'yield') return factorFromYield(r, yAmt, yUnit);
      const ing = ings.find((i) => i.id === ingId);
      return ing ? factorFromIngredient(ing, ingAmt, ingUnit) : null;
    };
    const showOut = () => {
      const k = factor();
      out.replaceChildren(k ? h('span', null, 'Współczynnik ', h('strong', { class: 'num' }, '×' + fmtNum(k, 3)),
        r.servings ? ` · ${fmtNum(r.servings * k, 1)} porcji` : '') : h('span', { class: 'muted' }, 'Wpisz wartość docelową'));
    };
    const build = () => {
      const kids = [];
      if (mode === 'servings') {
        kids.push(field('Liczba porcji', numInput({ value: servings, label: 'Liczba porcji', onInput: (v) => { servings = v; showOut(); } }), `Receptura jest na ${r.servings || '?'} porcji`));
      } else if (mode === 'yield') {
        kids.push(h('div', { class: 'row gap' },
          h('div', { class: 'grow' }, field('Wydajność', numInput({ value: yAmt, label: 'Wydajność', onInput: (v) => { yAmt = v; showOut(); } }))),
          h('div', { class: 'grow' }, field('Jednostka', selectEl(['g', 'kg', 'ml', 'l', 'szt.', 'porcja'], yUnit, (v) => { yUnit = v; showOut(); })))));
        kids.push(h('p', { class: 'muted small' }, y ? `Obecnie: ${fmtAmount(y.amount)} ${y.unit}${y.computed ? ' (suma składników)' : ''}` : 'Receptura nie ma wydajności ani ilości w g/ml.'));
      } else {
        if (!ings.length) kids.push(h('p', { class: 'muted' }, 'Brak składników z ilością.'));
        else {
          kids.push(field('Składnik', selectEl(ings.map((i) => [i.id, `${i.name} (${fmtAmount(i.amount)} ${i.unit})`]), ingId, (v) => { ingId = v; const i = ings.find((x) => x.id === v); ingUnit = i.unit; build(); })));
          kids.push(h('div', { class: 'row gap' },
            h('div', { class: 'grow' }, field('Mam / chcę użyć', numInput({ value: ingAmt, label: 'Docelowa ilość', onInput: (v) => { ingAmt = v; showOut(); } }))),
            h('div', { class: 'grow' }, field('Jednostka', selectEl(['g', 'kg', 'ml', 'l', 'szt.', 'łyżka', 'łyżeczka'], ingUnit, (v) => { ingUnit = v; showOut(); })))));
        }
      }
      holder.replaceChildren(...kids);
      showOut();
    };
    const chips = h('div', { class: 'chips wrap' }, [0.5, 2, 3, 5, 10].map((k) => h('button', { type: 'button', class: 'chip', onClick: () => { sh.close(); applyFactor(k, `×${k}`); } }, '×' + String(k).replace('.', ','))));
    const modes = [['servings', 'Porcje'], ['yield', 'Wydajność'], ['ingredient', 'Składnik']];
    const sh = openSheet({
      title: 'Przelicz', variant: 'sheet',
      body: h('div', { class: 'stack' },
        h('div', null, h('div', { class: 'field-label' }, 'Szybko'), chips),
        segmented(modes, mode, (v) => { mode = v; build(); }, { label: 'Przelicz według' }),
        holder, out),
      actions: [
        { label: 'Anuluj', kind: 'ghost' },
        { label: 'Przelicz', kind: 'primary', icon: 'swap', onClick: () => {
          const k = factor();
          if (!k) { toast('Uzupełnij wartość docelową', { type: 'error' }); return false; }
          const lbl = mode === 'servings' ? `${fmtNum(servings, 1)} porcji` : mode === 'yield' ? `${fmtAmount(yAmt)} ${yUnit}` : `×${fmtNum(k, 3)}`;
          applyFactor(k, lbl);
        } },
      ],
    });
    build();
  }

  function openBakers() {
    const r = base();
    const t = bakersTable(r);
    if (!t.ok) return;
    let total = t.totalG, hyd = t.hydration, salt = t.salt, yeast = t.yeast, fat = t.fat;
    let balls = r.servings || 1, bw = total / (r.servings || 1);
    const prev = h('div', { class: 'bk-preview' });
    const hasFat = t.rows.some((x) => x.kind === 'fat');
    const show = () => {
      const res = bakersRecalc(r, { total, hydration: hyd, salt, yeast, fat: hasFat ? fat : undefined });
      const tt = bakersTable(res);
      prev.replaceChildren(h('div', { class: 'kv' }, tt.rows.map((x) =>
        h('div', { class: 'kv-row' }, h('span', null, x.name), h('span', { class: 'num' }, `${fmtAmount(x.grams)} g · ${fmtPct(x.pct)}`)))),
        h('div', { class: 'kv-total' }, 'Masa ciasta ', h('strong', { class: 'num' }, fmtAmount(tt.totalG) + ' g'), ' · mąka ', h('strong', { class: 'num' }, fmtAmount(tt.flourG) + ' g')));
      prev._res = res;
    };
    const totalIn = numInput({ value: total, label: 'Masa ciasta w gramach', dec: 1, onInput: (v) => { if (v > 0) { total = v; bw = total / balls; bwIn.value = fmtNum(bw, 1); } show(); } });
    const ballsIn = numInput({ value: balls, label: 'Liczba kulek', dec: 0, onInput: (v) => { if (v > 0) { balls = v; total = balls * bw; totalIn.value = fmtNum(total, 1); } show(); } });
    const bwIn = numInput({ value: bw, label: 'Waga kulki w gramach', dec: 1, onInput: (v) => { if (v > 0) { bw = v; total = balls * bw; totalIn.value = fmtNum(total, 1); } show(); } });
    const sh = openSheet({
      title: 'Procenty piekarskie', variant: 'sheet',
      body: h('div', { class: 'stack' },
        h('p', { class: 'muted small' }, 'Mąka = 100%. Zmień masę ciasta lub proporcje — pozostałe składniki przeliczą się same.'),
        field('Masa całego ciasta (g)', totalIn),
        h('div', { class: 'row gap' }, h('div', { class: 'grow' }, field('Liczba kulek', ballsIn)), h('div', { class: 'grow' }, field('Waga kulki (g)', bwIn))),
        h('div', { class: 'row gap' },
          h('div', { class: 'grow' }, field('Hydracja %', numInput({ value: hyd, label: 'Hydracja', dec: 1, onInput: (v) => { if (v >= 0) hyd = v; show(); } }))),
          h('div', { class: 'grow' }, field('Sól %', numInput({ value: salt, label: 'Sól', dec: 2, onInput: (v) => { if (v >= 0) salt = v; show(); } })))),
        h('div', { class: 'row gap' },
          h('div', { class: 'grow' }, field('Drożdże %', numInput({ value: yeast, label: 'Drożdże', dec: 2, onInput: (v) => { if (v >= 0) yeast = v; show(); } }))),
          hasFat ? h('div', { class: 'grow' }, field('Tłuszcz %', numInput({ value: fat, label: 'Tłuszcz', dec: 2, onInput: (v) => { if (v >= 0) fat = v; show(); } }))) : h('div', { class: 'grow' })),
        prev),
      actions: [
        { label: 'Anuluj', kind: 'ghost' },
        { label: 'Zastosuj', kind: 'primary', icon: 'check', onClick: () => applyScaled(prev._res, `ciasto ${fmtAmount(total)} g`) },
      ],
    });
    show();
  }

  /* ----- Zapis przeliczonej ----- */

  async function saveScaledHere() {
    const ok = await confirmDialog({ title: 'Zapisać w tej recepturze?', message: 'Ilości zostaną nadpisane. Poprzednią wersję znajdziesz w historii zmian.', confirmText: 'Zapisz' });
    if (!ok) return;
    const next = { ...scaled, id };
    await saveRecipe(next, { note: `Przeliczono (${scaleLabel})` });
    scaled = null; scaleLabel = '';
    toast('Zapisano przeliczoną recepturę');
    paint();
  }
  async function saveScaledNew() {
    const c = cloneRecipe(scaled);
    const now = Date.now();
    Object.assign(c, { id: uid('rcp_'), name: `${base().name} (${scaleLabel})`, favorite: false, favoritedAt: 0, createdAt: now, updatedAt: now, lastOpenedAt: 0, openCount: 0, photo: base().photo, thumb: base().thumb });
    c.sections.forEach((sec) => { sec.id = uid('sec_'); sec.ingredients.forEach((i) => { i.id = uid('ing_'); }); });
    c.steps.forEach((st) => { st.id = uid('stp_'); });
    const saved = await saveRecipe(c);
    toast('Zapisano jako nową recepturę', { action: { label: 'Otwórz', fn: () => navigate('/recipe/' + saved.id) } });
  }

  /* ----- Food cost ----- */

  function openPrices() {
    const r = cloneRecipe(base());
    const ings = allIngredients(r).filter((i) => i.name);
    const cur$ = getSetting('currency') || 'zł';
    const total = h('div', { class: 'preview-line' });
    const upd = () => {
      const c = recipeCost(r, 1);
      total.replaceChildren(h('span', null, 'Koszt razem ', h('strong', { class: 'num' }, fmtMoney(c.total, cur$)), c.perPortion != null ? ` · porcja ${fmtMoney(c.perPortion, cur$)}` : '', c.foodCostPct != null ? ` · food cost ${fmtNum(c.foodCostPct, 1)}%` : ''),
        c.missing ? h('div', { class: 'muted small' }, `Brak ceny lub zgodnej jednostki: ${c.missing}`) : null);
    };
    const rows = ings.map((i) => {
      const pkg = h('div', { class: 'row gap pkg' });
      const buildPkg = () => {
        pkg.replaceChildren();
        pkg.hidden = i.priceUnit !== 'opak.';
        if (i.priceUnit === 'opak.') {
          pkg.append(h('div', { class: 'grow' }, field('Waga / ilość w opakowaniu', numInput({ value: i.packageWeight, label: 'Waga opakowania', onInput: (v) => { i.packageWeight = v; upd(); } }))),
            h('div', { class: 'grow' }, field('Jednostka', selectEl(['g', 'ml', 'szt.'], i.packageUnit || 'g', (v) => { i.packageUnit = v; upd(); }))));
        }
      };
      buildPkg();
      return h('div', { class: 'price-row' },
        h('div', { class: 'price-name' }, i.name, h('small', { class: 'muted num' }, i.amount != null ? ` ${fmtAmount(i.amount)} ${i.unit}` : '')),
        h('div', { class: 'row gap' },
          h('div', { class: 'grow' }, numInput({ value: i.price, label: `Cena: ${i.name}`, placeholder: 'cena', dec: 2, onInput: (v) => { i.price = v; upd(); } })),
          h('div', { class: 'grow' }, selectEl([['kg', `${cur$}/kg`], ['l', `${cur$}/l`], ['g', `${cur$}/g`], ['ml', `${cur$}/ml`], ['szt.', `${cur$}/szt.`], ['opak.', `${cur$}/opak.`]], i.priceUnit || 'kg', (v) => { i.priceUnit = v; buildPkg(); upd(); }, { label: 'Jednostka ceny' }))),
        pkg);
    });
    const sale = numInput({ value: r.salePrice, label: 'Cena sprzedaży porcji', dec: 2, placeholder: 'np. 32', onInput: (v) => { r.salePrice = v; upd(); } });
    openSheet({
      title: 'Ceny składników', variant: 'sheet',
      body: h('div', { class: 'stack' },
        h('p', { class: 'muted small' }, 'Ceny zapisują się w recepturze i w katalogu składników (podpowiadają się w innych recepturach). Cena 0 jest dozwolona (np. woda).'),
        field(`Cena sprzedaży porcji (${cur$})`, sale), total, h('div', { class: 'stack' }, rows)),
      actions: [
        { label: 'Anuluj', kind: 'ghost' },
        { label: 'Zapisz ceny', kind: 'primary', onClick: async () => {
          await saveRecipe({ ...base(), sections: r.sections, salePrice: r.salePrice }, { note: 'Zaktualizowano ceny' });
          if (scaled) { scaled = null; scaleLabel = ''; }
          toast('Zapisano ceny'); paint();
        } },
      ],
    });
    upd();
  }

  function costCard() {
    const r = cur();
    const cur$ = getSetting('currency') || 'zł';
    const c = recipeCost(r, 1);
    const any = c.lines.some((l) => l.cost != null);
    const kv = (k, v, cls = '') => h('div', { class: 'stat ' + cls }, h('span', { class: 'stat-k' }, k), h('span', { class: 'stat-v num' }, v));
    const body = [];
    if (any) {
      body.push(h('div', { class: 'stats' },
        kv('Koszt receptury', fmtMoney(c.total, cur$)),
        kv('Koszt porcji', fmtMoney(c.perPortion, cur$)),
        kv('Cena sprzedaży', r.salePrice > 0 ? fmtMoney(r.salePrice, cur$) : '—'),
        kv('Food cost', c.foodCostPct != null ? fmtNum(c.foodCostPct, 1) + '%' : '—', c.foodCostPct > 35 ? 'warn' : '')));
      if (c.perPortion > 0) body.push(h('p', { class: 'muted small' }, `Dla food cost 30%: cena porcji ok. ${fmtMoney(priceForFoodCost(c.perPortion, 30), cur$)}`));
      if (c.missing) body.push(h('p', { class: 'muted small' }, `Składników bez ceny lub zgodnej jednostki: ${c.missing}`));
    } else body.push(h('p', { class: 'muted' }, 'Dodaj ceny składników, aby policzyć koszt receptury, porcji i food cost.'));
    body.push(button(any ? 'Edytuj ceny' : 'Dodaj ceny', { icon: 'coins', block: true, onClick: openPrices }));
    return h('section', { class: 'card' }, h('h2', { class: 'card-title' }, icon('coins', 20), 'Koszt'), ...body);
  }

  /* ----- Historia ----- */

  async function openHistory() {
    const list = await getHistory(id);
    const body = h('div', { class: 'stack' });
    if (!list.length) body.append(emptyState('🕓', 'Brak historii', 'Każda zapisana zmiana pojawi się tutaj, z możliwością przywrócenia.'));
    list.forEach((e) => {
      const detail = h('div', { class: 'hist-detail', hidden: true });
      const btnPrev = button('Podgląd', { sm: true, kind: 'ghost', onClick: () => {
        if (!detail.hidden) { detail.hidden = true; btnPrev.lastChild.textContent = 'Podgląd'; return; }
        const snap = e.snapshot;
        detail.replaceChildren(
          h('div', { class: 'muted small' }, `${snap.servings} porcji · ${catName(snap.category)}`),
          ...snap.sections.map((sec) => h('div', null, sec.name ? h('div', { class: 'tape' }, sec.name) : null,
            h('ul', { class: 'plain' }, sec.ingredients.map((i) => { const q = qtyParts(i); return h('li', null, `${i.name} — ${[q.num, q.unit].filter(Boolean).join(' ')}`); })))),
          snap.steps.length ? h('ol', { class: 'plain steps-mini' }, snap.steps.map((st) => h('li', null, st.text))) : null);
        detail.hidden = false; btnPrev.lastChild.textContent = 'Ukryj';
      } });
      const btnRestore = button('Przywróć wersję', { sm: true, kind: 'primary', onClick: async () => {
        const ok = await confirmDialog({ title: 'Przywrócić tę wersję?', message: `Receptura wróci do stanu z ${fmtDateTime(e.at)}. Obecna wersja trafi do historii, więc możesz to cofnąć.`, confirmText: 'Przywróć' });
        if (!ok) return;
        await restoreVersion(e);
        sheet.close(); scaled = null; toast('Przywrócono wersję'); paint();
      } });
      body.append(h('div', { class: 'hist-item' },
        h('div', { class: 'hist-date' }, fmtDateTime(e.at)),
        h('ul', { class: 'plain hist-changes' }, e.changes.map((c) => h('li', null, c))),
        h('div', { class: 'row gap' }, btnPrev, btnRestore), detail));
    });
    const sheet = openSheet({ title: 'Historia zmian', variant: 'sheet', body, actions: [{ label: 'Zamknij', kind: 'ghost' }] });
  }

  /* ----- Menu „więcej” ----- */

  function openMore() {
    const r = base();
    const sh = openSheet({
      title: r.name || 'Receptura', variant: 'sheet',
      body: h('div', { class: 'menu' },
        button('Edytuj recepturę', { icon: 'edit', block: true, onClick: () => { sh.close(); navigate('/edit/' + id); } }),
        button('Duplikuj', { icon: 'copy', block: true, onClick: async () => { sh.close(); const c = await duplicateRecipe(id); toast('Utworzono kopię', { action: { label: 'Otwórz', fn: () => navigate('/recipe/' + c.id) } }); } }),
        button('Skopiuj jako tekst', { icon: 'copy', block: true, onClick: async () => { sh.close(); const ok = await copyText(recipeToText(cur())); toast(ok ? 'Skopiowano recepturę' : 'Nie udało się skopiować', { type: ok ? '' : 'error' }); } }),
        navigator.share ? button('Udostępnij', { icon: 'share', block: true, onClick: async () => { sh.close(); try { await navigator.share({ title: r.name, text: recipeToText(cur()) }); } catch (_) { /* anulowano */ } } }) : null,
        button('Historia zmian', { icon: 'history', block: true, onClick: () => { sh.close(); openHistory(); } }),
        button('Usuń recepturę', { icon: 'trash', kind: 'danger', block: true, onClick: async () => {
          sh.close();
          const ok = await confirmDialog({ title: `Usunąć „${r.name}”?`, message: 'Receptura wraz z historią zmian zostanie usunięta z tego telefonu. Tej operacji nie da się cofnąć (chyba że masz kopię JSON).', confirmText: 'Usuń', danger: true });
          if (!ok) return;
          await deleteRecipe(id); toast('Receptura usunięta'); navigate('/recipes', { replace: true });
        } })),
    });
  }

  /* ----- Rysowanie ----- */

  let notesDirty = false;
  const notesSave = debounce(async (val) => {
    skipPaint = true;
    try { await patchRecipe(id, { notes: val }, { touch: true }); } finally { skipPaint = false; }
    notesDirty = false;
    savedHint.textContent = 'Zapisano';
    setTimeout(() => { if (savedHint.textContent === 'Zapisano') savedHint.textContent = ''; }, 1500);
  }, 500);
  const savedHint = h('span', { class: 'muted small saved-hint', 'aria-live': 'polite' });
  let notesEl = null;

  function ingredientsCard(r, table) {
    const showPct = !!(table && table.ok && r.bakers);
    const pct = new Map(table && table.ok ? table.rows.map((x) => [x.id, x]) : []);
    const secs = r.sections.filter((sec) => sec.ingredients.length || sec.name);
    return h('section', { class: 'card ingredients' },
      h('h2', { class: 'card-title' }, icon('list', 20), 'Składniki'),
      secs.length ? secs.map((sec) => h('div', { class: 'ing-section' },
        sec.name ? h('div', { class: 'tape' }, sec.name) : null,
        h('ul', { class: 'ing-list' }, sec.ingredients.map((i) => {
          const q = qtyParts(i);
          const p = pct.get(i.id);
          return h('li', { class: 'ing' },
            h('span', { class: 'ing-icon', 'data-kind': ingredientKind(i.name), 'aria-hidden': 'true' }, ingEmoji(i.name)),
            h('div', { class: 'ing-main' },
              h('span', { class: 'ing-name' }, i.name || '—'),
              showPct && p && KIND_LABEL[p.kind] ? h('span', { class: 'kind' }, KIND_LABEL[p.kind]) : null),
            showPct && p && p.pct != null ? h('span', { class: 'ing-pct num' }, fmtPct(p.pct)) : null,
            h('span', { class: 'ing-qty' }, h('span', { class: 'amt num' }, q.num), h('span', { class: 'unit' }, q.unit)));
        })))) : h('p', { class: 'muted' }, 'Brak składników.'));
  }

  function bakersCard(r, table) {
    if (!r.bakers || !table.ok) return null;
    const kv = (k, v) => h('div', { class: 'stat' }, h('span', { class: 'stat-k' }, k), h('span', { class: 'stat-v num' }, v));
    return h('section', { class: 'card' },
      h('h2', { class: 'card-title' }, icon('percent', 20), 'Procenty piekarskie'),
      h('div', { class: 'stats' }, kv('Mąka', fmtAmount(table.flourG) + ' g'), kv('Masa ciasta', fmtAmount(table.totalG) + ' g'), kv('Hydracja', fmtPct(table.hydration)),
        kv('Sól', fmtPct(table.salt)), kv('Drożdże', fmtPct(table.yeast)), table.fat > 0 ? kv('Tłuszcz', fmtPct(table.fat)) : null),
      button('Przelicz ciasto', { icon: 'swap', block: true, onClick: openBakers }));
  }

  /* Składniki na łuku — szybki podgląd. „Więcej” otwiera pełną recepturę w osobnym oknie. */
  function orbit(r) {
    const ings = allIngredients(r).filter((i) => i.name && i.unit !== '%');
    const picked = [], used = new Set();
    for (const i of ings) {
      const em = ingEmoji(i.name);
      if (used.has(em)) continue;
      used.add(em);
      picked.push(i);
      if (picked.length >= 5) break;
    }
    const more = Math.max(0, ings.length - picked.length);
    const items = [
      ...picked.map((i) => ({ ing: i })),
      { more, full: true },
    ];
    const n = items.length;
    const H = n > 3 ? 54 : 30;
    const el = h('div', { class: 'orbit', style: { '--oh': H + 'px' } },
      h('div', { class: 'orbit-arc' }),
      ...items.map((it, idx) => {
        const t = n === 1 ? 0.5 : idx / (n - 1);
        const u = 2 * t - 1;
        const y = H * (1 - Math.sqrt(Math.max(0, 1 - u * u)));
        const x = 9 + 82 * t;
        const q = it.ing ? qtyParts(it.ing) : null;
        const label = it.full
          ? (it.more > 0 ? `Jeszcze ${it.more} składników · Otwórz całą recepturę` : 'Otwórz całą recepturę')
          : `${it.ing.name} ${q.num} ${q.unit}`;
        return h('button', {
          type: 'button',
          class: 'orb' + (it.full ? ' orb-more' : ''),
          style: { left: x + '%', top: y + 'px' },
          'aria-label': label,
          title: it.full ? 'Otwórz całą recepturę' : it.ing.name,
          onClick: () => openFullRecipe(r),
        },
          h('span', { class: 'orb-dot' + (it.full ? ' orb-dot-more' : ''), 'data-kind': it.ing ? ingredientKind(it.ing.name) : null }, it.full ? (it.more > 0 ? `+${it.more}` : '…') : ingEmoji(it.ing.name)),
          h('span', { class: 'orb-name' }, it.full ? 'więcej' : it.ing.name.replace(/\s*\(.*\)\s*/, '').split(/[\s,]+/)[0]),
          it.ing ? h('span', { class: 'orb-amt num' }, [q.num, q.unit].filter(Boolean).join('\u00a0')) : null);
      }));
    return h('div', { class: 'orbit-wrap' }, h('div', { class: 'orbit-title' }, 'Składniki'), el);
  }

  function openFullRecipe(r) {
    const kc = estimateKcal(r);
    const ings = allIngredients(r).filter((i) => i.name && i.unit !== '%');
    const hasSections = (r.sections || []).some((sec) => sec.name);
    const ingredientGroups = (r.sections || []).filter((sec) => sec.ingredients && sec.ingredients.length);

    const modalIngredient = (i) => {
      const q = qtyParts(i);
      return h('div', { class: 'recipe-modal-ing' },
        h('span', { class: 'recipe-modal-ing-icon', 'data-kind': ingredientKind(i.name), 'aria-hidden': 'true' }, ingEmoji(i.name)),
        h('div', { class: 'recipe-modal-ing-main' },
          h('span', { class: 'recipe-modal-ing-name' }, i.name),
          hasSections ? h('span', { class: 'recipe-modal-ing-section' }, ((r.sections || []).find((sec) => sec.ingredients && sec.ingredients.some((x) => x.id === i.id)) || {}).name || 'Składnik') : null),
        h('span', { class: 'recipe-modal-ing-qty num' }, q.num || '—'),
        h('span', { class: 'recipe-modal-ing-unit' }, q.unit || ''));
    };

    const modalSections = [];
    if (ingredientGroups.length) {
      ingredientGroups.forEach((sec) => {
        modalSections.push(h('div', { class: 'recipe-modal-group' },
          sec.name ? h('div', { class: 'recipe-modal-group-title' }, sec.name) : null,
          h('div', { class: 'recipe-modal-ingredients' }, sec.ingredients.filter((i) => i.name && i.unit !== '%').map(modalIngredient))));
      });
    } else {
      modalSections.push(h('div', { class: 'recipe-modal-ingredients' }, ings.map(modalIngredient)));
    }

    const facts = [
      r.servings ? `${fmtNum(r.servings, 1)} porcji` : '',
      r.prepTime ? `przyg. ${fmtMinutes(r.prepTime)}` : '',
      r.cookTime ? `gotow. ${fmtMinutes(r.cookTime)}` : '',
      r.temperature ? r.temperature : '',
    ].filter(Boolean);

    const body = h('div', { class: 'recipe-modal' },
      h('div', { class: 'recipe-modal-hero' },
        h('div', { class: 'recipe-modal-photo-wrap' },
          h('img', {
            class: 'recipe-modal-photo' + (r.photo ? '' : ' art'),
            src: r.photo || recipeArtUrl(r),
            alt: r.photo ? `Zdjęcie: ${r.name}` : '',
          })),
        h('div', { class: 'recipe-modal-heading' },
          h('div', { class: 'recipe-modal-kicker' }, catName(r.category)),
          h('h3', { class: 'recipe-modal-title' }, r.name || 'Receptura'),
          facts.length ? h('div', { class: 'recipe-modal-facts' }, facts.map((x) => h('span', null, x))) : null,
          kc ? h('div', { class: 'recipe-modal-kcal' }, `ok. ${kc.perServing} kcal / porcja`) : null)),
      r.description ? h('p', { class: 'recipe-modal-desc' }, r.description) : null,
      h('section', { class: 'recipe-modal-section' },
        h('div', { class: 'recipe-modal-section-head' },
          h('span', { class: 'recipe-modal-index' }, '01'),
          h('div', null, h('div', { class: 'recipe-modal-eyebrow' }, 'LISTA'), h('h3', null, 'Składniki')),
          h('span', { class: 'recipe-modal-count' }, String(ings.length))),
        ...modalSections),
      h('section', { class: 'recipe-modal-section' },
        h('div', { class: 'recipe-modal-section-head' },
          h('span', { class: 'recipe-modal-index' }, '02'),
          h('div', null, h('div', { class: 'recipe-modal-eyebrow' }, 'KROK PO KROKU'), h('h3', null, 'Przygotowanie')),
          h('span', { class: 'recipe-modal-count' }, String((r.steps || []).length))),
        r.steps && r.steps.length
          ? h('ol', { class: 'recipe-modal-steps' }, r.steps.map((st) => h('li', null, h('span', { class: 'recipe-modal-step-text' }, st.text))))
          : h('p', { class: 'muted' }, 'Brak kroków. Dodaj je w edytorze.')),
      r.notes ? h('section', { class: 'recipe-modal-section recipe-modal-notes' },
        h('div', { class: 'recipe-modal-section-head' },
          h('span', { class: 'recipe-modal-index' }, '03'),
          h('div', null, h('div', { class: 'recipe-modal-eyebrow' }, 'NOTATKA'), h('h3', null, 'Własne uwagi'))),
        h('p', null, r.notes)) : null);

    openSheet({
      title: 'Pełna receptura',
      variant: 'center',
      cls: 'recipe-full-modal',
      body,
      actions: [
        { label: 'Zamknij', kind: 'ghost' },
        { label: 'GOTUJĘ', kind: 'primary', icon: 'chef', onClick: () => navigate('/guide/' + id) },
      ],
    });
  }

  function paint() {
    const r = cur();
    s.setTitle(r.name || 'Receptura');
    heartSlot.replaceChildren(heartBtn(base()));
    const table = bakersTable(r);
    const y = effectiveYield(r);
    const facts = [];
    const fact = (ico, text) => text ? h('span', { class: 'fact' }, icon(ico, 18), text) : null;
    facts.push(fact('users', r.servings ? `${fmtNum(r.servings, 1)} porcji` : ''));
    if (r.yieldAmount) facts.push(fact('info', `${fmtAmount(r.yieldAmount)} ${r.yieldUnit}`));
    facts.push(fact('clock', [r.prepTime ? `przyg. ${fmtMinutes(r.prepTime)}` : '', r.cookTime ? `gotow. ${fmtMinutes(r.cookTime)}` : ''].filter(Boolean).join(' · ')));
    facts.push(fact('timer', r.fermentTime ? `ferm. ${fmtMinutes(r.fermentTime)}` : ''));
    facts.push(fact('thermo', r.temperature));
    facts.push(fact('star', base().rating ? `${base().rating}/5` : ''));
    facts.push(fact('chef', base().cookCount ? `gotowano ${base().cookCount}×` : ''));

    const kids = [];
    const rr = base();
    // --- Górna część jak na makiecie: okrągłe zdjęcie, tytuł + ocena, opis, składniki na łuku, GOTUJĘ ---
    kids.push(h('div', { class: 'detail-hero' }, h('div', { class: 'hero-circle' },
      h('img', { class: rr.photo ? '' : 'art', src: rr.photo || recipeArtUrl(rr), alt: rr.photo ? `Zdjęcie: ${r.name}` : '' }))));
    kids.push(h('div', { class: 'detail-title-row' },
      h('h1', { class: 'detail-title' }, r.name || 'Receptura'),
      sideInfo({ ...rr, servings: r.servings, sections: r.sections })));
    if (r.description) kids.push(h('p', { class: 'desc' }, r.description));
    kids.push(orbit(r));
    kids.push(h('div', { class: 'actions-primary' },
      button('GOTUJĘ', { kind: 'primary', lg: true, block: true, icon: 'chef', onClick: () => navigate('/guide/' + id) }),
      h('p', { class: 'muted small center-text' }, 'Prowadzę krok po kroku: składniki, minutniki, czytanie na głos')));

    // Akcje główne pozostają dostępne na ekranie receptury.
    // Pełne szczegóły składników/przygotowania są nadal otwierane przez „Więcej”.
    kids.push(h('div', { class: 'actions-row detail-actions' },
      button('Przelicz', { icon: 'swap', onClick: openScale }),
      button('Do zakupów', { icon: 'cart', onClick: () => openAddToShopping(r, 1) }),
      button('Edytuj', { icon: 'edit', onClick: () => navigate('/edit/' + id) })));

    const open = false;
    const det = [];
    det.push(h('div', { class: 'detail-head' },
      h('div', { class: 'row wrap gap' }, tradMark(rr) ? h('span', { class: 'trad-big' }, tradMark(rr), originOf(rr.origin) ? originOf(rr.origin).name : 'Tradycyjna') : null,
        h('a', { class: 'pill', href: '#/recipes?cat=' + encodeURIComponent(r.category), onClick: (e) => { e.preventDefault(); navigate('/recipes?cat=' + encodeURIComponent(r.category)); } }, catName(r.category)),
        ...(r.tags || []).map((t) => h('a', { class: 'pill soft', href: '#/recipes?tag=' + encodeURIComponent(t), onClick: (e) => { e.preventDefault(); navigate('/recipes?tag=' + encodeURIComponent(t)); } }, '#' + t))),
      h('div', { class: 'facts' }, facts)));
    const kc = estimateKcal(r);
    if (kc) det.push(h('p', { class: 'muted small kcal-note' }, `Szacunkowo ok. ${kc.perServing} kcal na porcję (orientacyjnie, z tabel wartości odżywczej; ${Math.round(kc.coverage * 100)}% składników rozpoznano).`));
    det.push(h('div', { class: 'rate-row' }, h('span', { class: 'field-label' }, 'Twoja ocena'),
      h('div', { class: 'stars small', role: 'radiogroup', 'aria-label': 'Ocena' }, [1, 2, 3, 4, 5].map((n) => h('button', { type: 'button', class: 'star' + ((rr.rating || 0) >= n ? ' on' : ''), role: 'radio', 'aria-checked': rr.rating === n, 'aria-label': `${n} z 5`,
        onClick: async () => { await patchRecipe(id, { rating: rr.rating === n ? 0 : n }); } }, icon('star', 26))))));
    if (rr.servings) det.push(h('div', { class: 'stepper-bar' }, h('span', { class: 'field-label' }, 'Porcje'),
      h('div', { class: 'stepper', role: 'group', 'aria-label': 'Liczba porcji' },
        iconBtn('minus', 'Mniej porcji', () => { const cs = r.servings || rr.servings; const t = Math.max(0.5, cs > 1 ? cs - 1 : cs / 2); applyFactor(t / rr.servings, `${fmtNum(t, 1)} porcji`); }, 'glassy'),
        h('div', { class: 'stepper-val' }, h('strong', { class: 'num' }, fmtNum(r.servings, 1))),
        iconBtn('plus', 'Więcej porcji', () => { const cs = r.servings || rr.servings; const t = cs + 1; applyFactor(t / rr.servings, `${fmtNum(t, 1)} porcji`); }, 'glassy'))));
    det.push(h('div', { class: 'actions-row' },
      button('Przelicz', { icon: 'swap', onClick: openScale }),
      button('Do zakupów', { icon: 'cart', onClick: () => openAddToShopping(r, 1) }),
      button('Edytuj', { icon: 'edit', onClick: () => navigate('/edit/' + id) })),
      button('Lista kontrolna', { block: true, icon: 'list', kind: 'ghost', onClick: () => navigate('/cook/' + id) }));

    if (scaled) {
      det.push(h('div', { class: 'banner scale-banner', role: 'status' },
        h('div', { class: 'banner-text' }, h('strong', null, 'Przeliczone: ' + scaleLabel), h('span', { class: 'muted' }, 'Podgląd — nic jeszcze nie zapisano.')),
        h('div', { class: 'row wrap gap' },
          button('Zapisz jako nową', { sm: true, onClick: saveScaledNew }),
          button('Zapisz w tej', { sm: true, onClick: saveScaledHere }),
          button('Reset', { sm: true, kind: 'ghost', onClick: () => { scaled = null; scaleLabel = ''; paint(); } }))));
    }

    det.push(ingredientsCard(r, table));
    det.push(bakersCard(r, table));

    det.push(h('section', { class: 'card' },
      h('h2', { class: 'card-title' }, icon('list', 20), 'Przygotowanie'),
      r.steps.length ? h('ol', { class: 'steps' }, r.steps.map((st) => h('li', null, h('span', { class: 'step-text' }, st.text)))) : h('p', { class: 'muted' }, 'Brak kroków. Dodaj je w edytorze.')));

    det.push(costCard());

    const startNotes = notesDirty && notesEl ? notesEl.value : base().notes || '';
    notesEl = textArea({ value: startNotes, label: 'Własne uwagi', placeholder: 'Np. ciasto wyszło za twarde — następnym razem +10 g wody…', rows: 3, onInput: (v) => { notesDirty = true; savedHint.textContent = '…'; notesSave(v); } });
    det.push(h('section', { class: 'card' },
      h('div', { class: 'row between' }, h('h2', { class: 'card-title' }, icon('edit', 20), 'Własne uwagi'), savedHint), notesEl));

    const src = [];
    if (base().source) src.push(h('div', null, 'Źródło: ', base().source));
    if (base().sourceUrl) src.push(h('div', null, h('a', { class: 'ext', href: base().sourceUrl, target: '_blank', rel: 'noopener noreferrer' }, icon('link', 16), hostOf(base().sourceUrl) || base().sourceUrl)));
    src.push(h('div', null, `Dodano ${fmtDate(base().createdAt, true)} · zmieniono ${fmtDateTime(base().updatedAt)}`));
    det.push(h('div', { class: 'meta-foot muted small' }, src));
    det.push(h('div', { class: 'row center' }, button('Historia zmian', { icon: 'history', kind: 'ghost', onClick: openHistory })));

    // Pełna receptura jest dostępna z okrągłego „więcej” i nie zajmuje miejsca na ekranie głównym. 
    // Szczegóły nie są już renderowane inline.

    s.content.replaceChildren(...kids.filter(Boolean));
  }

  paint();
  const unsub = subscribe((t) => {
    if (skipPaint) return;
    if (t === 'recipes' || t === 'settings' || t === 'categories') {
      if (!getRecipe(id)) { navigate('/recipes', { replace: true }); return; }
      paint();
    }
  });
  return { el: s.el, destroy: () => { unsub(); if (notesDirty && notesEl) notesSave.flush(notesEl.value); } };
}
