/* ==========================================================================
   views-categories.js — osobny, wygodny ekran kategorii receptur.
   ========================================================================== */
import { h, icon, screen, iconBtn } from './ui.js';
import { navigate } from './router.js';
import { state, listRecipes, catIcon } from './recipes.js';

export function categoriesView() {
  const recipes = listRecipes();
  const count = (id) => recipes.filter((r) => r.category === id).length;
  const open = (query = '') => navigate('/recipes' + query);
  const tile = ({ id, name, emoji, subtitle, query, total, tone = '' }) =>
    h('button', {
      type: 'button',
      class: 'category-tile' + (tone ? ' ' + tone : ''),
      onClick: () => open(query),
      'aria-label': name + ', ' + total + ' receptur',
    },
      h('span', { class: 'category-tile-icon', 'aria-hidden': 'true' }, emoji),
      h('span', { class: 'category-tile-copy' },
        h('strong', null, name),
        h('small', null, subtitle || (total === 1 ? '1 receptura' : total + ' receptur'))),
      h('span', { class: 'category-tile-arrow', 'aria-hidden': 'true' }, icon('chevron-right', 19))
    );

  const s = screen({
    title: 'Kategorie',
    left: iconBtn('back', 'Wróć do receptur', () => navigate('/recipes')),
    cls: 'categories-screen',
  });
  const used = new Set(recipes.map((r) => r.category));
  const items = [
    tile({ id: 'all', name: 'Wszystkie', emoji: '📚', total: recipes.length, query: '', subtitle: 'Cała kolekcja' }),
    tile({ id: 'fav', name: 'Ulubione', emoji: '♥️', total: recipes.filter((r) => r.favorite).length, query: '?f=fav', subtitle: 'Zapisane na później', tone: 'category-tile-fav' }),
    tile({ id: 'recent', name: 'Ostatnie', emoji: '🕘', total: recipes.filter((r) => r.lastOpenedAt).length, query: '?f=recent', subtitle: 'Ostatnio otwierane' }),
    tile({ id: 'trad', name: 'Tradycyjne', emoji: '🏅', total: recipes.filter((r) => r.traditional).length, query: '?f=trad', subtitle: 'Klasyczne receptury', tone: 'category-tile-trad' }),
    ...state.categories
      .filter((c) => used.has(c.id) || c.id === 'cat-inne')
      .map((c) => tile({
        id: c.id, name: c.name, emoji: catIcon(c.id) || c.icon || '🍽️',
        total: count(c.id), query: '?cat=' + encodeURIComponent(c.id),
        subtitle: count(c.id) === 1 ? '1 receptura' : count(c.id) + ' receptur',
      })),
  ];
  const intro = h('div', { class: 'category-intro' },
    h('p', null, 'Wybierz kategorię, aby od razu przejść do jej receptur.'),
    h('span', null, recipes.length + (recipes.length === 1 ? ' receptura łącznie' : ' receptur łącznie')));
  const grid = h('div', { class: 'category-tile-grid', role: 'list', 'aria-label': 'Kategorie receptur' },
    items.map((item) => { item.setAttribute('role', 'listitem'); return item; }));
  s.content.replaceChildren(intro, grid);
  return { el: s.el };
}
