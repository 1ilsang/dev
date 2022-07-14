import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import DateFormatter from "../../components/common/DateFormatter";
import Footer from "../../components/common/Footer";
import MetaHeader from "../../components/common/MetaHeader";
import Navbar from "../../components/common/Navbar";
import { ImageUrl, MetaDescription, MetaTitle } from "../../helpers/constant";
import { getAllPosts, getPostBySlug } from "../../helpers/post";
import PostType from "../../types/posts";

interface PostHomeProps {
  posts: PostType[];
  preview?: boolean;
}

const PostHome: NextPage<PostHomeProps> = ({ posts }) => {
  return (
    <>
      <MetaHeader
        title={MetaTitle.HOME}
        ogImageUrl={ImageUrl.HOME}
        description={MetaDescription.HOME}
      />
      <div className="post-layout">
        <Navbar />
        <div className="post-container">
          <ul className="post-list">
            {posts.map((post) => {
              return (
                <li key={post.title}>
                  <Link href={`/posts/${post.slug}`}>
                    <a>
                      <h1 className="text-xl mr-4">{post.title}</h1>
                      <h1>{post.description}</h1>
                      <DateFormatter iso={post.date} />
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PostHome;

export async function getStaticProps() {
  const rawPosts = getAllPosts(["slug"]);
  const posts = rawPosts.map((rawPost) => {
    const data = getPostBySlug(rawPost.slug, [
      "title",
      "date",
      "tags",
      "slug",
      "description",
      "coverImage",
    ]);
    return data;
  });

  return {
    props: {
      posts,
    },
  };
}
