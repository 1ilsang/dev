import type { MetadataRoute } from 'next';
import { MyProfile } from '~/about/headline/data/profile';
import { infoLog } from '~/shared/helpers/logger';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  infoLog('Build robots.txt');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${MyProfile.blog.href}/sitemap.xml`,
  };
}
