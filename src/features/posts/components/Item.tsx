import { FunctionComponent, memo } from 'react';
import Link from 'next/link';

import { PostType } from '../models';

import DateFormatter from '~/shared/components/DateFormatter';

const MemoedPostItem: FunctionComponent<{ post: PostType }> = memo<{
  post: PostType;
}>(({ post }) => {
  return (
    <li key={post.title}>
      <Link className="link" href={`/posts/${post.url}`}>
        <img className="cover" src={post.coverImage} alt="cover" />
        <div className="content">
          <h1 className="title">{post.title}</h1>
          <h1 className="post-description">{post.description}</h1>
          <DateFormatter type="iso" date={post.date} />
        </div>
      </Link>
    </li>
  );
});
MemoedPostItem.displayName = 'MemoedPostItem';

export default MemoedPostItem;
