import { FunctionComponent } from 'react';

import { Project } from '../../models';

type TagsProps = Pick<Project, 'tags'>;

const Tags: FunctionComponent<TagsProps> = ({ tags }) => {
  return (
    <div className={`tag`}>
      {tags.map((tag) => (
        <div className="item" key={tag}>
          {tag}
        </div>
      ))}
    </div>
  );
};

export default Tags;
