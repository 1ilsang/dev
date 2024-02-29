import { FunctionComponent } from 'react';

import { PostType } from '../../posts/models';

interface PostBodyProps {
  post: PostType;
}

const PostBody: FunctionComponent<PostBodyProps> = ({ post }) => {
  /**
   * TODO:
   * 1. pre 코드에 copy 만들기: before content로 안됨. 직접 태그 삽입해야할듯?
   */
  return (
    <div
      className="markdown"
      dangerouslySetInnerHTML={{ __html: `${post.content}` }}
    />
  );
};

export default PostBody;
