import type { FunctionComponent } from 'react';
import PostBody from './components/PostBody';
import IssuePost from './components/IssuePost';
import { FloatingIndexContainer } from './floatingIndex/Container';
import { type PostType } from '~/posts/models';
import { SponsorContainer } from './sponsor/Container';
import { InformationContainer } from './information/InformationContainer';
import { MainContainer } from '~/shared/components/MainContainer';

const PostContainer: FunctionComponent<{ post: PostType }> = ({ post }) => {
  return (
    <MainContainer>
      <h1 className="text-4xl	md:text-6xl	break-words">{post.title}</h1>
      <InformationContainer post={post} />
      <section id="post-body-container" className="relative">
        <PostBody post={post} />
        <FloatingIndexContainer post={post} />
      </section>
      <IssuePost title={post.title} />
      <SponsorContainer />
    </MainContainer>
  );
};

export default PostContainer;
