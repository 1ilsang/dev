'use client';

import Link from 'next/link';
import type { FunctionComponent } from 'react';

import { DateFormatter } from '~/shared/components/DateFormatter';
import { trackPostNavigation } from '~/shared/helpers/logger';
import type { PostForNavigation, RelatedPostKind } from './models';

type Props = {
  post: PostForNavigation;
  currentSlug: string;
  rank: number;
  kind: RelatedPostKind;
};

export const RelatedPostItem: FunctionComponent<Props> = ({
  post: {
    slug,
    frontmatter: { title, coverImage, description, date },
  },
  currentSlug,
  rank,
  kind,
}) => {
  const coverAlt = '';
  const descriptionId = `related-post-${slug}-description`;

  return (
    <li className="px-1 md:px-4 py-3 mb-1 md:rounded-sm hover:bg-rainbow-water hover:animate-rainbow-water hover:bg-[length:400%_400%] group overflow-hidden transform-gpu duration-300">
      <Link
        className="flex flex-col items-center md:flex-row"
        href={`/posts/${slug}`}
        aria-describedby={descriptionId}
        onClick={() => trackPostNavigation(kind, currentSlug, slug, rank)}
      >
        <div className="relative mr-4 overflow-hidden border rounded-sm h-24 w-44 min-w-44 border-white-blue">
          <img
            className="object-cover w-full h-full transition duration-500 group-hover:scale-105 transform-gpu"
            src={coverImage}
            alt={coverAlt}
            loading="lazy"
            width={176}
            height={96}
          />
        </div>
        <div className="w-full mt-2 md:mt-0">
          {kind === 'discovery' && (
            <span className="text-xs text-date-gray mb-1 block">
              다른 주제 탐색
            </span>
          )}
          <h3 className="text-xl mb-1.5 title-underline transform-gpu group-hover:text-snazzy-bg">
            {title}
          </h3>
          <p
            id={descriptionId}
            className="text-white-blue group-hover:text-snazzy-bg line-clamp-2"
          >
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
