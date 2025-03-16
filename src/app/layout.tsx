import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { MyProfile } from '~/about/headline/data/profile';
import { BannerWrapper } from '~/shared/components/Banner';
import {
  ImageUrl,
  MetaDescription,
  MetaKeywords,
  MetaTitle,
} from '~/shared/constants/blog';

import '~/styles/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${ridi.variable} text-[14px] overflow-y-auto print:overflow-y-scroll h-full`}
      suppressHydrationWarning
    >
      <body className="h-full text-white bg-snazzy-bg antialiased font-ridi print:text-black print:bg-white print:w-[210mm] print:h-[297mm] print:print-color-exact pr-scroll-lock md:custom-scrollbar overflow-y-auto print:overflow-y-visible">
        <BannerWrapper />
        {children}
        <div id="portal" />
        {!process.env.NEXT_PUBLIC_E2E &&
          process.env.NODE_ENV === 'production' && (
            <>
              <Analytics />
              <SpeedInsights />
              <GoogleAnalytics gaId="G-MCL3TLFXPN" />
            </>
          )}
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  authors: [{ name: '1ilsang' }],
  keywords: MetaKeywords.HOME,
  title: MetaTitle.HOME,
  description: MetaDescription.HOME,
  icons: {
    icon: '/favicon.ico',
    apple: '/images/favicon/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        url: '/images/favicon/favicon-96x96.png',
        sizes: '96x96',
      },
    ],
  },
  openGraph: {
    siteName: MetaTitle.HOME,
    title: MetaTitle.HOME,
    description: MetaDescription.HOME,
    images: [{ url: ImageUrl.HOME }],
    authors: MyProfile.personal.label,
    writers: MyProfile.personal.label,
    username: MyProfile.personal.label,
  },
  manifest: '/manifest.json',
  appleWebApp: {
    title: '1ilsang.dev',
    capable: true,
    statusBarStyle: 'black-translucent',
  },
};

const ridi = localFont({
  src: '../../public/fonts/RIDIBatang-subset.woff2',
  variable: '--ridi-batang',
  display: 'block',
  preload: true,
});

export const dynamic = 'error';
