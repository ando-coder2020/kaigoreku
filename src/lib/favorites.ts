// お気に入り：ログインなし。この端末のブラウザだけに保存される
type Fav = { id: string; title: string };
const KEY = 'reku-favorites';
export function getFavorites(): Fav[] {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
}
function save(list: Fav[]) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch { /* 保存できない環境では何もしない */ }
}
export const isFavorite = (id: string) => getFavorites().some((f) => f.id === id);
export function toggleFavorite(item: Fav) {
  const list = getFavorites();
  save(isFavorite(item.id) ? list.filter((f) => f.id !== item.id) : [item, ...list]);
}
