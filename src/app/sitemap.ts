import type { MetadataRoute } from 'next';
import { MyProfile } from '~/about/headline/data/profile';
import { infoLog } from '~/shared/helpers/logger';
import { getAllPost, getAllTag } from '~/shared/helpers/mdx/getPost';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  infoLog('Build sitemap.xml');

  const DOMAIN = MyProfile.blog.href;
  const PRIORITY = {
    VERY_HIGH: 1,
    HIGH: 0.8,
    MID: 0.5,
  };

  const posts = await getAllPost();
  const tags = await getAllTag();

  const postUrls: MetadataRoute.Sitemap = posts.map(
    ({ url, frontmatter: { date, updatedAt } }) => ({
      url: `${DOMAIN}/${url}`,
      lastModified: new Date(updatedAt ?? date),
      changeFrequency: 'daily',
      priority: PRIORITY.VERY_HIGH,
    }),
  );
  const tagUrls: MetadataRoute.Sitemap = tags.map((tag) => {
    const post = posts.find((post) => post.frontmatter.tags.includes(tag))!;
    return {
      url: `${DOMAIN}/tags/${tag}`,
      lastModified: new Date(
        post.frontmatter.date ?? post.frontmatter.updatedAt,
      ),
      changeFrequency: 'weekly',
      priority: PRIORITY.MID,
    };
  });

  return [
    {
      url: DOMAIN,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: PRIORITY.MID,
    },
    {
      url: `${DOMAIN}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: PRIORITY.VERY_HIGH,
    },
    {
      url: `${DOMAIN}/posts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: PRIORITY.HIGH,
    },
    {
      url: `${DOMAIN}/tags`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: PRIORITY.MID,
    },
    ...postUrls,
    ...tagUrls,
  ];
}
