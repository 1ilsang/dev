import type { Metadata } from 'next';
import { BannerWrapper } from '~/shared/components/Banner';
import Favicon from '~/shared/components/head/Favicon';
import { Font } from '~/shared/components/head/Font';
import { WebApp } from '~/shared/components/head/WebApp';
import { ImageUrl, MetaDescription, MetaTitle } from '~/shared/constants/blog';

import '~/styles/index.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <Font />
        <WebApp />
        <Favicon />
      </head>
      <body>
        <BannerWrapper />
        {children}
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  authors: [{ name: '1ilsang' }],
  keywords: ['1ilsang', 'dev', 'front', 'frontend', 'react'],
  title: MetaTitle.HOME,
  description: MetaDescription.HOME,
  openGraph: {
    siteName: MetaTitle.HOME,
    title: MetaTitle.HOME,
    description: MetaDescription.HOME,
    images: [{ url: ImageUrl.HOME }],
  },
};

export const dynamic = 'error';
