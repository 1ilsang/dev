import type { FunctionComponent } from 'react';
import PostBody from './components/PostBody';
import IssuePost from './components/IssuePost';
import FloatingIndex from './floatingIndex/Container';
import { type PostType } from '~/posts/models';
import { SponsorContainer } from './sponsor/Container';
import { InformationContainer } from './information/InformationContainer';

const PostContainer: FunctionComponent<{ post: PostType }> = ({ post }) => {
  return (
    <div className="post-container">
      <h1 className="post-header">{post.title}</h1>
      <InformationContainer post={post} />
      <section id="post-body-container" className="relative">
        <PostBody post={post} />
        <FloatingIndex post={post} />
      </section>
      <IssuePost title={post.title} />
      <SponsorContainer />
    </div>
  );
};

export default PostContainer;
