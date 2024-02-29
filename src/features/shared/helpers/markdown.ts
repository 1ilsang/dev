import rehypeHighlight from 'rehype-highlight';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import { Handlers } from 'remark-html/lib';

const rehypeHandlers: Handlers = {
  // https://github.com/syntax-tree/mdast#nodes
  link(state, node) {
    return {
      type: 'element',
      tagName: 'a',
      properties: {
        target: '_blank',
        href: node.url,
        rel: 'noreferrer noopener',
      },
      children: state.all(node),
    };
  },
  image(state, node) {
    return {
      type: 'element',
      tagName: 'div',
      properties: {
        class: 'img-wrap',
      },
      children: [
        {
          type: 'element',
          tagName: 'img',
          properties: {
            src: node.url,
            alt: node.alt,
            class: node.title,
          },
          children: [],
        },
      ],
    };
  },
};

const markdownToHtml = async (mdText: string) => {
  const htmlText = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, {
      allowDangerousHtml: true,
      handlers: rehypeHandlers,
    })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .processSync(mdText);

  return htmlText.toString();
};

export default markdownToHtml;
