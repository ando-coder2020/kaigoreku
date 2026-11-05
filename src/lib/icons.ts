// 記事のサンプル画像・トップの壁面に使う「切り絵」アイコン（100×100 の座標で描く）
// c = 主な色、d = 濃い色（線・目など）
export const ICONS = [
  'leaf', 'kaki', 'sakura', 'flower', 'paper', 'scissors', 'chat', 'asagao', 'lantern', 'fish',
  'ball', 'sun', 'star', 'note', 'moon', 'pumpkin', 'face', 'brush', 'dice', 'snow', 'snowman',
  'heart', 'tree', 'balloon', 'foot', 'plane', 'pencil', 'cards', 'hand', 'bell', 'book', 'person',
] as const;
export type IconName = (typeof ICONS)[number];

export function iconSvg(name: string, c: string, d = '#2B2622'): string {
  switch (name) {
    case 'leaf':
      return `<polygon points="50,8 58,30 76,20 70,42 92,44 73,56 82,74 60,66 55,88 50,70 45,88 40,66 18,74 27,56 8,44 30,42 24,20 42,30" fill="${c}"/><line x1="50" y1="70" x2="50" y2="96" stroke="${d}" stroke-width="4" stroke-linecap="round"/>`;
    case 'kaki':
      return `<circle cx="50" cy="58" r="34" fill="${c}"/><path d="M50 26 L38 18 L44 30 L30 30 L42 36 L50 30 L58 36 L70 30 L56 30 L62 18 Z" fill="#5E9E73"/><rect x="47" y="12" width="6" height="12" rx="2" fill="${d}"/>`;
    case 'sakura': {
      const petals = [0, 72, 144, 216, 288]
        .map((a) => `<ellipse cx="50" cy="28" rx="15" ry="22" fill="${c}" transform="rotate(${a} 50 50)"/>`)
        .join('');
      return `${petals}<circle cx="50" cy="50" r="9" fill="#F4C9CC"/><circle cx="50" cy="50" r="4" fill="${d}" opacity=".5"/>`;
    }
    case 'flower':
      return `<path d="M30 30 Q30 62 50 62 Q70 62 70 30 L60 40 L50 26 L40 40 Z" fill="${c}"/><rect x="47" y="60" width="6" height="34" fill="#5E9E73"/><path d="M50 80 Q30 76 26 62 Q42 64 50 76 Z" fill="#5E9E73"/>`;
    case 'paper':
      return `<polygon points="50,10 90,50 50,90 10,50" fill="${c}"/><polygon points="50,10 90,50 50,50" fill="#FFFFFF" opacity=".35"/><polygon points="10,50 50,50 50,90" fill="${d}" opacity=".12"/>`;
    case 'scissors':
      return `<circle cx="30" cy="72" r="13" fill="none" stroke="${c}" stroke-width="7"/><circle cx="70" cy="72" r="13" fill="none" stroke="${c}" stroke-width="7"/><line x1="38" y1="62" x2="72" y2="12" stroke="${d}" stroke-width="7" stroke-linecap="round"/><line x1="62" y1="62" x2="28" y2="12" stroke="${d}" stroke-width="7" stroke-linecap="round"/>`;
    case 'chat':
      return `<rect x="8" y="16" width="84" height="56" rx="16" fill="${c}"/><polygon points="26,70 22,90 44,70" fill="${c}"/><circle cx="32" cy="44" r="6" fill="#FFFDF8"/><circle cx="50" cy="44" r="6" fill="#FFFDF8"/><circle cx="68" cy="44" r="6" fill="#FFFDF8"/>`;
    case 'asagao':
      return `<circle cx="50" cy="48" r="36" fill="${c}"/><circle cx="50" cy="48" r="12" fill="#FFFDF8"/>${[0, 72, 144, 216, 288].map((a) => `<line x1="50" y1="36" x2="50" y2="14" stroke="#FFFDF8" stroke-width="3" transform="rotate(${a} 50 48)"/>`).join('')}<path d="M70 82 Q86 70 94 84 Q80 94 70 82 Z" fill="#5E9E73"/>`;
    case 'lantern':
      return `<rect x="36" y="8" width="28" height="10" rx="3" fill="${d}"/><ellipse cx="50" cy="52" rx="32" ry="36" fill="${c}"/>${[30, 42, 54, 66, 78].map((y) => `<line x1="22" y1="${y}" x2="78" y2="${y}" stroke="${d}" stroke-width="2" opacity=".35"/>`).join('')}<rect x="36" y="84" width="28" height="10" rx="3" fill="${d}"/>`;
    case 'fish':
      return `<ellipse cx="44" cy="52" rx="32" ry="22" fill="${c}"/><polygon points="72,52 96,30 92,52 96,74" fill="${c}"/><circle cx="28" cy="46" r="5" fill="#FFFDF8"/><circle cx="28" cy="46" r="2.5" fill="${d}"/>`;
    case 'ball':
      return `<circle cx="50" cy="50" r="40" fill="${c}"/><path d="M14 36 Q50 56 86 36" fill="none" stroke="#FFFDF8" stroke-width="7"/><path d="M14 64 Q50 84 86 64" fill="none" stroke="#FFFDF8" stroke-width="7" opacity=".7"/>`;
    case 'sun':
      return `${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<rect x="47" y="4" width="6" height="16" rx="3" fill="${c}" transform="rotate(${a} 50 50)"/>`).join('')}<circle cx="50" cy="50" r="24" fill="${c}"/>`;
    case 'star':
      return `<polygon points="50,6 62,38 96,38 68,58 79,92 50,72 21,92 32,58 4,38 38,38" fill="${c}"/>`;
    case 'note':
      return `<ellipse cx="34" cy="76" rx="16" ry="12" fill="${c}"/><rect x="44" y="12" width="7" height="64" fill="${c}"/><path d="M51 12 Q80 22 74 46 Q70 30 51 30 Z" fill="${c}"/>`;
    case 'moon':
      return `<circle cx="50" cy="50" r="40" fill="${c}"/><circle cx="36" cy="40" r="7" fill="${d}" opacity=".08"/><circle cx="60" cy="62" r="10" fill="${d}" opacity=".08"/><circle cx="62" cy="34" r="5" fill="${d}" opacity=".08"/>`;
    case 'pumpkin':
      return `<ellipse cx="34" cy="58" rx="22" ry="30" fill="${c}"/><ellipse cx="66" cy="58" rx="22" ry="30" fill="${c}"/><ellipse cx="50" cy="58" rx="20" ry="32" fill="${c}" stroke="${d}" stroke-opacity=".2" stroke-width="2"/><rect x="46" y="18" width="8" height="14" rx="2" fill="#5E9E73"/>`;
    case 'face':
      return `<circle cx="50" cy="54" r="38" fill="${c}"/><polygon points="26,26 32,4 42,22" fill="#E6C15A"/><polygon points="74,26 68,4 58,22" fill="#E6C15A"/><circle cx="36" cy="48" r="5" fill="${d}"/><circle cx="64" cy="48" r="5" fill="${d}"/><path d="M34 70 Q50 80 66 70" fill="none" stroke="${d}" stroke-width="4" stroke-linecap="round"/>`;
    case 'brush':
      return `<rect x="44" y="6" width="12" height="56" rx="3" fill="${d}"/><rect x="42" y="58" width="16" height="8" fill="#E6C15A"/><path d="M42 66 L58 66 Q58 86 50 96 Q42 86 42 66 Z" fill="${c}"/>`;
    case 'dice':
      return `<rect x="14" y="14" width="72" height="72" rx="14" fill="${c}"/>${[[32, 32], [68, 32], [50, 50], [32, 68], [68, 68]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#FFFDF8"/>`).join('')}`;
    case 'snow':
      return `${[0, 60, 120].map((a) => `<g transform="rotate(${a} 50 50)"><line x1="50" y1="8" x2="50" y2="92" stroke="${c}" stroke-width="7" stroke-linecap="round"/><line x1="50" y1="22" x2="40" y2="12" stroke="${c}" stroke-width="5" stroke-linecap="round"/><line x1="50" y1="22" x2="60" y2="12" stroke="${c}" stroke-width="5" stroke-linecap="round"/><line x1="50" y1="78" x2="40" y2="88" stroke="${c}" stroke-width="5" stroke-linecap="round"/><line x1="50" y1="78" x2="60" y2="88" stroke="${c}" stroke-width="5" stroke-linecap="round"/></g>`).join('')}`;
    case 'snowman':
      return `<circle cx="50" cy="68" r="26" fill="#FFFDF8" stroke="${c}" stroke-width="3"/><circle cx="50" cy="32" r="18" fill="#FFFDF8" stroke="${c}" stroke-width="3"/><rect x="36" y="6" width="28" height="12" rx="2" fill="${c}"/><circle cx="44" cy="30" r="2.5" fill="${d}"/><circle cx="56" cy="30" r="2.5" fill="${d}"/><polygon points="50,34 62,37 50,39" fill="#D2703A"/>`;
    case 'heart':
      return `<path d="M50 88 L14 50 A20 20 0 0 1 50 22 A20 20 0 0 1 86 50 Z" fill="${c}"/>`;
    case 'tree':
      return `<polygon points="50,6 80,42 64,42 88,72 12,72 36,42 20,42" fill="${c}"/><rect x="43" y="72" width="14" height="20" fill="${d}" opacity=".6"/><circle cx="50" cy="8" r="6" fill="#E6C15A"/>`;
    case 'balloon':
      return `<ellipse cx="50" cy="40" rx="30" ry="34" fill="${c}"/><polygon points="46,74 54,74 50,80" fill="${c}"/><path d="M50 80 Q42 88 50 96" fill="none" stroke="${d}" stroke-width="2"/><ellipse cx="40" cy="28" rx="6" ry="10" fill="#FFFDF8" opacity=".5"/>`;
    case 'foot':
      return `<ellipse cx="50" cy="64" rx="22" ry="30" fill="${c}"/>${[[30, 26, 7], [42, 20, 7], [55, 20, 7], [67, 25, 6], [76, 34, 5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`).join('')}`;
    case 'plane':
      return `<polygon points="6,46 94,14 60,90 48,58" fill="${c}"/><polygon points="48,58 94,14 40,72" fill="${d}" opacity=".15"/>`;
    case 'pencil':
      return `<g transform="rotate(45 50 50)"><rect x="40" y="2" width="20" height="66" fill="${c}"/><rect x="40" y="2" width="20" height="10" fill="#E8A3A8"/><polygon points="40,68 60,68 50,94" fill="#F5E7BE"/><polygon points="46,84 54,84 50,94" fill="${d}"/></g>`;
    case 'cards':
      return `<rect x="12" y="20" width="44" height="62" rx="6" fill="${c}" transform="rotate(-10 34 51)"/><rect x="44" y="18" width="44" height="62" rx="6" fill="#FFFDF8" stroke="${c}" stroke-width="4" transform="rotate(8 66 49)"/><circle cx="66" cy="49" r="8" fill="${c}"/>`;
    case 'hand':
      return `<rect x="26" y="44" width="48" height="46" rx="18" fill="${c}"/>${[[28, 18], [40, 10], [52, 10], [64, 16]].map(([x, y]) => `<rect x="${x}" y="${y}" width="10" height="44" rx="5" fill="${c}"/>`).join('')}<rect x="66" y="50" width="26" height="10" rx="5" fill="${c}" transform="rotate(-35 66 55)"/>`;
    case 'bell':
      return `<path d="M50 12 Q76 14 76 46 L76 66 L86 78 L14 78 L24 66 L24 46 Q24 14 50 12 Z" fill="${c}"/><circle cx="50" cy="86" r="8" fill="${d}" opacity=".7"/><rect x="46" y="4" width="8" height="10" rx="3" fill="${d}" opacity=".7"/>`;
    case 'book':
      return `<rect x="12" y="14" width="76" height="72" rx="4" fill="#FFFDF8" stroke="${c}" stroke-width="5"/><rect x="20" y="22" width="60" height="14" fill="${c}"/>${[46, 56, 66, 76].map((y) => `<line x1="20" y1="${y}" x2="80" y2="${y}" stroke="${d}" stroke-width="3" opacity=".3"/>`).join('')}`;
    case 'person':
      return `<circle cx="50" cy="24" r="14" fill="${c}"/><path d="M24 92 Q24 46 50 46 Q76 46 76 92 Z" fill="${c}"/><rect x="10" y="50" width="80" height="9" rx="4.5" fill="#E6C15A" transform="rotate(-8 50 54)"/>`;
    default:
      return `<circle cx="50" cy="50" r="36" fill="${c}"/>`;
  }
}

// アイコンごとの基本の色（色紙の色）
export const ICON_COLOR: Record<string, string> = {
  leaf: '#D2703A', kaki: '#E58A3A', sakura: '#E8A3A8', flower: '#D9556B', paper: '#4C7FB0', scissors: '#8A3F1F',
  chat: '#5E9E73', asagao: '#6C6FC4', lantern: '#D9556B', fish: '#D94F3D', ball: '#D2703A', sun: '#E6B23A',
  star: '#E6B23A', note: '#4C7FB0', moon: '#E6C15A', pumpkin: '#E58A3A', face: '#D94F3D', brush: '#2B2622',
  dice: '#4C7FB0', snow: '#7FA8CF', snowman: '#7FA8CF', heart: '#D9556B', tree: '#5E9E73', balloon: '#D9556B',
  foot: '#C9A27A', plane: '#4C7FB0', pencil: '#E6B23A', cards: '#D94F3D', hand: '#E3B38F', bell: '#E6B23A',
  book: '#5E9E73', person: '#5E9E73',
};

export const SEASON_TINT: Record<string, string> = {
  spring: '#F7D9DB', summer: '#D6E8DB', autumn: '#F3D6C4', winter: '#D3E0EE', all: '#F5E7BE',
};
