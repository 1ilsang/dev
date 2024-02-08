import rehypeHighlight from 'rehype-highlight';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const markdownToHtml = async (mdText: string) => {
  const htmlText = unified()
    .use(remarkParse)
    .use(remarkRehype, {
      allowDangerousHtml: true,
      handlers: {
        // https://github.com/syntax-tree/mdast#nodes
        link(h, node, parent) {
          const parsedNode = h(
            node,
            'a',
            { target: '_blank', href: node.url, rel: 'noreferrer noopener' },
            node.children,
          );
          return parsedNode;
        },
        image(h, node, parent) {
          const className = (() => {
            switch (node.title) {
              case 'l':
                return `large`;
              case 's':
                return `small`;
              case 'cover':
                return 'cover';
              default:
                return undefined;
            }
          })();
          const parsedNode = h(
            node,
            'div',
            {
              class: 'img-wrap',
            },
            [
              {
                type: 'element',
                tagName: 'img',
                properties: {
                  src: node.url,
                  alt: node.alt,
                  class: className,
                },
                children: [],
              },
            ],
          );
          return parsedNode;
        },
      },
    })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .processSync(mdText);
  return htmlText.toString();
};

export default markdownToHtml;
