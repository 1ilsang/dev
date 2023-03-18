import rehypeHighlight from "rehype-highlight";
import { unified } from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";

export default async function markdownToHtml(mdText: string) {
  const html_text = unified()
    .use(markdown)
    .use(remark2rehype)
    .use(rehypeHighlight)
    .use(html)
    .processSync(mdText);
  return html_text.toString();
}
