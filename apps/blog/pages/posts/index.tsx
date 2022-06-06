import { NextPage } from "next";
import Link from "next/link";
import DateFormatter from "../../components/common/DateFormatter";
import Navbar from "../../components/common/Navbar";
import { getAllPosts, getPostBySlug } from "../../helpers/post";
import PostType from "../../types/posts";

interface PostHomeProps {
  posts: PostType[];
  preview?: boolean;
}

const PostHome: NextPage<PostHomeProps> = ({ posts }) => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="post-container">
        <ul className="list-disc">
          {posts.map((post) => {
            return (
              <li key={post.title}>
                <Link href={`/posts/${post.slug}`}>
                  <a className="hover:text-gray-700">
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
    </div>
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
