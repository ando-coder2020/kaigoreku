// 季節の壁面。トップに「壁に貼った切り絵」として表示する
// [アイコン, x, y, 大きさ(%), 傾き(度), 色]
export type WallItem = [string, number, number, number, number, string];
export const WALLS: Record<string, { label: string; items: WallItem[]; flags: string[] }> = {
  spring: {
    label: '春の壁面：桜とチューリップ',
    flags: ['#E8A3A8', '#F5E7BE', '#D6E8DB'],
    items: [
      ['sakura', 40, 90, 105, -8, '#E8A3A8'], ['sakura', 200, 80, 95, 12, '#F0B8BC'], ['sakura', 370, 95, 105, -4, '#E8A3A8'],
      ['flower', 230, 225, 95, 6, '#D9556B'], ['flower', 360, 230, 90, -6, '#E6B23A'], ['sun', 480, 215, 95, 10, '#E6B23A'],
    ],
  },
  summer: {
    label: '夏の壁面：朝顔と金魚',
    flags: ['#4C7FB0', '#D6E8DB', '#F5E7BE'],
    items: [
      ['asagao', 40, 90, 105, -6, '#6C6FC4'], ['asagao', 200, 80, 95, 10, '#4C7FB0'], ['fish', 370, 95, 105, -4, '#D94F3D'],
      ['fish', 230, 225, 95, 8, '#E58A3A'], ['star', 360, 230, 90, -10, '#E6B23A'], ['lantern', 480, 215, 95, 4, '#D9556B'],
    ],
  },
  autumn: {
    label: '秋の壁面：紅葉と柿',
    flags: ['#D2703A', '#E6C15A', '#9C4A26'],
    items: [
      ['leaf', 40, 90, 105, -10, '#D2703A'], ['leaf', 200, 80, 95, 14, '#E6B23A'], ['kaki', 370, 95, 105, -4, '#E58A3A'],
      ['leaf', 230, 225, 95, 20, '#9C4A26'], ['moon', 360, 230, 90, -8, '#E6C15A'], ['pumpkin', 480, 215, 95, 6, '#E58A3A'],
    ],
  },
  winter: {
    label: '冬の壁面：雪だるまと雪の結晶',
    flags: ['#4C7FB0', '#FFFDF8', '#D9556B'],
    items: [
      ['snow', 40, 90, 105, -6, '#7FA8CF'], ['snowman', 200, 80, 95, 6, '#4C7FB0'], ['tree', 370, 95, 105, -4, '#5E9E73'],
      ['snow', 230, 225, 95, 18, '#4C7FB0'], ['heart', 360, 230, 90, -10, '#D9556B'], ['bell', 480, 215, 95, 8, '#E6B23A'],
    ],
  },
};
