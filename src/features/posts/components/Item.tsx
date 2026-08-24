import classNames from 'classnames';
import Link from 'next/link';
import type { FunctionComponent } from 'react';

import type { ServerPost } from '~/app/posts/page';
import { DateFormatter } from '~/shared/components/DateFormatter';

export const PostItem: FunctionComponent<{
  post: ServerPost;
}> = ({
  post: {
    slug,
    frontmatter: { title, coverImage, description, date },
  },
}) => {
  const coverAlt = `${title} 썸네일`;

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
        href={`/post/${slug}`}
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
          <h2 className="text-xl mb-1.5 title-underline transform-gpu group-hover:text-on-vibrant">
            {title}
          </h2>
          <p className="text-white-blue group-hover:text-on-vibrant">
            {description}
          </p>
          <DateFormatter
            className="text-sub-blue group-hover:text-on-vibrant"
            type="iso"
            date={date}
          />
        </div>
      </Link>
    </li>
  );
};
