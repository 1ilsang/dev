import type { FunctionComponent } from 'react';
import { memo } from 'react';

import type { Project } from '../../models';

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
