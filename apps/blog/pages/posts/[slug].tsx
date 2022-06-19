import { NextPage } from "next";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import Avatar from "../../components/common/Avatar";
import Footer from "../../components/common/Footer";
import HashTag from "../../components/common/HashTag";
import Navbar from "../../components/common/Navbar";
import PublishedDate from "../../components/common/PublishedDate";
import PostBody from "../../components/PostBody";
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
    <div className="post-layout">
      <Navbar />
      <div className="post-container">
        <h1 className="post-header">{post.title}</h1>
        <div className="post-profile-container">
          <Avatar />
        </div>
        <div className="flex mt-2 items-end">
          {post.tags.map((tag) => (
            <HashTag
              className="mr-2"
              key={tag}
              link={`/tags/${tag}`}
              content={tag}
            />
          ))}
        </div>
        <PublishedDate date={post.date} />
        <PostBody post={post} />
      </div>
      <Footer />
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
