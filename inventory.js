/* ==========================================================================
   inventory.js — magazyn składników, zużycie, straty i skaner EAN.
   Dane pozostają lokalnie w IndexedDB; wyszukiwanie nazwy po EAN jest opcjonalne.
   ========================================================================== */
import { db } from './db.js';
import { uid, norm, fmtAmount, parseNum } from './util.js';
import { getSetting, setSetting } from './recipes.js';
import { addItems } from './shopping.js';
import { decodeEAN13Frame } from './barcode.js';
import { h, icon, screen, button, iconBtn, toast, openSheet, confirmDialog, emptyState, textInput, selectEl } from './ui.js';

const CATEGORIES = ['Warzywa i owoce', 'Mięso i ryby', 'Nabiał i jaja', 'Suche i przyprawy', 'Mrożonki', 'Inne'];
const UNITS = ['g', 'kg', 'ml', 'l', 'szt.'];
const WEEK = 7 * 24 * 60 * 60 * 1000;
const money = (n) => (Number.isFinite(n) ? n.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00') + ' zł';
const clean = (s) => norm(String(s || '').replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\b(świeży|świeża|świeże|posiekany|posiekana|posiekane|drobno|starty|starta|starte)\b/g, ' ').replace(/\s+/g, ' ').trim());

function baseAmount(value, unit) {
  const u = norm(unit).replace(/\.$/, '');
  if (['g', 'gram', 'gramy', 'gramów'].includes(u)) return { kind: 'mass', value };
  if (['kg', 'kilogram', 'kilogramy', 'kilogramów'].includes(u)) return { kind: 'mass', value: value * 1000 };
  if (['dag'].includes(u)) return { kind: 'mass', value: value * 10 };
  if (['mg'].includes(u)) return { kind: 'mass', value: value / 1000 };
  if (['ml', 'mililitr', 'mililitry', 'mililitrów'].includes(u)) return { kind: 'volume', value };
  if (['l', 'litr', 'litry', 'litrów'].includes(u)) return { kind: 'volume', value: value * 1000 };
  if (['cl'].includes(u)) return { kind: 'volume', value: value * 10 };
  if (['szt', 'sztuka', 'sztuki', 'sztuk', 'pcs'].includes(u)) return { kind: 'count', value };
  return { kind: u || 'other', value };
}
function fromBase(value, unit) {
  const u = norm(unit).replace(/\.$/, '');
  if (['kg', 'kilogram', 'kilogramy', 'kilogramów'].includes(u)) return value / 1000;
  if (['dag'].includes(u)) return value / 10;
  if (['mg'].includes(u)) return value * 1000;
  if (['l', 'litr', 'litry', 'litrów'].includes(u)) return value / 1000;
  if (['cl'].includes(u)) return value / 10;
  return value;
}
function convert(value, from, to) {
  const a = baseAmount(value, from), b = baseAmount(1, to);
  if (a.kind !== b.kind) return null;
  return fromBase(a.value, to);
}
function displayQty(n, unit) { return fmtAmount(n) + (unit ? ' ' + unit : ''); }
function matches(item, name) {
  const target = clean(name);
  if (!target) return false;
  const names = [item.name, ...(Array.isArray(item.aliases) ? item.aliases : [])];
  return names.some((n) => clean(n) === target);
}
function lowStock(item) { return Number(item.minStock || 0) > 0 && Number(item.stock || 0) <= Number(item.minStock || 0); }

async function loadData() {
  const [items, movements] = await Promise.all([db.getAll('inventoryItems'), db.getAll('inventoryMovements')]);
  return {
    items: items.sort((a, b) => String(a.name).localeCompare(String(b.name), 'pl')),
    movements: movements.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)),
  };
}

