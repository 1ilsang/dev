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
  const { MDX } = post;

  return (
    <>
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
    openGraph: {
      title,
      description,
      url: `${href}/${slug}`,
      images: [{ url: `${href}${coverImage}`, alt: 'cover' }],
      type: 'article',
      authors: MyProfile.linkedin.href,
      section: 'tech',
      publishedTime: date,
      modifiedTime: updatedAt,
      tags,
    },
  };
}

export const dynamicParams = false;
