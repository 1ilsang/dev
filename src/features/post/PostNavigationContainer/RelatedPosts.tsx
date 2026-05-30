import type { FunctionComponent } from 'react';

import type { RelatedPostRecommendation } from './models';
import { RelatedPostItem } from './RelatedPostItem';

type Props = {
  recommendations: RelatedPostRecommendation[];
  currentSlug: string;
};

export const RelatedPosts: FunctionComponent<Props> = ({
  recommendations,
  currentSlug,
}) => {
  if (recommendations.length === 0) return null;

  return (
    <section aria-labelledby="related-posts-heading" className="mt-12 mb-40">
      <h2 id="related-posts-heading" className="text-2xl mb-4">
        더 보기
      </h2>
      <ul>
        {recommendations.map(({ post, kind }, index) => (
          <RelatedPostItem
            key={post.slug}
            post={post}
            currentSlug={currentSlug}
            rank={index + 1}
            kind={kind}
          />
        ))}
      </ul>
    </section>
  );
};
