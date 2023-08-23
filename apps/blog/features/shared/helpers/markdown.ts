import rehypeHighlight from "rehype-highlight";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const markdownToHtml = async (mdText: string) => {
  const htmlText = unified()
    .use(remarkParse)
    .use(remarkRehype, {
      allowDangerousHtml: true,
      handlers: {
        link(h, node, parent) {
          const parsedNode = h(
            node,
            "a",
            { target: "_blank", href: node.url, rel: "noreferrer noopener" },
            node.children,
          );
          return parsedNode;
        },
      },
    })
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .processSync(mdText);
  return htmlText.toString();
};

export default markdownToHtml;
