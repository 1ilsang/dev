import { FunctionComponent, memo } from 'react';

import { Project } from '../../models';

type TagsProps = Pick<Project, 'tags'>;

const Tags: FunctionComponent<TagsProps> = memo(({ tags }) => {
  return (
    <div className="tag">
      {tags.map((tag) => (
        <div className="item" key={tag}>
          {tag}
        </div>
      ))}
    </div>
  );
});
Tags.displayName = 'Tags';

export default Tags;
