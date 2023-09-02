import { FunctionComponent } from 'react';
import Link from 'next/link';
import { PostHomeProps } from 'src/pages/posts';

import DateFormatter from '~/shared/components/DateFormatter';

const PostListContainer: FunctionComponent<PostHomeProps> = ({ posts }) => {
  return (
    <div className="post-container">
      <ul className="post-list">
        {posts.map((post) => {
          return (
            <li key={post.title}>
              <Link className="link" href={`/posts/${post.slug}`}>
                <img className="cover" src={post.coverImage} alt="cover" />
                <div className="content">
                  <h1 className="title">{post.title}</h1>
                  <h1 className="post-description">{post.description}</h1>
                  <DateFormatter type="iso" date={post.date} />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PostListContainer;
