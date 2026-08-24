import Link from 'next/link';
import { type FunctionComponent } from 'react';
import { type PostType } from '~/posts/models';
import { HashTag } from '~/shared/components/HashTag';
import { MainContainer } from '~/shared/components/MainContainer';

import { formatDate } from '~/shared/helpers/date';

type TagDetailContainerProps = {
  posts: PostType[];
  tag: string;
  relatedTags: string[];
};

export const TagDetailContainer: FunctionComponent<TagDetailContainerProps> = ({
  posts,
  tag,
  relatedTags,
}) => {
  return (
    <MainContainer>
      <header className="mb-10 border-b border-base/50 pb-8 md:mb-14">
        <Link
          href="/tags"
          className="mb-5 inline-block text-sm text-sub-blue transition-colors hover:text-highlight"
        >
          ← 모든 태그
        </Link>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="break-all text-4xl font-bold md:text-6xl">#{tag}</h1>
          <span className="rounded-full border border-base px-3 py-1 text-sm text-white-blue">
            {posts.length} posts
          </span>
        </div>
        {relatedTags.length > 0 && (
          <nav className="mt-6" aria-label={`${tag} 관련 태그`}>
            <p className="mb-2 text-xs text-sub-blue">이어서 탐색하기</p>
            <ul className="flex flex-wrap gap-2">
              {relatedTags.map((relatedTag) => (
                <li key={relatedTag}>
                  <HashTag
                    className="inline-block rounded-full border border-base/70 bg-base/10 px-3 py-1.5 text-sm text-white-blue no-underline transition-colors hover:border-highlight/60 hover:text-highlight hover:no-underline"
                    link={`/tags/${relatedTag}`}
                    content={relatedTag}
                  />
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <ul className="space-y-4 pb-24">
        {posts.map(
          ({ url, frontmatter: { title, description, date, coverImage } }) => (
            <li key={title}>
              <Link
                className="group grid gap-5 overflow-hidden rounded-3xl border border-base/70 bg-base/10 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-highlight/60 hover:bg-base/20 sm:grid-cols-[10rem_1fr] sm:items-center md:p-5"
                href={url}
              >
                <img
                  className="aspect-video h-full w-full rounded-2xl border border-white-blue/40 object-cover transition duration-500 group-hover:scale-[1.02]"
                  src={coverImage}
                  width={160}
                  height={90}
                  loading="lazy"
                  alt={`${title} 썸네일`}
                />
                <div className="min-w-0">
                  <h2 className="mb-2 text-xl text-highlight print:text-black group-hover:underline">
                    {title}
                  </h2>
                  <p className="mb-3 leading-relaxed text-white-blue">
                    {description}
                  </p>
                  <time
                    className="text-sm text-sub-blue"
                    dateTime={date}
                    suppressHydrationWarning
                  >
                    {formatDate(new Date(date), 'yy.MM.dd')}
                  </time>
                </div>
              </Link>
            </li>
          ),
        )}
      </ul>
    </MainContainer>
  );
};
