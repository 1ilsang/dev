import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import createMDX from '@next/mdx';

const __dirname = dirname(fileURLToPath(import.meta.url));
const remarkRehypeCustomPath = resolve(__dirname, 'remark-rehype-custom.mjs');

export const withMDX = createMDX({
  options: {
    remarkPlugins: [
      'remark-frontmatter',
      'remark-mdx-frontmatter',
      'remark-gfm',
      [remarkRehypeCustomPath, {}],
    ],
    rehypePlugins: [
      'rehype-slug',
      'rehype-autolink-headings',
      [
        'rehype-pretty-code',
        {
          theme: 'material-theme-palenight',
          keepBackground: false,
        },
      ],
    ],
    format: 'mdx',
  },
});