export async function deductRecipeIngredients(recipe, factor = 1) {
  const { items } = await loadData();
  const changed = [], movements = [], missing = [];
  const ingredients = (recipe.sections || []).flatMap((s) => s.ingredients || []);
  for (const ing of ingredients) {
    if (!ing.name || !Number.isFinite(Number(ing.amount)) || ing.amount == null || Number(ing.amount) <= 0) continue;
    const item = items.find((x) => matches(x, ing.name));
    if (!item) { missing.push(ing.name); continue; }
    const amount = convert(Number(ing.amount) * factor, ing.unit, item.unit);
    if (amount == null) { missing.push(ing.name + ' (inna jednostka)'); continue; }
    item.stock = Math.round((Number(item.stock || 0) - amount) * 10000) / 10000;
    item.updatedAt = Date.now();
    changed.push(item);
    movements.push({
      id: uid('mov_'), inventoryId: item.id, name: item.name, type: 'cook',
      amount: -amount, unit: item.unit, cost: amount * Number(item.pricePerUnit || 0),
      reason: recipe.name || 'Gotowanie', recipeId: recipe.id || '', createdAt: Date.now() + movements.length,
    });
  }
  if (changed.length) await db.putMany('inventoryItems', changed);
  if (movements.length) await db.putMany('inventoryMovements', movements);
  return { deducted: changed.length, missing: [...new Set(missing)], low: changed.filter(lowStock).map((x) => x.name) };
}

