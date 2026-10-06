/* ==========================================================================
   db.js — cienka warstwa nad IndexedDB.
   Magazyny: recipes, ingredients, categories, shoppingItems, settings, history.
   Każdy rekord ma stabilne ID (settings: klucz tekstowy).

   WAŻNE: baza ma własną, unikalną nazwę. GitHub Pages różnych repozytoriów
   tego samego konta współdzielą origin *.github.io, więc wspólna nazwa DB
   powodowałaby konflikt schematów między aplikacjami.
   ========================================================================== */

const DB_NAME = 'zaruok-app-db';
const DB_VERSION = 1;

export const STORES = {
  recipes: 'id',
  ingredients: 'id',
  categories: 'id',
  shoppingItems: 'id',
  settings: 'key',
  history: 'id',
};

let dbPromise = null;

export function openDB() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    if (!('indexedDB' in globalThis)) {
      return reject(new Error('Ta przeglądarka nie udostępnia IndexedDB.'));
    }

    const rq = indexedDB.open(DB_NAME, DB_VERSION);

    rq.onupgradeneeded = () => {
      const d = rq.result;
      for (const [name, keyPath] of Object.entries(STORES)) {
        if (!d.objectStoreNames.contains(name)) {
          const s = d.createObjectStore(name, { keyPath });
          if (name === 'history') s.createIndex('recipeId', 'recipeId');
        }
      }
    };

    rq.onsuccess = () => {
      const d = rq.result;
      d.onversionchange = () => {
        d.close();
        dbPromise = null;
      };
      d.onclose = () => {
        dbPromise = null;
      };
      resolve(d);
    };

    rq.onerror = () => {
      dbPromise = null;
      reject(rq.error || new Error('Nie udało się otworzyć IndexedDB.'));
    };

    rq.onblocked = () => {
      console.warn('Otwarcie IndexedDB zostało zablokowane przez inną kartę/aplikację.');
    };
  });
  return dbPromise;
}

const wrap = (rq) => new Promise((res, rej) => {
  rq.onsuccess = () => res(rq.result);
  rq.onerror = () => rej(rq.error);
});

const done = (t) => new Promise((res, rej) => {
  t.oncomplete = () => res();
  t.onerror = () => rej(t.error);
  t.onabort = () => rej(t.error || new Error('Transakcja przerwana'));
});

export const db = {
  async getAll(store) {
    const d = await openDB();
    return wrap(d.transaction(store).objectStore(store).getAll());
  },
  async get(store, key) {
    const d = await openDB();
    return wrap(d.transaction(store).objectStore(store).get(key));
  },
  async byIndex(store, index, key) {
    const d = await openDB();
    return wrap(d.transaction(store).objectStore(store).index(index).getAll(key));
  },
  async put(store, val) {
    const d = await openDB();
    const t = d.transaction(store, 'readwrite');
    t.objectStore(store).put(val);
    return done(t);
  },
  async putMany(store, vals) {
    const d = await openDB();
    const t = d.transaction(store, 'readwrite');
    const s = t.objectStore(store);
    vals.forEach((v) => s.put(v));
    return done(t);
  },
  async delete(store, key) {
    const d = await openDB();
    const t = d.transaction(store, 'readwrite');
    t.objectStore(store).delete(key);
    return done(t);
  },
  async clear(store) {
    const d = await openDB();
    const t = d.transaction(store, 'readwrite');
    t.objectStore(store).clear();
    return done(t);
  },

  async tx(stores, fn) {
    const d = await openDB();
    const t = d.transaction(stores, 'readwrite');
    fn({
      put: (s, v) => t.objectStore(s).put(v),
      delete: (s, k) => t.objectStore(s).delete(k),
      clear: (s) => t.objectStore(s).clear(),
    });
    return done(t);
  },
};

export const kv = {
  async get(key) { const r = await db.get('settings', key); return r ? r.value : undefined; },
  async set(key, value) { return db.put('settings', { key, value }); },
  async del(key) { return db.delete('settings', key); },
};
