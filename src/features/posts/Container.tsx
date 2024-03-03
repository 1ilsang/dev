import { FunctionComponent } from 'react';
import { PostHomeProps } from 'src/pages/posts';

import CategoryContainer from './category/Container';
import usePostListContainer from './hooks/usePostListContainer';
import MemoedPostItem from './components/Item';

const PostListContainer: FunctionComponent<PostHomeProps> = ({ posts }) => {
  const {
    categoryFilter,
    handleCategoryClick,
    filteredList,
    handleClearClick,
  } = usePostListContainer({ posts });

  return (
    <div className="post-container">
      <CategoryContainer
        categoryFilter={categoryFilter}
        onClearClick={handleClearClick}
        onCategoryClick={handleCategoryClick}
      />
      <ul className="post-list">
        {filteredList.map((post) => (
          <MemoedPostItem key={post.title} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default PostListContainer;
