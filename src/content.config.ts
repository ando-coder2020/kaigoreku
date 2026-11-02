import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// ファイル名だけをIDにする（フォルダを移動してもURLが変わらない）
const byFileName = ({ entry }: { entry: string }) =>
  entry.split('/').pop()!.replace(/\.mdx?$/, '');

// 入稿・確認の記録（全コレクション共通）
const editorial = {
  aiDraft: z.boolean().default(false),
  writer: z.string().describe('入稿者の社内コード（個人名は書かない）'),
  reviewer: z.string().optional().describe('承認者の社内コード'),
  checkedAt: z.coerce.date().optional(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  draft: z.boolean().default(true),
};

// 公開（draft: false）にするときの必須チェック
const requireReview = (needSources: boolean) => (d: any, ctx: z.RefinementCtx) => {
  if (d.draft) return;
  if (!d.reviewer) ctx.addIssue({ code: 'custom', path: ['reviewer'], message: '公開するには承認者（reviewer）が必要です' });
  if (!d.checkedAt) ctx.addIssue({ code: 'custom', path: ['checkedAt'], message: '公開するには確認日（checkedAt）が必要です' });
  if (needSources && (!d.sources || d.sources.length === 0))
    ctx.addIssue({ code: 'custom', path: ['sources'], message: '公開するには出典（sources）が1件以上必要です' });
};

const level = z.union([z.literal(1), z.literal(2), z.literal(3)]);

const reku = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reku', generateId: byFileName }),
  schema: z
    .object({
      title: z.string().max(40),
      description: z.string().max(80).describe('一覧に出る1行説明'),
      season: z.array(z.enum(['spring', 'summer', 'autumn', 'winter', 'all'])).min(1),
      months: z.array(z.number().int().min(1).max(12)).default([]),
      gyoji: z.array(z.string()).default([]),
      body: z.array(z.enum(['head', 'hand', 'foot', 'whole'])).min(1),
      load: z.object({ physical: level, facilitation: level, prep: level }),
      budget: z.enum(['0', '1000', '5000', '10000', 'over']),
      minutes: z.number().int().positive(),
      people: z.string().describe('例：5〜10人'),
      seated: z.boolean().default(false),
      keepsake: z.boolean().default(false),
      summary: z.array(z.string()).max(3).describe('「まずはここだけ」の3行'),
      materials: z.array(z.string()).default([]),
      steps: z.array(z.string()).min(1),
      script: z
        .object({ start: z.string(), middle: z.string().optional(), end: z.string() })
        .optional()
        .describe('そのまま読める進行台本'),
      safety: z.string().optional(),
      image: z.string().optional(),
      downloads: z
        .array(z.object({ label: z.string(), url: z.string(), format: z.string().default('PDF・A4') }))
        .default([]),
      sources: z.array(z.string().url()).default([]),
      ...editorial,
    })
    .superRefine(requireReview(false)),
});

const jidai = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/jidai', generateId: byFileName }),
  schema: z
    .object({
      title: z.string(),
      birthFrom: z.number().int(),
      birthTo: z.number().int(),
      summary: z.string(),
      topics: z.array(z.object({ label: z.string(), text: z.string() })).default([]),
      sources: z.array(z.string().url()).default([]),
      ...editorial,
    })
    .superRefine(requireReview(true)),
});

const rikai = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/rikai', generateId: byFileName }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      category: z.enum(['body', 'mind', 'communication']),
      expertChecked: z.boolean().default(false).describe('医療・介護の専門職が確認済みか'),
      sources: z.array(z.string().url()).default([]),
      ...editorial,
    })
    .superRefine(requireReview(true))
    .superRefine((d, ctx) => {
      if (!d.draft && !d.expertChecked)
        ctx.addIssue({ code: 'custom', path: ['expertChecked'], message: '公開するには専門職の確認が必要です' });
    }),
});

const nayami = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/nayami', generateId: byFileName }),
  schema: z
    .object({
      title: z.string().describe('相談の見出し'),
      category: z.enum(['mc', 'budget', 'participation', 'prep', 'other']),
      question: z.string().describe('相談本文（個人・施設が特定できる情報は削除済みであること）'),
      related: z.array(z.string()).default([]).describe('関連するレク記事のファイル名'),
      sources: z.array(z.string().url()).default([]),
      ...editorial,
    })
    .superRefine(requireReview(false)),
});

export const collections = { reku, jidai, rikai, nayami };
