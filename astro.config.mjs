import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://reku.abxz.org',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: {
    // 「_」で始まるフォルダはアップロード時に除外されることがあるため、名前を変える
    assets: 'assets',
    // CSSをHTMLに埋め込み、CSSファイルの読み込み失敗で崩れないようにする
    inlineStylesheets: 'always',
  },
});
