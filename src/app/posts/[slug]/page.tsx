import { type Metadata, type NextPage } from 'next';
import { MyProfile } from '~/about/headline/data/profile';

import { PostContainer } from '~/post/Container';
import type { PostType } from '~/posts/models';
import { Footer } from '~/shared/components/Footer';
import { MDXEmbedComponents } from '~/shared/components/mdx/MDXEmbedComponents';
import { ImageModal } from '~/shared/components/modal/ImageModal';
import { Navbar } from '~/shared/components/nav/Navbar';
import { NavProgress } from '~/shared/components/nav/Progress';
import { getAllPost, getPostBySlug } from '~/shared/helpers/mdx/getPost';
import { Portal } from '~/shared/portal/Container';

type PostSlug = Pick<PostType, 'slug'>;
interface PostProps {
  params: Promise<PostSlug>;
}

const Post: NextPage<PostProps> = async ({ params }) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const { MDX, frontmatter } = post;
  const { href } = MyProfile.blog;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.description,
    image: `${href}${frontmatter.coverImage}`,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updatedAt ?? frontmatter.date,
    author: {
      '@type': 'Person',
      name: '1ilsang',
      url: href,
    },
    publisher: {
      '@type': 'Person',
      name: '1ilsang',
      url: href,
    },
    url: `${href}/posts/${slug}`,
    keywords: frontmatter.tags,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavProgress />
      <Navbar />
      <PostContainer post={post}>
        <MDX components={MDXEmbedComponents({ ...post })} />
      </PostContainer>
      <Footer />
      <Portal>
        <ImageModal />
      </Portal>
    </>
  );
};

export default Post;

export async function generateStaticParams(): Promise<PostSlug[]> {
  const posts = await getAllPost();
  const paths = posts.map(({ slug }) => {
    return {
      slug,
    };
  });
  return paths;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const { slug } = await params;
  const {
    frontmatter: { title, description, coverImage, tags, date, updatedAt },
  } = await getPostBySlug(slug);
  const { href } = MyProfile.blog;

  return {
    title,
    description,
    alternates: {
      canonical: `/posts/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${href}/posts/${slug}`,
      images: [{ url: `${href}${coverImage}`, alt: 'cover' }],
      type: 'article',
      authors: MyProfile.linkedin.href,
      section: 'tech',
      publishedTime: date,
      modifiedTime: updatedAt,
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${href}${coverImage}`],
    },
  };
}

export const dynamicParams = false;
