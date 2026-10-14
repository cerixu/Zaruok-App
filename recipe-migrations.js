/* ==========================================================================
   recipe-migrations.js — bezpieczne migracje danych seedowanych.
   Zmienia wyłącznie pola dokładnie zgodne ze starym przykładem.
   Własne nazwy, opisy, składniki i notatki użytkownika zostają bez zmian.
   ========================================================================== */

const LEGACY_SEED_NAMES = new Map([
  ['rcp_seed_fish_and_chips', 'Fish and chips'],
  ['rcp_seed_pulled_pork', 'Pulled pork'],
  ['rcp_seed_shepherd_s_pie', "Shepherd's pie"],
]);

const LEGACY_FRIED_RICE_DESCRIPTION = 'Wok-fried rice z warzywami i jajkiem.';

export function migrateSeedRecipe(current, seed) {
  if (!current || !seed || current.id !== seed.id) return null;

  let next = null;
  const oldName = LEGACY_SEED_NAMES.get(seed.id);
  if (oldName && current.name === oldName && seed.name !== oldName) {
    next = { ...current, name: seed.name };
  }

  if (
    seed.name === 'Smażony ryż z jajkiem' &&
    current.description === LEGACY_FRIED_RICE_DESCRIPTION &&
    seed.description !== LEGACY_FRIED_RICE_DESCRIPTION
  ) {
    next = { ...(next || current), description: seed.description };
  }

  if (!next) return null;
  next.updatedAt = Date.now();
  return next;
}
