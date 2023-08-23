import { FunctionComponent } from "react";
import Link from "next/link";
import { PostHomeProps } from "pages/posts";

import DateFormatter from "~/shared/components/DateFormatter";

const PostListContainer: FunctionComponent<PostHomeProps> = ({ posts }) => {
  return (
    <div className="post-container">
      <ul className="post-list">
        {posts.map((post) => {
          return (
            <li key={post.title}>
              <Link href={`/posts/${post.slug}`}>
                <h1 className="text-xl mr-4">{post.title}</h1>
                <h1 className="post-description">{post.description}</h1>
                <DateFormatter type="iso" date={post.date} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PostListContainer;
