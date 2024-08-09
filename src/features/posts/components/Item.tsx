import type { FunctionComponent } from 'react';
import { memo } from 'react';
import Link from 'next/link';

import type { PostType } from '../models';

import DateFormatter from '~/shared/components/DateFormatter';

export const MemoedPostItem: FunctionComponent<{ post: PostType }> = memo<{
  post: PostType;
}>(({ post }) => {
  return (
    <li className="group" key={post.title}>
      <Link className="link" href={`/posts/${post.url}`}>
        <img className="cover" src={post.coverImage} alt="cover" />
        <div className="content">
          <h1 className="title">{post.title}</h1>
          <h1 className="text-white-blue group-hover:text-white">
            {post.description}
          </h1>
          <DateFormatter
            className="text-sub-blue group-hover:text-white"
            type="iso"
            date={post.date}
          />
        </div>
      </Link>
    </li>
  );
});
MemoedPostItem.displayName = 'MemoedPostItem';
