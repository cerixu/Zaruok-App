/* ==========================================================================
   views-start.js — minimalistyczny ekran Start Żarłoka.
   Język wizualny: ekran receptury — duża forma, okrągłe elementy,
   cienkie separatory, minimalne akcje.
   ========================================================================== */
import { h, icon, screen, emptyState, button } from './ui.js';
import { navigate } from './router.js';
import { state, subscribe, listRecipes } from './recipes.js';
import { recipeTile, catTile, sectionHead } from './components.js';
import { openTimersSheet } from './timers.js';
import { pendingCount } from './shopping.js';
import { backupDue, daysSinceBackup } from './backup.js';

const plural = (n) => n + ' ' + (
  n === 1 ? 'receptura' :
  n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'receptury' : 'receptur'
);

const navItem = (label, ico, path, options) => {
  const opts = options || {};
  const badge = opts.badge || 0;
  const primary = !!opts.primary;
  return h('a', {
    class: 'start-nav-item' + (primary ? ' primary' : ''),
    href: '#' + path,
    onClick: (e) => { e.preventDefault(); navigate(path); },
    'aria-label': label,
  },
    h('span', { class: 'start-nav-icon' },
      icon(ico, 22),
      badge ? h('span', { class: 'start-nav-badge' }, badge > 99 ? '99+' : String(badge)) : null),
    h('span', { class: 'start-nav-label' }, label),
    h('span', { class: 'start-nav-arrow', 'aria-hidden': 'true' }, icon('right', 17))
  );
};

const toolItem = (label, ico, fn) =>
  h('button', { type: 'button', class: 'start-tool', onClick: fn, 'aria-label': label },
    h('span', { class: 'start-tool-icon' }, icon(ico, 20)),
    h('span', { class: 'start-tool-label' }, label));

export function startView() {
  const s = screen({ title: 'Żarłok', cls: 'start-minimal', large: 'hero' });
  const c = s.content;
  let unsub;

  function paint() {
    const all = listRecipes();
    const recent = all.filter((r) => r.lastOpenedAt).sort((a, b) => b.lastOpenedAt - a.lastOpenedAt).slice(0, 6);
    const favs = all.filter((r) => r.favorite).sort((a, b) => (b.favoritedAt || 0) - (a.favoritedAt || 0)).slice(0, 6);
    const n = pendingCount();

    const used = new Map();
    all.forEach((r) => used.set(r.category, (used.get(r.category) || 0) + 1));
    const cats = state.categories.filter((cat) => used.has(cat.id)).slice(0, 6);

    const kids = [
      h('div', { class: 'start-intro' },
        h('span', { class: 'start-eyebrow' }, 'NOTATNIK KUCHARZA'),
        h('h1', { class: 'start-title' }, 'Żarłok'),
        h('p', { class: 'start-sub' }, plural(all.length) + ' · prywatnie na tym telefonie')),

      h('div', { class: 'start-orb-hero' },
        h('div', { class: 'start-orb-ring' },
          h('div', { class: 'start-orb-core' }, icon('chef', 38))),
        h('div', { class: 'start-orb-copy' },
          h('strong', null, 'Gotowy do gotowania?'),
          h('span', { class: 'muted' }, 'Wybierz recepturę albo zacznij od zera.'))),

      h('div', { class: 'start-nav' },
        navItem('Receptury', 'book', '/recipes', { primary: true }),
        navItem('Nowa receptura', 'plus', '/new'),
        navItem('Kalkulatory', 'calc', '/calc'),
        navItem('Zakupy', 'cart', '/shopping', { badge: n }),
        navItem('Ulubione', 'heart', '/recipes?f=fav'),
        navItem('Ostatnio używane', 'clock', '/recipes?f=recent')
      ),

      h('div', { class: 'start-tools-head' },
        h('span', { class: 'start-section-label' }, 'Szybko'),
        h('button', { type: 'button', class: 'start-section-link', onClick: () => navigate('/calc') },
          'Wszystkie', icon('right', 15))),

      h('div', { class: 'start-tools' },
        toolItem('Minutnik', 'timer', openTimersSheet),
        toolItem('Przelicznik', 'scale', () => navigate('/calc/units')),
        toolItem('Temperatury', 'thermo', () => navigate('/calc/doneness')),
        toolItem('Zamienniki', 'swap', () => navigate('/calc/subs')),
        toolItem('Lodówka', 'fridge', () => navigate('/calc/pantry')),
        toolItem('Losuj', 'shuffle', () => navigate('/calc/random')),
        toolItem('Importuj', 'upload', () => navigate('/import')),
        toolItem('Szukaj', 'globe', () => navigate('/search'))
      )
    ];

    if (backupDue()) {
      const d = daysSinceBackup();
      kids.push(h('button', { type: 'button', class: 'start-backup', onClick: () => navigate('/settings') },
        icon('download', 19),
        h('span', null, d == null ? 'Zrób pierwszą kopię' : 'Kopia starsza o ' + d + ' dni'),
        icon('right', 16)));
    }

    if (!all.length) {
      kids.push(emptyState('📒', 'Pusto w książce', 'Dodaj pierwszą recepturę albo wklej przepis z internetu.',
        button('Nowa receptura', { kind: 'primary', icon: 'plus', onClick: () => navigate('/new') }),
        button('Importuj', { icon: 'upload', onClick: () => navigate('/import') })));
    } else {
      const day = Math.floor(Date.now() / 86400000);
      const inspire = all.filter((r) => !r.lastOpenedAt)
        .map((r, i) => ({ r: r, k: (i * 7919 + day * 104729) % 1009 }))
        .sort((a, b) => a.k - b.k)
        .slice(0, 8)
        .map((x) => x.r);

      kids.push(sectionHead('Polecane na dziś', inspire.length ? {
        action: 'Losuj',
        onAction: () => navigate('/calc/random')
      } : {}));

      kids.push(inspire.length
        ? h('div', { class: 'rail big' }, inspire.map((r) => recipeTile(r)))
        : h('p', { class: 'muted pad' }, 'Otwórz kilka receptur, a pojawią się tu pomysły.'));

      if (cats.length) {
        kids.push(sectionHead('Kategorie', { action: 'Wszystkie', onAction: () => navigate('/recipes') }));
        kids.push(h('div', { class: 'rail cats' },
          cats.map((cat) => catTile(cat, used.get(cat.id), () =>
            navigate('/recipes?cat=' + encodeURIComponent(cat.id)))));
      }

      if (recent.length) {
        kids.push(sectionHead('Ostatnio używane', { action: 'Wszystkie', onAction: () => navigate('/recipes?f=recent') }));
        kids.push(h('div', { class: 'rail' }, recent.map((r) => recipeTile(r))));
      }

      if (favs.length) {
        kids.push(sectionHead('Ulubione', { action: 'Wszystkie', onAction: () => navigate('/recipes?f=fav') }));
        kids.push(h('div', { class: 'rail' }, favs.map((r) => recipeTile(r))));
      }
    }

    c.replaceChildren(...kids);
  }

  paint();
  unsub = subscribe((t) => {
    if (t === 'recipes' || t === 'shopping' || t === 'settings' || t === 'categories') paint();
  });
  return { el: s.el, destroy: () => unsub && unsub() };
}
