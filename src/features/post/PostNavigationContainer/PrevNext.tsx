'use client';

import Link from 'next/link';
import type { FunctionComponent } from 'react';

import { trackPostNavigation } from '~/shared/helpers/logger';

import type { PostNavigation } from './models';

type Props = Pick<PostNavigation, 'prev' | 'next'> & {
  currentSlug: string;
};

const linkClassName =
  'group flex flex-col gap-1 max-w-[45%] hover:text-highlight duration-300';

export const PrevNext: FunctionComponent<Props> = ({
  prev,
  next,
  currentSlug,
}) => {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="글 이동"
      className="mt-16 pt-4 border-t border-white-blue border-dashed"
    >
      <div className="flex justify-between gap-4">
        {prev ? (
          <Link
            className={`${linkClassName} items-start text-left`}
            href={`/posts/${prev.slug}`}
            aria-label={`이전 글: ${prev.frontmatter.title}`}
            onClick={() => trackPostNavigation('prev', currentSlug, prev.slug)}
          >
            <span className="text-sm text-date-gray">← 이전 글</span>
            <span className="title-underline">{prev.frontmatter.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            className={`${linkClassName} items-end text-right ml-auto`}
            href={`/posts/${next.slug}`}
            aria-label={`다음 글: ${next.frontmatter.title}`}
            onClick={() => trackPostNavigation('next', currentSlug, next.slug)}
          >
            <span className="text-sm text-date-gray">다음 글 →</span>
            <span className="title-underline">{next.frontmatter.title}</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
};
