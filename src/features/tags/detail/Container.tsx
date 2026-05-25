import Link from 'next/link';
import { type FunctionComponent } from 'react';
import { type PostType } from '~/posts/models';
import { MainContainer } from '~/shared/components/MainContainer';

import { formatDate } from '~/shared/helpers/date';

type TagDetailContainerProps = {
  posts: PostType[];
  tag: string;
};

export const TagDetailContainer: FunctionComponent<TagDetailContainerProps> = ({
  posts,
  tag,
}) => {
  return (
    <MainContainer>
      <h1 className="sr-only">{tag} 태그 글 목록</h1>
      {posts.map(
        ({ url, frontmatter: { title, description, date, coverImage } }) => (
          <div
            className="inline-block p-4 m-2 border border-solid border-base rounded-3xl"
            key={title}
          >
            <Link href={url}>
              <div className="text-highlight print:text-black hover:underline">
                {title}
              </div>
              <div>{description}</div>
              <div suppressHydrationWarning>
                {formatDate(new Date(date), 'yy.MM.dd')}
              </div>
              <div>
                <img
                  src={coverImage}
                  width={200}
                  height={112}
                  loading="lazy"
                  alt={`${title} 썸네일`}
                />
              </div>
            </Link>
          </div>
        ),
      )}
    </MainContainer>
  );
};
