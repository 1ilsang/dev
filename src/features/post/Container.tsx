import type { FunctionComponent } from 'react';
import PostBody from './components/PostBody';
import IssuePost from './components/IssuePost';
import HashTag from '~/shared/components/HashTag';
import PublishedDate from '~/shared/components/PublishedDate';
import FloatingIndex from './floatingIndex/Container';
import { type PostType } from '~/posts/models';
import { SponsorContainer } from './sponsor/Container';
import { ProfileSection } from './components/ProfileSection';

const PostContainer: FunctionComponent<{ post: PostType }> = ({ post }) => {
  return (
    <div className="post-container">
      <h1 className="post-header">{post.title}</h1>
      <ProfileSection />
      <section className="flex flex-wrap mt-2 items-end">
        {post.tags.map((tag) => (
          <HashTag
            className="mr-2"
            key={tag}
            link={`/tags/${tag}`}
            content={tag}
          />
        ))}
      </section>
      <PublishedDate date={post.date} />
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
