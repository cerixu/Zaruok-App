/* ==========================================================================
   views-start.js — Żarłok / ekran główny v1.3
   Minimalistyczny hub. Język wizualny odpowiada ekranowi receptury:
   dużo powietrza, okrągłe zdjęcia, cienkie linie, małe akcenty kolorystyczne.
   ========================================================================== */
import { h, icon, iconBtn, screen, emptyState, button } from './ui.js';
import { navigate } from './router.js';
import { state, subscribe, listRecipes } from './recipes.js';
import { recipeTile, catTile, sectionHead, metaLine } from './components.js';
import { openTimersSheet } from './timers.js';
import { pendingCount } from './shopping.js';
import { backupDue, daysSinceBackup } from './backup.js';
import { recipeArtUrl } from './art.js';

const plural = (n) => n === 1 ? '1 receptura' :
  (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? n + ' receptury' : n + ' receptur');

const ACTIONS = [
  { label: 'Receptury', note: 'Cała książka', icon: 'book', tint: 'lime', path: '/recipes', primary: true },
  { label: 'Nowa receptura', note: 'Od pustej kartki', icon: 'plus', tint: 'coral', path: '/new' },
  { label: 'Kalkulatory', note: 'Przelicz i policz', icon: 'calc', tint: 'amber', path: '/calc' },
  { label: 'Zakupy', note: 'Lista zakupów', icon: 'cart', tint: 'blue', path: '/shopping' },
  { label: 'Ulubione', note: 'Twoje pewniaki', icon: 'heart', tint: 'pink', path: '/recipes?f=fav' },
];

const TOOLS = [
  ['Minutnik', 'timer', 'amber', () => openTimersSheet()],
  ['Przelicznik', 'scale', 'blue', () => navigate('/calc/units')],
  ['Temperatury', 'thermo', 'coral', () => navigate('/calc/doneness')],
  ['Zamienniki', 'swap', 'violet', () => navigate('/calc/subs')],
  ['Lodówka', 'fridge', 'cyan', () => navigate('/calc/pantry')],
  ['Losuj', 'shuffle', 'lime', () => navigate('/calc/random')],
  ['Importuj', 'upload', 'orange', () => navigate('/import')],
  ['Szukaj', 'search', 'pink', () => navigate('/search')],
];

function actionRow(a, badge = 0) {
  return h('a', {
    class: 'zf-action' + (a.primary ? ' is-primary' : ''),
    href: '#' + a.path,
    style: { '--item-tint': 'var(--zf-' + a.tint + ')' },
    onClick: (e) => { e.preventDefault(); navigate(a.path); },
    'aria-label': a.label,
  },
    h('span', { class: 'zf-action-icon' }, icon(a.icon, 21),
      badge ? h('span', { class: 'zf-badge' }, badge > 99 ? '99+' : String(badge)) : null),
    h('span', { class: 'zf-action-copy' },
      h('strong', null, a.label),
      h('small', null, a.note)),
    h('span', { class: 'zf-action-go', 'aria-hidden': 'true' }, icon('right', 17))
  );
}

function toolButton([label, ico, tint, fn]) {
  return h('button', {
    type: 'button',
    class: 'zf-tool',
    style: { '--item-tint': 'var(--zf-' + tint + ')' },
    onClick: fn,
    'aria-label': label,
  },
    h('span', { class: 'zf-tool-icon' }, icon(ico, 20)),
    h('span', { class: 'zf-tool-label' }, label));
}

function featureRecipe(r) {
  if (!r) return h('div', { class: 'zf-feature-empty' }, icon('chef', 34), h('span', null, 'Dodaj pierwszą recepturę'));
  return h('a', {
    class: 'zf-feature',
    href: '#/recipe/' + encodeURIComponent(r.id),
    onClick: (e) => { e.preventDefault(); navigate('/recipe/' + encodeURIComponent(r.id)); },
    'aria-label': 'Otwórz recepturę: ' + r.name,
  },
    h('div', { class: 'zf-feature-ring' },
      h('div', { class: 'zf-feature-img' },
        h('img', { class: r.thumb ? '' : 'art', src: r.thumb || recipeArtUrl(r), alt: '', decoding: 'async' }))),
    h('div', { class: 'zf-feature-copy' },
      h('span', { class: 'zf-kicker' }, 'DZIŚ'),
      h('h2', null, r.name || 'Bez nazwy'),
      h('p', null, metaLine(r) || 'Twoja receptura'),
      h('span', { class: 'zf-feature-open' }, 'Otwórz', icon('right', 16)))
  );
}

