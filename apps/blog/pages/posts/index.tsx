import { NextPage } from "next";
import Link from "next/link";

import { PostType } from "~/posts/models";
import DateFormatter from "~/shared/components/DateFormatter";
import Footer from "~/shared/components/Footer";
import MetaHeader from "~/shared/components/MetaHeader";
import Navbar from "~/shared/components/Navbar";
import {
  ImageUrl,
  MetaDescription,
  MetaTitle,
} from "~/shared/helpers/constant";
import { getAllPosts, getPostBySlug } from "~/shared/helpers/post";

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
        <main>
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
        </main>
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
