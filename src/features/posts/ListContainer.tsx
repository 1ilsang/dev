import { FunctionComponent } from 'react';
import Link from 'next/link';
import { PostHomeProps } from 'src/pages/posts';

import CategoryContainer from './category/Container';
import usePostListContainer from './hooks/usePostListContainer';

import DateFormatter from '~/shared/components/DateFormatter';

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
        {filteredList.map((post) => {
          return (
            <li key={post.title}>
              <Link className="link" href={`/posts/${post.slug}`}>
                <img className="cover" src={post.coverImage} alt="cover" />
                <div className="content">
                  <h1 className="title">{post.title}</h1>
                  <h1 className="post-description">{post.description}</h1>
                  <DateFormatter type="iso" date={post.date} />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PostListContainer;
