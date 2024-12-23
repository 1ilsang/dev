import Link from 'next/link';
import { type FunctionComponent } from 'react';
import { type PostType } from '~/posts/models';
import { MainContainer } from '~/shared/components/MainContainer';

import { formatDate } from '~/shared/helpers/date';

type TagDetailContainerProps = {
  posts: PostType[];
};

const TagDetailContainer: FunctionComponent<TagDetailContainerProps> = ({
  posts,
}) => {
  return (
    <MainContainer>
      {posts.map((item) => (
        <div
          className="inline-block p-4 m-2 border border-solid border-base rounded-3xl"
          key={item.title}
        >
          <Link href={`/posts/${item.url}`}>
            <div className="text-highlight print:text-black hover:underline">
              {item.title}
            </div>
            <div>{item.description}</div>
            <div suppressHydrationWarning>
              {formatDate(new Date(item.date), 'yy.MM.dd')}
            </div>
            <div>
              <img src={item.coverImage} width={200} />
            </div>
          </Link>
        </div>
      ))}
    </MainContainer>
  );
};

export default TagDetailContainer;
