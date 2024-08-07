import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import { type Handlers } from 'remark-html/lib';

// https://github.com/syntax-tree/mdast-util-to-hast?tab=readme-ov-file#example-supporting-custom-nodes
const rehypeHandlers: Handlers = {
  // https://github.com/syntax-tree/mdast#nodes
  link(state, node) {
    return {
      type: 'element',
      tagName: 'a',
      properties: {
        class: 'underline-highlight-fade',
        target: '_blank',
        href: node.url,
        rel: 'noreferrer noopener',
      },
      children: state.all(node),
    };
  },
  image(state, node) {
    const className = (() => {
      let name = 'img-wrap';
      if (node.title) {
        name += ` ${node.title}`;
      }
      return name;
    })();

    return {
      type: 'element',
      tagName: 'div',
      properties: {
        class: 'img-container',
      },
      children: [
        {
          type: 'element',
          tagName: 'div',
          properties: {
            class: className,
          },
          children: [
            {
              type: 'element',
              tagName: 'img',
              properties: {
                src: node.url,
                alt: node.alt,
              },
              children: [],
            },
          ],
        },
      ],
    };
  },
};

const markdownToHtml = async (mdText: string) => {
  const htmlText = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, {
      allowDangerousHtml: true,
      handlers: rehypeHandlers,
    })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      headingProperties: { 'data-heading': 'true' },
      properties: { 'data-heading': 'true' },
    })
    .use(rehypePrettyCode, {
      theme: 'material-theme-palenight',
      keepBackground: false,
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(mdText);

  return htmlText.toString();
};

export default markdownToHtml;
