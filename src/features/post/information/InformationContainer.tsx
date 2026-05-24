import type { FunctionComponent } from 'react';
import type { PostType } from '~/posts/models';
import { HashTag } from '~/shared/components/HashTag';
import { ProfileSection } from './ProfileSection';
import { PublishedDate } from './PublishedDate';

type Props = {
  post: PostType;
};

export const InformationContainer: FunctionComponent<Props> = ({
  post: {
    frontmatter: { tags, date, updatedAt },
    readingTime,
  },
}) => {
  return (
    <>
      <ProfileSection />
      <section className="flex flex-wrap items-end mt-2">
        {tags.map((tag) => (
          <HashTag
            className="mr-2"
            key={tag}
            link={`/tags/${tag}`}
            content={tag}
          />
        ))}
      </section>
      <section className="flex items-center gap-2">
        <PublishedDate date={date} updatedDate={updatedAt} />
        <span className="text-date-gray">·</span>
        <span className="text-date-gray">{readingTime} min read</span>
      </section>
    </>
  );
};
