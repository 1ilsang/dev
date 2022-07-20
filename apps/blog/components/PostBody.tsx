import { FunctionComponent } from "react";

import PostType from "../types/posts";
import markdownStyles from ".././styles/markdown-styles.module.scss";

interface PostBodyProps {
  post: PostType;
}

const PostBody: FunctionComponent<PostBodyProps> = ({ post }) => {
  /**
   * TODO:
   * 1. code 태그에 syntax highlighter 추가: 구문 분석해서 직접 클래스 쪼개야함.
   * 2. pre 코드에 copy 만들기: before content로 안됨. 직접 태그 삽입해야할듯?
   */
  return (
    <div
      className={`${markdownStyles["markdown"]}`}
      dangerouslySetInnerHTML={{ __html: `${post.content}` }}
    />
  );
};

export default PostBody;
