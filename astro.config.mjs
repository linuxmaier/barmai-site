// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkBreaks from 'remark-breaks';

export default defineConfig({
  site: 'https://barmai.us',
  // Pages build to <path>/index.html; Caddy serves them as directories.
  build: { format: 'directory' },
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  // A line break in Markdown is a line break on the page, so poems and vows keep their lines.
  markdown: { processor: unified({ remarkPlugins: [remarkBreaks] }) },
});
