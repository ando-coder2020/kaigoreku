import { getCollection, type CollectionEntry } from 'astro:content';

export type Reku = CollectionEntry<'reku'>;

export const SEASONS = {
  spring: { label: '春', bg: '#F7D9DB', fg: '#6E2A30' },
  summer: { label: '夏', bg: '#D6E8DB', fg: '#23472E' },
  autumn: { label: '秋', bg: '#F3D6C4', fg: '#6A2F14' },
  winter: { label: '冬', bg: '#D3E0EE', fg: '#1F3D5E' },
  all: { label: '通年', bg: '#F5E7BE', fg: '#5A4510' },
} as const;
export type SeasonKey = keyof typeof SEASONS;

export const BODY = { head: '頭', hand: '手先', foot: '足', whole: '全身' } as const;
export type BodyKey = keyof typeof BODY;

export const BUDGET = {
  '0': '0円',
  '1000': '〜1千円',
  '5000': '〜5千円',
  '10000': '〜1万円',
  over: '1万円〜',
} as const;
export type BudgetKey = keyof typeof BUDGET;
// URLに使う英字（/budget/yen0/ など）
export const BUDGET_SLUG: Record<BudgetKey, string> = {
  '0': 'free', '1000': 'under-1000', '5000': 'under-5000', '10000': 'under-10000', over: 'over-10000',
};

export const LOAD_LABEL = { physical: '体力', facilitation: '司会', prep: '準備' } as const;
export const LEVEL_WORD = { 1: '軽い', 2: 'ふつう', 3: 'しっかり' } as const;
export const levelDots = (n: number) => '●'.repeat(n) + '○'.repeat(3 - n);

export const NAYAMI_CATEGORY = {
  mc: '司会・進行', budget: '予算', participation: '参加・声かけ', prep: '準備', other: 'その他',
} as const;

export const RIKAI_CATEGORY = {
  body: '体の変化', mind: '心の変化', communication: '伝え方・聞き方',
} as const;

// 「きょうは、どんな日ですか？」の状況ボタン。記事の項目から自動で振り分ける
export const SITUATIONS = {
  quick: {
    label: '準備なしで、今すぐ', short: '準備なしで今すぐ', note: '道具いらず・そのまま始められる',
    test: (r: Reku) => r.data.load.prep === 1 && r.data.budget === '0',
  },
  'easy-mc': {
    label: '司会が苦手でも大丈夫', short: '司会が苦手', note: '読み上げるだけの進行台本つき',
    test: (r: Reku) => Boolean(r.data.script) && r.data.load.facilitation <= 2,
  },
  short: {
    label: '10〜15分のすきま時間', short: '10〜15分だけ', note: '食事前・送迎待ちに',
    test: (r: Reku) => r.data.minutes <= 15,
  },
  seated: {
    label: '座ったまま・車いすでも', short: '座ったまま', note: '立ち上がらずに全員参加',
    test: (r: Reku) => r.data.seated,
  },
} as const;
export type SituationKey = keyof typeof SITUATIONS;
export const situationsOf = (r: Reku) =>
  (Object.keys(SITUATIONS) as SituationKey[]).filter((k) => SITUATIONS[k].test(r));

// 公開済みだけを新しい順に（npm run dev のときは下書きも表示）
const isVisible = ({ data }: { data: { draft: boolean } }) => import.meta.env.DEV || !data.draft;
const byNewest = (a: any, b: any) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime();

export async function getPublishedReku() {
  return (await getCollection('reku', isVisible)).sort(byNewest);
}
export async function getPublishedJidai() {
  return (await getCollection('jidai', isVisible)).sort((a, b) => b.data.birthFrom - a.data.birthFrom);
}
export async function getPublishedRikai() {
  return (await getCollection('rikai', isVisible)).sort(byNewest);
}
export async function getPublishedNayami() {
  return (await getCollection('nayami', isVisible)).sort(byNewest);
}

export const monthToSeason = (m: number): Exclude<SeasonKey, 'all'> =>
  m >= 3 && m <= 5 ? 'spring' : m >= 6 && m <= 8 ? 'summer' : m >= 9 && m <= 11 ? 'autumn' : 'winter';

// 今月のおすすめ：月指定が合う → 同じ季節 → 通年 の順
export function pickForMonth(list: Reku[], month: number, n = 6) {
  const season = monthToSeason(month);
  const score = (r: Reku) =>
    (r.data.months.includes(month) ? 3 : 0) +
    (r.data.season.includes(season) ? 2 : 0) +
    (r.data.season.includes('all') ? 1 : 0);
  return list.filter((r) => score(r) > 0).sort((a, b) => score(b) - score(a)).slice(0, n);
}

// 生まれ年 → 今の年齢層（ビルドした年で計算するため、年1回以上ビルドが必要）
export function ageLabel(birthFrom: number, birthTo: number, year = new Date().getFullYear()) {
  const young = year - birthTo;
  const old = year - birthFrom;
  const d1 = Math.floor(young / 10) * 10;
  const d2 = Math.floor(old / 10) * 10;
  return d1 === d2 ? `いま ${d1}代` : `いま ${young}〜${old}歳`;
}