export function inventoryView() {
  let active = true;
  let data = { items: [], movements: [] };
  const right = h('div', { class: 'row gap inventory-head-actions' },
    iconBtn('scan', 'Skanuj kod EAN', openScanner),
    iconBtn('plus', 'Dodaj produkt do magazynu', () => openItemSheet()));
  const s = screen({ title: 'Magazyn', right, cls: 'inventory' });
  const c = s.content;
  let selectedCategory = 'Wszystkie';
  const searchIn = textInput({ label: 'Szukaj w magazynie', placeholder: 'Szukaj w magazynie…' });
  searchIn.addEventListener('input', paint);
  const searchBar = h('div', { class: 'inventory-search' }, icon('search', 18), searchIn);
  const filterRow = h('div', { class: 'inventory-filters', role: 'group', 'aria-label': 'Kategorie magazynu' });
  const filterButtons = ['Wszystkie', ...CATEGORIES].map((label) => button(label, { kind: 'ghost', onClick: () => { selectedCategory = label; paint(); } }));
  filterRow.replaceChildren(...filterButtons);
  const content = h('div', { class: 'inventory-content' });
  c.replaceChildren(searchBar, filterRow, content);

  async function reload() {
    try { data = await loadData(); if (active) paint(); }
    catch (e) { toast('Nie udało się odczytać magazynu: ' + (e.message || 'błąd'), { type: 'error' }); }
  }
  function lowItems() { return data.items.filter(lowStock); }
  function weeklyWaste() {
    const from = Date.now() - WEEK;
    return data.movements.filter((m) => m.type === 'waste' && (m.createdAt || 0) >= from).reduce((n, m) => n + Number(m.cost || 0), 0);
  }

  async function saveItem(item) {
    await db.put('inventoryItems', item);
    await reload();
    if (getSetting('inventoryLowAlerts') !== false && lowStock(item)) toast('Niski stan: ' + item.name, { type: 'error' });
  }
  async function adjust(item, delta) {
    const next = { ...item, stock: Math.round((Number(item.stock || 0) + delta) * 10000) / 10000, updatedAt: Date.now() };
    await db.put('inventoryItems', next);
    await db.put('inventoryMovements', {
      id: uid('mov_'), inventoryId: item.id, name: item.name, type: 'adjustment',
      amount: delta, unit: item.unit, cost: delta * Number(item.pricePerUnit || 0),
      reason: delta > 0 ? 'Ręczne dodanie' : 'Ręczne odjęcie', createdAt: Date.now(),
    });
    await reload();
    if (getSetting('inventoryLowAlerts') !== false && lowStock(next)) toast('Niski stan: ' + next.name, { type: 'error' });
  }

  function openItemSheet(existing = null, prefill = {}) {
    const old = existing || {};
    const name = textInput({ value: prefill.name || old.name || '', label: 'Nazwa produktu', placeholder: 'Np. Mąka pszenna' });
    const category = selectEl(CATEGORIES.map((x) => [x, x]), old.category || 'Inne', null, { label: 'Kategoria' });
    const stock = textInput({ value: String(old.stock ?? 0), label: 'Aktualny stan', inputmode: 'decimal' });
    const unit = selectEl(UNITS.map((x) => [x, x]), old.unit || 'kg', null, { label: 'Jednostka stanu' });
    const minimum = textInput({ value: String(old.minStock ?? 0), label: 'Próg niskiego stanu', inputmode: 'decimal' });
    const price = textInput({ value: String(old.pricePerUnit ?? ''), label: 'Cena za jednostkę (zł)', inputmode: 'decimal', placeholder: 'Opcjonalnie' });
    const barcode = textInput({ value: prefill.barcode || old.barcode || '', label: 'Kod EAN', inputmode: 'numeric', placeholder: 'Opcjonalnie' });
    const aliases = textInput({ value: (old.aliases || []).join(', '), label: 'Nazwy alternatywne', placeholder: 'Oddziel przecinkami' });
    const body = h('div', { class: 'stack inventory-edit-form' },
      fieldLabel('Nazwa produktu', name), fieldLabel('Kategoria', category),
      h('div', { class: 'grid two' }, fieldLabel('Stan', stock), fieldLabel('Jednostka', unit)),
      h('div', { class: 'grid two' }, fieldLabel('Próg niskiego stanu', minimum), fieldLabel('Cena za jednostkę', price)),
      fieldLabel('Kod EAN', barcode), fieldLabel('Nazwy alternatywne', aliases),
      h('p', { class: 'muted small' }, 'Nazwy alternatywne pozwalają bezpiecznie dopasować składniki z receptur do pozycji magazynu.'));
    const sh = openSheet({
      title: old.id ? 'Edytuj produkt' : 'Dodaj do magazynu', variant: 'sheet', body,
      actions: [
        { label: 'Anuluj', kind: 'ghost' },
        { label: 'Zapisz', kind: 'primary', onClick: async () => {
          const n = name.value.trim();
          if (!n) { name.focus(); toast('Wpisz nazwę produktu', { type: 'error' }); return false; }
          const stockVal = parseNum(stock.value), minVal = parseNum(minimum.value), priceVal = parseNum(price.value);
          const item = {
            id: old.id || uid('inv_'), name: n, category: category.value || 'Inne',
            stock: stockVal == null ? 0 : stockVal, unit: unit.value || 'kg',
            minStock: minVal == null ? 0 : minVal, pricePerUnit: priceVal == null ? 0 : priceVal,
            barcode: barcode.value.trim(), aliases: aliases.value.split(',').map((x) => x.trim()).filter(Boolean),
            updatedAt: Date.now(), createdAt: old.createdAt || Date.now(),
          };
          await saveItem(item); toast('Zapisano: ' + n); return true;
        } },
      ],
    });
    return sh;
  }
  function fieldLabel(label, control) { return h('label', { class: 'field' }, h('span', { class: 'field-label' }, label), control); }

  async function recordWaste(item) {
    const amount = textInput({ value: '1', label: 'Ilość straty', inputmode: 'decimal' });
    const reason = selectEl([['Przeterminowane', 'Przeterminowane'], ['Zepsute', 'Zepsute'], ['Błąd produkcji', 'Błąd produkcji'], ['Nadprodukcja', 'Nadprodukcja'], ['Inne', 'Inne']], 'Zepsute', null, { label: 'Powód' });
    const sh = openSheet({
      title: 'Zarejestruj stratę', variant: 'center',
      body: h('div', { class: 'stack' },
        h('p', null, item.name + ' · stan: ' + displayQty(item.stock, item.unit)),
        fieldLabel('Ilość straty (' + item.unit + ')', amount), fieldLabel('Powód', reason)),
      actions: [
        { label: 'Anuluj', kind: 'ghost' },
        { label: 'Zapisz stratę', kind: 'danger', onClick: async () => {
          const n = parseNum(amount.value);
          if (n == null || n <= 0) { toast('Podaj ilość większą od zera', { type: 'error' }); return false; }
          const next = { ...item, stock: Math.round((Number(item.stock || 0) - n) * 10000) / 10000, updatedAt: Date.now() };
          await db.put('inventoryItems', next);
          await db.put('inventoryMovements', {
            id: uid('wst_'), inventoryId: item.id, name: item.name, type: 'waste', amount: -n, unit: item.unit,
            cost: n * Number(item.pricePerUnit || 0), reason: reason.value, createdAt: Date.now(),
          });
          await reload();
          toast('Zapisano stratę: ' + money(n * Number(item.pricePerUnit || 0)));
          return true;
        } },
      ],
    });
    return sh;
  }

  async function deleteItem(item) {
    if (!await confirmDialog({ title: 'Usunąć z magazynu?', message: item.name + ' zostanie usunięty z listy stanów. Historia strat pozostanie.', confirmText: 'Usuń', danger: true })) return;
    await db.delete('inventoryItems', item.id);
    await reload();
    toast('Usunięto z magazynu');
  }

  async function addLowToShopping() {
    const low = lowItems().filter((x) => Number(x.minStock || 0) > Number(x.stock || 0));
    if (!low.length) { toast('Nie ma braków do dodania'); return; }
    await addItems(low.map((x) => ({ name: x.name, amount: Math.max(0, Number(x.minStock) - Number(x.stock)), unit: x.unit })));
    toast('Dodano braki do listy zakupów');
  }

  async function lookupBarcode(code) {
    if (!navigator.onLine) return {};
    try {
      const res = await fetch('https://world.openfoodfacts.org/api/v2/product/' + encodeURIComponent(code) + '.json', { headers: { Accept: 'application/json' } });
      if (!res.ok) return {};
      const payload = await res.json();
      const p = payload && payload.product;
      if (payload.status !== 1 || !p) return {};
      return { name: p.product_name_pl || p.product_name || p.product_name_en || '' };
    } catch (_) { return {}; }
  }

  async function openScanner() {
    let active = true, stream = null, torch = false;
    const video = h('video', { class: 'scanner-video', autoplay: true, playsinline: true, muted: true });
    const code = textInput({ label: 'Kod EAN', placeholder: 'Zeskanuj lub wpisz kod', inputmode: 'numeric' });
    const status = h('p', { class: 'scanner-status muted', 'aria-live': 'polite' }, 'Uruchamiam kamerę…');
    const torchBtn = button('Latarka', { kind: 'ghost', icon: 'flashlight', onClick: async () => {
      const track = stream && stream.getVideoTracks()[0];
      if (!track) return;
      try {
        torch = !torch;
        await track.applyConstraints({ advanced: [{ torch }] });
        torchBtn.textContent = torch ? 'Wyłącz latarkę' : 'Latarka';
      } catch (_) { toast('Latarka nie jest obsługiwana przez tę kamerę'); }
    } });
    const stop = () => {
      active = false;
      if (stream) stream.getTracks().forEach((t) => t.stop());
      stream = null;
      video.srcObject = null;
    };
    const acceptCode = async (raw) => {
      const value = String(raw || '').replace(/\D/g, '');
      if (!/^\d{8}$|^\d{12,14}$/.test(value)) { toast('Wpisz prawidłowy kod EAN/UPC', { type: 'error' }); return false; }
      active = false; stop();
      sh.close('scan');
      const found = await lookupBarcode(value);
      openItemSheet(null, { barcode: value, name: found.name || '' });
      return true;
    };
    const sh = openSheet({
      title: 'Skaner kodów EAN', variant: 'sheet',
      body: h('div', { class: 'stack scanner-shell' },
        h('div', { class: 'scanner-frame' }, video, h('span', { class: 'scanner-line', 'aria-hidden': 'true' })),
        status, torchBtn, fieldLabel('Kod produktu', code),
        h('p', { class: 'muted small' }, 'Jeśli Safari nie udostępnia automatycznego dekodowania, wpisz kod ręcznie. Po połączeniu z internetem spróbujemy rozpoznać nazwę produktu.')),
      actions: [
        { label: 'Użyj kodu', kind: 'primary', onClick: () => acceptCode(code.value) },
        { label: 'Zamknij', kind: 'ghost' },
      ],
      onClose: stop,
    });
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw new Error('Brak dostępu do kamery w tej przeglądarce.');
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false });
      if (!active) { stream.getTracks().forEach((t) => t.stop()); return; }
      video.srcObject = stream;
      await video.play();
      status.textContent = 'Skieruj kod kreskowy na środek kadru.';
      const track = stream.getVideoTracks()[0];
      const caps = track && track.getCapabilities ? track.getCapabilities() : {};
      torchBtn.disabled = !(caps && caps.torch);
      let detector = null;
      if (typeof window.BarcodeDetector === 'function') {
        try { detector = new window.BarcodeDetector({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e'] }); } catch (_) { detector = null; }
      }
      const canvas = document.createElement('canvas');
      let lastScanAt = 0;
      status.textContent = detector
        ? 'Skanuję automatycznie — ustaw kod w środku kadru.'
        : 'Skanuję EAN-13 lokalnie — trzymaj kod poziomo w ramce.';
      const scanFrame = async () => {
        if (!active) return;
        if (video.readyState < 2 || video.videoWidth < 1 || video.videoHeight < 1) {
          requestAnimationFrame(scanFrame);
          return;
        }
        if (Date.now() - lastScanAt >= 120) {
          lastScanAt = Date.now();
          try {
            let raw = '';
            if (detector) {
              const codes = await detector.detect(video);
              raw = codes && codes.length ? codes[0].rawValue : '';
            } else raw = decodeEAN13Frame(video, canvas) || '';
            if (raw) { await acceptCode(raw); return; }
          } catch (_) { /* pomiń klatkę z odbiciem lub rozmyciem */ }
        }
        if (active) requestAnimationFrame(scanFrame);
      };
      requestAnimationFrame(scanFrame);
    } catch (e) {
      status.textContent = 'Nie udało się uruchomić kamery. Możesz wpisać EAN ręcznie.';
      toast(e.message || 'Nie udało się uruchomić kamery', { type: 'error' });
    }
  }

  function itemCard(item) {
    const low = lowStock(item);
    return h('article', { class: 'inventory-item' + (low ? ' is-low' : '') },
      h('div', { class: 'inventory-item-main' },
        h('div', { class: 'inventory-item-title' }, h('strong', null, item.name), low ? h('span', { class: 'inventory-low-badge' }, 'Niski stan') : null),
        h('p', { class: 'muted small' }, [item.category || 'Inne', item.barcode ? 'EAN ' + item.barcode : ''].filter(Boolean).join(' · ')),
        item.pricePerUnit ? h('p', { class: 'muted small' }, money(item.pricePerUnit) + ' / ' + item.unit) : null),
      h('div', { class: 'inventory-stock' },
        h('strong', null, displayQty(item.stock, item.unit)),
        h('span', { class: 'muted small' }, 'minimum ' + displayQty(item.minStock || 0, item.unit))),
      h('div', { class: 'inventory-item-actions' },
        iconBtn('minus', 'Odejmij 1 ' + item.unit, () => adjust(item, -1), 'quiet'),
        iconBtn('plus', 'Dodaj 1 ' + item.unit, () => adjust(item, 1), 'quiet'),
        iconBtn('trash', 'Zarejestruj stratę: ' + item.name, () => recordWaste(item), 'quiet'),
        iconBtn('edit', 'Edytuj: ' + item.name, () => openItemSheet(item), 'quiet'),
        iconBtn('x', 'Usuń produkt: ' + item.name, () => deleteItem(item), 'quiet')));
  }

  function paint() {
    const low = lowItems();
    const query = clean(searchIn.value);
    const filteredItems = data.items.filter((item) => (selectedCategory === 'Wszystkie' || (item.category || 'Inne') === selectedCategory) && (!query || clean([item.name, ...(item.aliases || []), item.barcode].join(' ')).includes(query)));
    filterButtons.forEach((b, i) => { b.classList.toggle('on', ['Wszystkie', ...CATEGORIES][i] === selectedCategory); });
    const from = Date.now() - WEEK;
    const recentWaste = data.movements.filter((m) => m.type === 'waste' && (m.createdAt || 0) >= from).slice(0, 5);
    const alertsOn = getSetting('inventoryLowAlerts') !== false;
    const summary = h('div', { class: 'inventory-summary' },
      summaryCard('Produkty', String(data.items.length), 'inventory-stat-products'),
      summaryCard('Niski stan', String(low.length), low.length ? 'inventory-stat-low' : 'inventory-stat-ok'),
      summaryCard('Straty · 7 dni', money(weeklyWaste()), 'inventory-stat-waste'));
    const alertToggle = button('Alerty niskiego stanu: ' + (alertsOn ? 'włączone' : 'wyłączone'), {
      kind: 'ghost', block: true, icon: 'bell', onClick: async () => { await setSetting('inventoryLowAlerts', !alertsOn); paint(); },
    });
    const kids = [summary, alertToggle];
    if (low.length) {
      kids.push(h('section', { class: 'inventory-low-panel card stack' },
        h('div', { class: 'row between' }, h('h2', { class: 'card-title' }, icon('alert', 20), 'Do uzupełnienia'), h('span', { class: 'pill' }, String(low.length))),
        h('p', { class: 'muted small' }, 'Pozycje poniżej ustawionego minimum. Możesz dodać brakujące ilości do listy zakupów.'),
        button('Dodaj braki do zakupów', { kind: 'primary', block: true, icon: 'cart', onClick: addLowToShopping })));
    }
    if (!data.items.length) {
      kids.push(emptyState('📦', 'Magazyn jest pusty', 'Dodaj produkty, ustaw jednostkę i minimum. Żarłok może potem odliczać składniki po zakończeniu gotowania.',
        button('Dodaj pierwszy produkt', { kind: 'primary', icon: 'plus', onClick: () => openItemSheet() }),
        button('Skanuj kod EAN', { icon: 'scan', onClick: openScanner })));
    } else if (!filteredItems.length) {
      kids.push(emptyState('🔎', 'Brak wyników', 'Zmień frazę albo kategorię magazynu.'));
    } else {
      const groups = new Map();
      filteredItems.forEach((item) => { const key = item.category || 'Inne'; if (!groups.has(key)) groups.set(key, []); groups.get(key).push(item); });
      [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0], 'pl')).forEach(([label, items]) => {
        kids.push(h('section', { class: 'inventory-group card stack' },
          h('div', { class: 'row between' }, h('h2', { class: 'card-title' }, label), h('span', { class: 'pill' }, String(items.length))),
          h('div', { class: 'inventory-items' }, items.map(itemCard))));
      });
    }
    if (recentWaste.length) {
      kids.push(h('section', { class: 'inventory-group card stack' },
        h('h2', { class: 'card-title' }, 'Ostatnie straty'),
        recentWaste.map((m) => h('div', { class: 'inventory-movement' },
          h('div', null, h('strong', null, m.name), h('p', { class: 'muted small' }, (m.reason || 'Strata') + ' · ' + new Date(m.createdAt).toLocaleDateString('pl-PL'))),
          h('div', { class: 'inventory-movement-cost' }, h('strong', null, money(m.cost)), h('span', { class: 'muted small' }, displayQty(Math.abs(m.amount), m.unit)))))));
    }
    content.replaceChildren(...kids);
  }
  function summaryCard(label, value, cls) {
    return h('div', { class: 'inventory-summary-card ' + cls }, h('span', { class: 'muted small' }, label), h('strong', null, value));
  }

  void reload();
  return { el: s.el, destroy: () => { active = false; } };
}
