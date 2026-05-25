import classNames from 'classnames';
import Link from 'next/link';
import type { FunctionComponent } from 'react';

import type { ServerPost } from '~/app/posts/page';
import { DateFormatter } from '~/shared/components/DateFormatter';

export const PostItem: FunctionComponent<{
  post: ServerPost;
  categoryFilter: Set<string>;
}> = ({
  post: {
    slug,
    frontmatter: { title, coverImage, description, date },
    category,
  },
  categoryFilter,
}) => {
  const show = categoryFilter.size === 0 || categoryFilter.has(category);
  const coverAlt = `${title} 썸네일`;

  if (!show) return null;

  return (
    <li
      className={classNames(
        'px-1 md:px-8 py-4 mb-1 md:rounded-[35px_60px/80px_25px]',
        'hover:bg-rainbow-water hover:animate-rainbow-water hover:bg-[length:400%_400%]',
        'group overflow-hidden transform-gpu duration-300',
      )}
      key={slug}
    >
      <Link
        className="flex flex-col items-center md:flex-row"
        href={`/posts/${slug}`}
      >
        <div className="relative mr-6 overflow-hidden border rounded-sm h-28 w-52 md:w-44 min-w-44 md:h-24 border-white-blue">
          <img
            className="object-cover w-full h-full transition duration-500 group-hover:scale-105 transform-gpu"
            src={coverImage}
            alt={coverAlt}
            loading="lazy"
            width={208}
            height={112}
          />
        </div>
        <div className="w-full mt-2 md:mt-0">
          <h2 className="text-xl mb-1.5 title-underline transform-gpu group-hover:text-snazzy-bg">
            {title}
          </h2>
          <p className="text-white-blue group-hover:text-snazzy-bg">
            {description}
          </p>
          <DateFormatter
            className="text-sub-blue group-hover:text-snazzy-bg"
            type="iso"
            date={date}
          />
        </div>
      </Link>
    </li>
  );
};
