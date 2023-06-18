import { FunctionComponent } from "react";

import { Project } from "../../models";

type TagsProps = Pick<Project, "tags"> & {
  show: string;
};

const Tags: FunctionComponent<TagsProps> = ({ tags, show }) => {
  return (
    <div className={`tag ${show}`}>
      {tags.map((tag) => (
        <div className="item" key={tag}>
          {tag}
        </div>
      ))}
    </div>
  );
};

export default Tags;
