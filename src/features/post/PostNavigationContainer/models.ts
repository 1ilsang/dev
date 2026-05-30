import type { PostType } from '~/posts/models';

export type PostForNavigation = Omit<PostType, 'MDX' | 'toc' | 'readingTime'>;

export type RelatedPostKind = 'similar' | 'discovery';

export type RelatedPostRecommendation = {
  post: PostForNavigation;
  kind: RelatedPostKind;
};

export type PostNavigation = {
  prev: PostForNavigation | null;
  next: PostForNavigation | null;
  related: RelatedPostRecommendation[];
};
