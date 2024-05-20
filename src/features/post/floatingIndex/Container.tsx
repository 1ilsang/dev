'use client';

import { type FunctionComponent } from 'react';
import { type PostType } from '~/posts/models';
import useFloatingIndex from './useFloatingIndex';
import FloatingItem from './Item';
import FloatingDepthUL from './DepthUL';

type FloatingIndexProps = {
  post: PostType;
};

const FloatingIndex: FunctionComponent<FloatingIndexProps> = ({ post }) => {
  const { list, ...rest } = useFloatingIndex({ post });

  if (list.length === 0) {
    return null;
  }
  return (
    <aside className="floating-container">
      <ul className="list">
        {list.map((item, index) => {
          return Array.isArray(item) ? (
            <FloatingDepthUL key={index} itemList={item} {...rest} />
          ) : (
            <FloatingItem
              key={item.textContent}
              item={item}
              active={item.id === rest.activeId}
              {...rest}
            />
          );
        })}
      </ul>
    </aside>
  );
};

export default FloatingIndex;
