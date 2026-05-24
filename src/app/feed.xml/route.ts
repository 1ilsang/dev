import { MyProfile } from '~/about/headline/data/profile';
import { getAllPost } from '~/shared/helpers/mdx/getPost';

export const dynamic = 'force-static';

export async function GET() {
  const posts = await getAllPost();
  const { href } = MyProfile.blog;

  const items = posts
    .map(({ slug, frontmatter: { title, description, date } }) => {
      return `    <item>
      <title><![CDATA[${title}]]></title>
      <link>${href}/posts/${slug}</link>
      <guid>${href}/posts/${slug}</guid>
      <pubDate>${new Date(date).toUTCString()}</pubDate>
      <description><![CDATA[${description}]]></description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>1ilsang.dev</title>
    <link>${href}</link>
    <description>Software Engineer</description>
    <language>ko</language>
    <atom:link href="${href}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
