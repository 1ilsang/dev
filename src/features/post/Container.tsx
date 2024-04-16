import { FunctionComponent } from 'react';
import { PostsProps } from 'src/pages/posts/[url]';

import PostBody from './components/PostBody';
import IssuePost from './components/IssuePost';

import Avatar from '~/shared/components/Avatar';
import HashTag from '~/shared/components/HashTag';
import PublishedDate from '~/shared/components/PublishedDate';

const PostContainer: FunctionComponent<PostsProps> = ({ post }) => {
  return (
    <div className="post-container">
      <h1 className="post-header">{post.title}</h1>
      <div className="post-profile-container">
        <Avatar />
      </div>
      <div className="flex flex-wrap mt-2 items-end">
        {post.tags.map((tag) => (
          <HashTag
            className="mr-2"
            key={tag}
            link={`/tags/${tag}`}
            content={tag}
          />
        ))}
      </div>
      <PublishedDate date={post.date} />
      <PostBody post={post} />
      <IssuePost title={post.title} />
    </div>
  );
};

export default PostContainer;
