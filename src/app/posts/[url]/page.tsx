import { type Metadata, type NextPage } from 'next';

import PostContainer from '~/post/Container';
import { PostType } from '~/posts/models';
import Footer from '~/shared/components/Footer';
import Navbar from '~/shared/components/nav/Navbar';
import NavProgress from '~/shared/components/nav/Progress';
import { getAllPosts, getPost } from '~/shared/helpers/post';

interface PostsProps {
  params: {
    url: PostType['url'];
  };
}

const Posts: NextPage<PostsProps> = async ({ params }) => {
  const post = await getPost(params.url);
  return (
    <main className="post-layout">
      <NavProgress />
      <Navbar />
      <PostContainer post={post} />
      <Footer />
    </main>
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

export async function generateMetadata({
  params,
}: PostsProps): Promise<Metadata> {
  const post = await getPost(params.url);

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      images: [post.ogImage.url],
    },
  };
}
