import localFont from 'next/font/local';
import { MainLayout } from '~/shared/components/MainLayout';

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout className={d2coding.variable}>{children}</MainLayout>;
}

const d2coding = localFont({
  src: '../../../../public/fonts/D2Coding-subset.woff2',
  variable: '--d2coding',
  display: 'block',
});
