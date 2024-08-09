import type { FunctionComponent } from 'react';

import HashTag from '~/shared/components/HashTag';

type TagListContainer = {
  tags: string[];
};

const TagListContainer: FunctionComponent<TagListContainer> = ({ tags }) => {
  return (
    <div className="tag-container">
      {tags.map((tag) => (
        <div className="tag-wrapper" key={tag}>
          <HashTag link={`/tags/${tag}`} content={tag} />
        </div>
      ))}
    </div>
  );
};

export default TagListContainer;
