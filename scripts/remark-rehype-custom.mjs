import { visit } from 'unist-util-visit';
import { valueToEstree } from 'estree-util-value-to-estree';
import GithubSlugger from 'github-slugger';

const setNodeEmptyProperties = (node) => {
  if (!node.data) node.data = {};
  if (!node.data.hProperties) node.data.hProperties = {};
  return node;
};

/** @type import('unified').Plugin */
export const remarkRehypeCustom = () => {
  return (tree, file) => {
    const slug = file.history[0].split('/').at(-2);
    const toc = [];
    // https://github.com/rehypejs/rehype-slug?tab=readme-ov-file#what-is-this
    const slugger = new GithubSlugger();

    visit(tree, 'link', (node) => {
      setNodeEmptyProperties(node);

      node.data.hProperties.className = 'underline-highlight-fade';
      node.data.hProperties.target = '_blank';
      node.data.hProperties.rel = 'noreferrer noopener';
    });

    visit(tree, 'paragraph', (node) => {
      const { children } = node;
      const isSoleImage =
        Array.isArray(children) &&
        children.length === 1 &&
        children[0].type === 'image';

      // 이미지 태그를 p로 감싸지 않고 최상단으로 올리는 로직
      if (isSoleImage) {
        setNodeEmptyProperties(node);
        node.type = 'div';
        node.children = children;
        node.data.hProperties.className = 'img-container';
      }
    });

    visit(tree, 'image', (node, _, parent) => {
      // 자식노드가 image로 추가되므로 무한루프를 방지하기 위한 코드
      const PARENT_CLASS_NAME = 'img-wrap';
      if (
        `${parent.data?.hProperties?.className}`.startsWith(PARENT_CLASS_NAME)
      ) {
        return;
      }
      const className = (() => {
        let name = PARENT_CLASS_NAME;
        if (node.title) {
          name += ` ${node.title}`;
        }
        return name;
      })();

      const src = `/posts/${slug}/${node.url}`;

      setNodeEmptyProperties(node);
      node.type = 'div';
      node.data.hProperties.className = className;

      node.children = [
        {
          type: 'image',
          title: null,
          url: src,
          alt: node.alt,
          data: {
            hProperties: {},
          },
          children: [],
        },
      ];
      return;
    });

    visit(tree, 'heading', (node) => {
      if (node.depth > 3) return;

      /** @type { {depth: number; value: string; id: string;} } */
      const tocItem = {
        depth: node.depth,
        value: node.children[0].value,
        id: slugger.slug(node.children[0].value),
      };
      toc.push(tocItem);
    });

    // Tree setup
    // https://blog.logto.io/ko/remark-extract-mdx-reading-time
    tree.children.unshift({
      type: 'mdxjsEsm',
      value: '',
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [
            {
              type: 'ExportNamedDeclaration',
              specifiers: [],
              declaration: {
                type: 'VariableDeclaration',
                kind: 'const',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    id: { type: 'Identifier', name: 'toc' },
                    init: valueToEstree(toc, { preserveReferences: true }),
                  },
                ],
              },
            },
          ],
        },
      },
    });
  };
};