export function startView() {
  const s = screen({
    title: 'Żarłok',
    left: h('span', { class: 'nav-spacer' }),
    right: iconBtn('search', 'Szukaj', () => navigate('/search')),
    cls: 'start-final',
    large: 'hero',
  });

  const c = s.content;
  let unsub;

  function paint() {
    const all = listRecipes();
    const recent = all.filter((r) => r.lastOpenedAt).sort((a, b) => b.lastOpenedAt - a.lastOpenedAt).slice(0, 6);
    const favs = all.filter((r) => r.favorite).sort((a, b) => (b.favoritedAt || 0) - (a.favoritedAt || 0)).slice(0, 6);
    const n = pendingCount();
    const used = new Map();
    all.forEach((r) => used.set(r.category, (used.get(r.category) || 0) + 1));
    const cats = state.categories.filter((cat) => used.has(cat.id)).slice(0, 8);

    const sorted = [...all].sort((a, b) =>
      (b.updatedAt || 0) - (a.updatedAt || 0) || String(a.name).localeCompare(String(b.name), 'pl'));
    const feature = sorted.find((r) => r.favorite) || sorted[0] || null;

    const kids = [
      h('div', { class: 'zf-head' },
        h('div', { class: 'zf-head-copy' },
          h('span', { class: 'zf-kicker' }, 'NOTATNIK KUCHARZA'),
          h('h1', null, 'Żarłok'),
          h('p', null, plural(all.length) + ' · tylko na tym telefonie')),
        h('div', { class: 'zf-head-mark', 'aria-hidden': 'true' },
          h('span', { class: 'zf-mark-dot' }),
          h('span', null, 'PRO'))),

      h('div', { class: 'zf-feature-wrap' }, featureRecipe(feature)),

      h('div', { class: 'zf-section-title zf-menu-heading' },
        h('span', { class: 'zf-section-index' }, '01'),
        h('span', null, 'MENU'),
        h('span', { class: 'zf-section-line' }),
        h('span', { class: 'zf-section-caption' }, 'NAWIGACJA')),

      h('div', { class: 'zf-actions' },
        ACTIONS.map((a) => actionRow(a, a.label === 'Zakupy' ? n : 0))),

      h('div', { class: 'zf-section-title zf-tools-title' },
        h('span', null, 'SZYBKO'),
        h('button', { type: 'button', class: 'zf-section-link', onClick: () => navigate('/calc') },
          'Więcej', icon('right', 15))),

      h('div', { class: 'zf-tools-grid' }, TOOLS.map(toolButton))
    ];

    if (backupDue()) {
      const d = daysSinceBackup();
      kids.push(h('button', {
        type: 'button', class: 'zf-backup',
        onClick: () => navigate('/settings'),
      },
        icon('download', 18),
        h('span', null, d == null ? 'Zrób pierwszą kopię danych' : 'Kopia danych ma ' + d + ' dni'),
        icon('right', 15)));
    }

    if (!all.length) {
      kids.push(h('div', { class: 'zf-empty-card' },
        emptyState('📒', 'Jeszcze pusto', 'Dodaj pierwszą recepturę i zbuduj swój prywatny notatnik.',
          button('Nowa receptura', { kind: 'primary', icon: 'plus', onClick: () => navigate('/new') }),
          button('Importuj', { icon: 'upload', onClick: () => navigate('/import') }))));
      c.replaceChildren(...kids);
      return;
    }

    if (cats.length) {
      kids.push(sectionHead('Kategorie', {
        action: 'Wszystkie',
        onAction: () => navigate('/recipes'),
      }));
      kids.push(h('div', { class: 'rail cats zf-cats-rail' },
        cats.map((cat) => catTile(cat, used.get(cat.id), () =>
          navigate('/recipes?cat=' + encodeURIComponent(cat.id))))));
    }

    if (recent.length) {
      kids.push(sectionHead('Ostatnio używane', { action: 'Wszystkie', onAction: () => navigate('/recipes?f=recent') }));
      kids.push(h('div', { class: 'rail zf-recipe-rail' }, recent.map((r) => recipeTile(r))));
    }

    if (favs.length) {
      kids.push(sectionHead('Ulubione', { action: 'Wszystkie', onAction: () => navigate('/recipes?f=fav') }));
      kids.push(h('div', { class: 'rail zf-recipe-rail' }, favs.map((r) => recipeTile(r))));
    }

    c.replaceChildren(...kids);
  }

  paint();
  unsub = subscribe((t) => {
    if (t === 'recipes' || t === 'shopping' || t === 'settings' || t === 'categories' || t === 'hydrated') paint();
  });

  return { el: s.el, destroy: () => unsub && unsub() };
}
