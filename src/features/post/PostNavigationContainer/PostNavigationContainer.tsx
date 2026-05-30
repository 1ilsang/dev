import type { FunctionComponent } from 'react';

import type { PostNavigation } from './models';
import { PrevNext } from './PrevNext';
import { RelatedPosts } from './RelatedPosts';

type Props = {
  navigation: PostNavigation;
  currentSlug: string;
};

export const PostNavigationContainer: FunctionComponent<Props> = ({
  navigation: { prev, next, related },
  currentSlug,
}) => {
  const hasPrevNext = prev !== null || next !== null;
  const hasRelated = related.length > 0;

  if (!hasPrevNext && !hasRelated) return null;

  return (
    <>
      <PrevNext prev={prev} next={next} currentSlug={currentSlug} />
      <RelatedPosts recommendations={related} currentSlug={currentSlug} />
    </>
  );
};
