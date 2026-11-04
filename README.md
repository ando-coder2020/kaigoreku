# 介護レク図鑑（reku.abxz.org）

きょうの笑顔が、だれかの思い出になる。
壁面飾りをモチーフにした、介護レクの記事サイトのひな形です。

## しくみ

| 部分 | 使っているもの | 役割 |
|---|---|---|
| サイト本体 | Astro 7（静的サイト） | 記事ファイルから全ページを自動で作る |
| サイト内検索 | Pagefind | サーバーなしで、季節・負担・予算などで絞り込み検索 |
| 入稿画面 | Sveltia CMS（`/admin/`） | 非エンジニアがブラウザで記事を書く |
| 公開先 | Cloudflare（Workers または Pages） | GitHubに保存されると自動で公開 |

## フォルダ

```
src/content/reku/atama|te|ashi|zenshin/  レク記事（主な目的ごとに分けて保存）
src/content/jidai/    年代別の時代背景
src/content/rikai/    高齢者を理解する
src/content/nayami/   悩み広場（Q&A）
src/content.config.ts 記事の入力項目と「公開時の必須チェック」
src/lib/taxonomy.ts   季節・目的・予算・状況ボタンの定義
src/lib/walls.ts      季節の壁面の色と題
public/admin/         入稿画面の設定
```

記事のURLはファイル名で決まります（`ochiba-wreath.md` → `/reku/ochiba-wreath/`）。
フォルダを移してもURLは変わりません。**同じファイル名を別フォルダに作らないでください。**

## 自動で作られるページ

記事を1本追加すると、以下に自動で並びます。手作業の整理は不要です。

- 季節別 `/season/autumn/`、目的別 `/purpose/hand/`、予算別 `/budget/free/`
- 状況別 `/situation/quick/` など（「準備なしで今すぐ」「司会が苦手」「10〜15分」「座ったまま」）
  - 振り分け条件は `src/lib/taxonomy.ts` の `SITUATIONS`
- 形に残るレク `/omoide/`、塗り絵・素材 `/download/`
- 今月のおすすめ（トップ）、似ているレク（記事下）

## 公開のルール（ビルド時に自動チェック）

| 記事の種類 | 公開（`draft: false`）に必要なもの |
|---|---|
| レク・悩み広場 | 承認者コード・確認日 |
| 年代別 | 承認者コード・確認日・出典URL |
| 高齢者を理解する | 上記＋専門職の確認済みチェック |

足りないまま公開しようとすると、ビルドがエラーで止まり、サイトには出ません。

## 手元で動かす

```bash
npm install
npm run dev      # http://localhost:4321 （下書きも表示される）
npm run build    # 本番用に組み立て＋検索索引の作成（dist/）
npm run preview  # 組み立てた結果を確認（検索もここで動く）
```

## 公開までの手順（初回のみ）

1. GitHubに非公開リポジトリを作り、このフォルダを登録する
2. Cloudflareでリポジトリを接続し、ビルドコマンド `npm run build`、出力先 `dist` を設定
3. `reku.abxz.org` をカスタムドメインとして割り当て
4. 入稿画面のログイン用に、GitHub OAuthアプリと認証用Worker（Sveltia CMS Authenticator）を用意し、
   `public/admin/config.yml` の `repo` と `base_url` を書き換える
5. 入稿者・承認者をGitHubリポジトリのメンバーに追加する

## 定期的にやること

- **毎月1日に再ビルド**：「今月のおすすめ」はビルドした月で決まるため。
  Cloudflareのデプロイフック（URL）を、Cron（定期実行）から毎月呼び出す設定にしておく。
  トップの壁面の色だけは、閲覧日に合わせてブラウザ側で切り替わります。
- **年1回以上ビルド**：年代ページの「いま◯代」はビルドした年で計算するため（毎月の再ビルドで満たせます）。

## 未確定・要確認

- 画像・PDFは記事が増えるとファイル数の上限に近づくため、Cloudflare R2（例：`files.abxz.org`）に置く想定。
  記事の `downloads.url` に R2 のURLを入れる。
- 悩み広場の投稿フォームURL（`src/pages/nayami/index.astro` の `FORM_URL`）は未設定。
- 入稿画面（Sveltia CMS）の設定は、実際のリポジトリ接続後に動作確認が必要。
- 練習サイトのため `noindex` と `robots.txt` で検索エンジンを拒否している。本番公開時に見直す。
- サンプル記事（`reviewer: sample`）は公開前に削除する。
