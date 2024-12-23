import type { FunctionComponent } from 'react';
import { memo } from 'react';

import type { Project } from '../../models';

type TagsProps = Pick<Project, 'tags'>;

export const Tags: FunctionComponent<TagsProps> = memo(({ tags }) => {
  return (
    <div className="flex flex-wrap w-full pl-6 select-none">
      {tags.map((tag) => (
        <div
          className="group-hover:bg-opacity-50 duration-300 bg-base text-sm text-white px-1 mt-1 mr-1 rounded-sm print:bg-transparent print:border-[1px] print:border-black print:text-black"
          key={tag}
        >
          {tag}
        </div>
      ))}
    </div>
  );
});
Tags.displayName = 'Tags';
