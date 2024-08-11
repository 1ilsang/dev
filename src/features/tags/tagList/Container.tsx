import type { FunctionComponent } from 'react';

import HashTag from '~/shared/components/HashTag';
import { MainContainer } from '~/shared/components/MainContainer';

type TagListContainer = {
  tags: string[];
};

const TagListContainer: FunctionComponent<TagListContainer> = ({ tags }) => {
  return (
    <MainContainer>
      {tags.map((tag) => (
        <div className="inline-block m-2" key={tag}>
          <HashTag link={`/tags/${tag}`} content={tag} />
        </div>
      ))}
    </MainContainer>
  );
};

export default TagListContainer;
