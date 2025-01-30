import type { FunctionComponent } from 'react';
import Link from 'next/link';

import DateFormatter from '~/shared/components/DateFormatter';
import type { ServerPost } from '~/app/posts/page';

export const PostItem: FunctionComponent<{ post: ServerPost }> = ({
  post: {
    slug,
    frontmatter: { title, coverImage, description, date },
  },
}) => {
  return (
    <li
      className="group px-1 md:px-8 py-4 mb-1 content-visibility-auto contain-intrinsic-size hover:text-snazzy-bg hover:bg-rainbow-water hover:animate-rainbow-water hover:bg-[length:400%_400%] hover:rounded-sm md:hover:rounded-[35px_60px/80px_25px]"
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
            alt="cover"
          />
        </div>
        <div className="w-full mt-2 md:mt-0">
          <h1 className="text-xl mb-1.5 title-underline">{title}</h1>
          <h1 className="text-white-blue group-hover:text-snazzy-bg">
            {description}
          </h1>
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
