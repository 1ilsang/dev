import type { FunctionComponent } from 'react';
import { memo } from 'react';
import Link from 'next/link';

import type { PostType } from '../models';

import DateFormatter from '~/shared/components/DateFormatter';

export const MemoedPostItem: FunctionComponent<{ post: PostType }> = memo<{
  post: PostType;
}>(({ post }) => {
  return (
    <li
      className="group px-1 md:px-8 py-4 mb-1 hover:text-snazzy-bg hover:bg-rainbow-water hover:animate-rainbow-water hover:bg-[length:400%_400%] hover:rounded md:hover:rounded-[35px_60px/80px_25px]"
      key={post.title}
    >
      <Link
        className="flex flex-col items-center md:flex-row md:items-start"
        href={`/posts/${post.url}`}
      >
        <img
          className="w-64	md:w-52 min-w-52 h-32 md:h-28 mr-6 rounded object-cover border border-white-blue"
          src={post.coverImage}
          alt="cover"
        />
        <div className="w-full mt-2">
          <h1 className="text-2xl mb-1.5 title-underline">{post.title}</h1>
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
