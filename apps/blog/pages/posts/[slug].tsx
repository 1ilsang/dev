import { NextPage } from "next";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import markdownToHtml from "../../helpers/markdown";
import { getAllPosts, getPostBySlug } from "../../helpers/post";
import PostType from "../../types/posts";

interface PostsProps {
  post: PostType;
  preview?: boolean;
}

const Posts: NextPage<PostsProps> = ({ post }) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {post.title}
      {post.tags.map((tag) => (
        <div key={tag}>#{tag}</div>
      ))}
    </div>
  );
};

export default Posts;

interface GetStaticPropsParams {
  params: {
    slug: string;
  };
}

export async function getStaticProps({ params }: GetStaticPropsParams) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "tags",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
