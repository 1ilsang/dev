import type { FunctionComponent, PropsWithChildren } from 'react';
import { type PostType } from '~/posts/models';
import { MainContainer } from '~/shared/components/MainContainer';
import IssuePost from './components/IssuePost';
import { TocContainer } from './toc/Container';
import { InformationContainer } from './information/InformationContainer';
import { SponsorContainer } from './sponsor/Container';
import { POST_BODY_ID } from '~/shared/components/nav/constants';

export const PostContainer: FunctionComponent<
  PropsWithChildren<{ post: PostType }>
> = async ({ post, children }) => {
  const {
    frontmatter: { title },
    toc,
  } = post;
  return (
    <MainContainer>
      <h1 className="text-4xl break-words md:text-6xl">{title}</h1>
      <InformationContainer post={post} />
      <section id={POST_BODY_ID.slice(1)} className="relative">
        <div className="markdown">{children}</div>
        {toc.length > 0 && <TocContainer toc={toc} />}
      </section>
      <IssuePost title={title} />
      <SponsorContainer />
    </MainContainer>
  );
};
