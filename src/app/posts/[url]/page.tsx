import { type Metadata, type NextPage } from 'next';

import PostContainer from '~/post/Container';
import type { PostType } from '~/posts/models';
import { Footer } from '~/shared/components/Footer';
import ImageModal from '~/shared/components/modal/ImageModal';
import Navbar from '~/shared/components/nav/Navbar';
import NavProgress from '~/shared/components/nav/Progress';
import { getAllPosts, getPost } from '~/shared/helpers/post';
import { Portal } from '~/shared/portal/Container';

interface PostsProps {
  params: Promise<{
    url: PostType['url'];
  }>;
}

const Posts: NextPage<PostsProps> = async (props) => {
  const params = await props.params;
  const post = await getPost(params.url);
  return (
    <>
      <NavProgress />
      <Navbar />
      <PostContainer post={post} />
      <Footer />
      <Portal>
        <ImageModal />
      </Portal>
    </>
  );
};

export default Posts;

export async function generateStaticParams(): Promise<
  { url: PostType['url'] }[]
> {
  const posts = getAllPosts(['url', 'slug']);
  const paths = posts.map((post) => {
    return {
      url: post.url ?? post.slug,
    };
  });
  return paths;
}

export async function generateMetadata(props: PostsProps): Promise<Metadata> {
  const params = await props.params;
  const post = await getPost(params.url);

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      images: [post.ogImage.url],
    },
  };
}

export const dynamicParams = false;
