import { NextPage } from "next";
import ErrorPage from "next/error";
import { useRouter } from "next/router";

import PostContainer from "~/posts/Container";
import { PostType } from "~/posts/models";
import PostBody from "~/posts/PostBody";
import Avatar from "~/shared/components/Avatar";
import Footer from "~/shared/components/Footer";
import HashTag from "~/shared/components/HashTag";
import MetaHeader from "~/shared/components/MetaHeader";
import Navbar from "~/shared/components/Navbar";
import PublishedDate from "~/shared/components/PublishedDate";
import { MetaTitle } from "~/shared/helpers/constant";
import markdownToHtml from "~/shared/helpers/markdown";
import { getAllPosts, getPostBySlug } from "~/shared/helpers/post";

export interface PostsProps {
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
    <>
      <MetaHeader
        title={`${post.title} - ${MetaTitle.HOME}`}
        ogImageUrl={post.ogImage.url}
        description={post.description}
      />
      <main className="post-layout">
        <Navbar />
        <PostContainer post={post} />
        <Footer />
      </main>
    </>
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
    "description",
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
