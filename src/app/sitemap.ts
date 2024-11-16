import type { MetadataRoute } from 'next';
import { MyProfile } from '~/about/headline/data/profile';
import { getAllPosts, getAllTags } from '~/shared/helpers/post';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const DOMAIN = MyProfile.blog.href;
  const PRIORITY = {
    VERY_HIGH: 1,
    HIGH: 0.8,
    MID: 0.5,
  };

  const posts = getAllPosts(['tags']);
  const tags = getAllTags();

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${DOMAIN}/posts/${post.url}`,
    lastModified: new Date(post.updatedAt ?? post.date),
    changeFrequency: 'daily',
    priority: PRIORITY.VERY_HIGH,
  }));
  const tagUrls: MetadataRoute.Sitemap = tags.map((tag) => {
    const post = posts.find((post) => post.tags.includes(tag))!;
    return {
      url: `${DOMAIN}/tags/${tag}`,
      lastModified: new Date(post.date ?? post.updatedAt),
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
