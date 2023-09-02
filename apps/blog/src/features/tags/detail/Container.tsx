import Link from 'next/link';
import { TagsDetailProps } from 'src/pages/tags/[tag]';
import { FunctionComponent } from 'react';

import { formatDate } from '~/shared/helpers/date';

type TagDetailContainerProps = TagsDetailProps;

const TagDetailContainer: FunctionComponent<TagDetailContainerProps> = ({
  posts,
}) => {
  return (
    <div className="tag-container">
      {posts.map((item) => (
        <div className="card" key={item.slug}>
          <Link href={`/posts/${item.slug}`}>
            <div className="hashtag">{item.title}</div>
            <div>{item.description}</div>
            <div>{formatDate(new Date(item.date), 'yy.MM.dd')}</div>
            <div>
              <img src={item.coverImage} width={200} />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TagDetailContainer;
