import type { FunctionComponent } from 'react';

import { HashTag } from '~/shared/components/HashTag';
import { MainContainer } from '~/shared/components/MainContainer';
import type { TagSummary } from './models';

type TagListContainer = {
  tags: TagSummary[];
};

export const TagListContainer: FunctionComponent<TagListContainer> = ({
  tags,
}) => {
  return (
    <MainContainer>
      <header className="mb-10 border-b border-base/50 pb-8 md:mb-14">
        <div className="mb-3 flex items-end justify-between gap-4">
          <h1 className="text-4xl font-bold md:text-6xl">Tags</h1>
          <span className="rounded-full border border-base px-3 py-1 text-sm text-white-blue">
            {tags.length} topics
          </span>
        </div>
        <p className="max-w-xl text-[1rem] leading-relaxed text-white-blue md:text-lg">
          자주 다룬 주제부터 살펴보고 함께 언급된 태그로 관심사를 넓혀보세요.
        </p>
      </header>

      <ul
        className="grid grid-cols-1 gap-3 pb-24 sm:grid-cols-2 md:gap-4"
        aria-label="태그 목록"
      >
        {tags.map(({ name, postCount, relatedTags }) => (
          <li
            className="relative cursor-pointer rounded-2xl border border-base/70 bg-base/10 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-highlight/60 hover:bg-base/20"
            key={name}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <h2>
                <HashTag
                  className="text-xl no-underline after:absolute after:inset-0 after:rounded-2xl after:content-[''] hover:no-underline focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-highlight focus-visible:after:ring-offset-2 focus-visible:after:ring-offset-snazzy-bg"
                  link={`/tags/${name}`}
                  content={name}
                />
              </h2>
              <span className="shrink-0 rounded-full bg-base/30 px-2.5 py-1 text-xs text-white-blue">
                {postCount} posts
              </span>
            </div>
            {relatedTags.length > 0 && (
              <nav className="relative z-10" aria-label={`${name} 관련 태그`}>
                <p className="mb-2 text-xs text-sub-blue">함께 읽기</p>
                <ul className="flex flex-wrap gap-2">
                  {relatedTags.map((relatedTag) => (
                    <li key={relatedTag}>
                      <HashTag
                        className="rounded-full border border-base/60 px-2.5 py-1 text-xs text-white-blue no-underline transition-colors hover:border-highlight/50 hover:text-highlight hover:no-underline"
                        link={`/tags/${relatedTag}`}
                        content={relatedTag}
                      />
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </li>
        ))}
      </ul>
    </MainContainer>
  );
};
