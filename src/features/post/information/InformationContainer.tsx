import type { FunctionComponent } from 'react';
import type { PostType } from '~/posts/models';
import { ProfileSection } from './ProfileSection';
import HashTag from '~/shared/components/HashTag';
import { UpdatedDate } from './UpdatedDate';
import { PublishedDate } from './PublishedDate';

type Props = {
  post: PostType;
};

export const InformationContainer: FunctionComponent<Props> = ({ post }) => {
  return (
    <>
      <ProfileSection />
      <section className="flex flex-wrap mt-2 items-end">
        {post.tags.map((tag) => (
          <HashTag
            className="mr-2"
            key={tag}
            link={`/tags/${tag}`}
            content={tag}
          />
        ))}
      </section>
      <section>
        <PublishedDate date={post.date} />
        {post.updatedAt && <UpdatedDate date={post.updatedAt} />}
      </section>
    </>
  );
};
