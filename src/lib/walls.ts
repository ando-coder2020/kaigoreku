// 季節の壁面。色は色紙、label は壁面の題。トップの壁面は閲覧日の月で切り替わる
export const WALLS = {
  spring: { c1: '#E8A3A8', c2: '#F4C9CC', c3: '#5E9E73', label: '春の壁面：桜と菜の花' },
  summer: { c1: '#5E9E73', c2: '#4C7FB0', c3: '#E6C15A', label: '夏の壁面：朝顔と花火' },
  autumn: { c1: '#D2703A', c2: '#E6C15A', c3: '#9C4A26', label: '秋の壁面：紅葉と焼き芋' },
  winter: { c1: '#4C7FB0', c2: '#DCE6EF', c3: '#E8A3A8', label: '冬の壁面：雪だるまと椿' },
} as const;
