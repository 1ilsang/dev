import localFont from 'next/font/local';

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={`post-layout ${d2coding.variable}`}>{children}</main>;
}

const d2coding = localFont({
  src: '../../../assets/D2Coding-subset.woff2',
  variable: '--d2coding',
  display: 'block',
});
