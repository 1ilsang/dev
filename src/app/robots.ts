import type { MetadataRoute } from 'next';
import { MyProfile } from '~/about/headline/data/profile';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/favicon', '/fonts', '/images', '/open.mp4'],
    },
    sitemap: `${MyProfile.blog.href}/sitemap.xml`,
  };
}
