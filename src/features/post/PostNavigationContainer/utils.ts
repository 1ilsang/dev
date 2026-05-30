import type {
  PostForNavigation,
  PostNavigation,
  RelatedPostRecommendation,
} from './models';

const SIMILAR_LIMIT = 2;
const DISCOVERY_LIMIT = 2;
const RELATED_LIMIT = SIMILAR_LIMIT + DISCOVERY_LIMIT;

/** create-post.md 허브 태그 — 주제 유사도 계산에서 가중치를 낮춤 */
const HUB_TAGS = new Set([
  'frontend',
  'javascript',
  'typescript',
  'react',
  'nextjs',
  'nodejs',
  'devtools',
  'testing',
  'developer',
  'open-source',
  'algorithm',
  'leetcode',
  'goorm',
  'book-review',
  'career',
  'retrospect',
  'remote-work',
  'rust',
]);

const sortByDateDesc = (posts: PostForNavigation[]) =>
  [...posts].sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1));

const getTopicTags = (post: PostForNavigation) =>
  post.frontmatter.tags.filter((tag) => !HUB_TAGS.has(tag));

const getHubTags = (post: PostForNavigation) =>
  post.frontmatter.tags.filter((tag) => HUB_TAGS.has(tag));

const countSharedTags = (tagsA: string[], tagsB: string[]) =>
  tagsB.filter((tag) => tagsA.includes(tag)).length;

const hashSlug = (slug: string) => {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return hash;
};

type ScoredPost = {
  post: PostForNavigation;
  topicScore: number;
  hubScore: number;
  sameCategory: boolean;
};

const scorePost = (
  current: PostForNavigation,
  post: PostForNavigation,
): ScoredPost => ({
  post,
  topicScore: countSharedTags(getTopicTags(current), getTopicTags(post)),
  hubScore: countSharedTags(getHubTags(current), getHubTags(post)),
  sameCategory: post.category === current.category,
});

const compareSimilar = (a: ScoredPost, b: ScoredPost) => {
  if (b.topicScore !== a.topicScore) return b.topicScore - a.topicScore;
  if (b.hubScore !== a.hubScore) return b.hubScore - a.hubScore;
  if (a.sameCategory !== b.sameCategory) {
    return Number(b.sameCategory) - Number(a.sameCategory);
  }
  const dateCmp = b.post.frontmatter.date.localeCompare(
    a.post.frontmatter.date,
  );
  if (dateCmp !== 0) return dateCmp;
  return a.post.slug.localeCompare(b.post.slug);
};

type DiscoveryScoredPost = {
  post: PostForNavigation;
  fromCurrent: ScoredPost;
  fromAnchor: ScoredPost;
};

const scoreDiscoveryCandidate = (
  current: PostForNavigation,
  post: PostForNavigation,
  anchor: PostForNavigation | null,
): DiscoveryScoredPost => ({
  post,
  fromCurrent: scorePost(current, post),
  fromAnchor: anchor ? scorePost(anchor, post) : scorePost(current, post),
});

const compareDiscoveryCandidate = (
  a: DiscoveryScoredPost,
  b: DiscoveryScoredPost,
  diversifyFromAnchor: boolean,
) => {
  if (diversifyFromAnchor) {
    if (a.fromAnchor.topicScore !== b.fromAnchor.topicScore) {
      return a.fromAnchor.topicScore - b.fromAnchor.topicScore;
    }
    if (a.fromAnchor.sameCategory !== b.fromAnchor.sameCategory) {
      return (
        Number(a.fromAnchor.sameCategory) - Number(b.fromAnchor.sameCategory)
      );
    }
    if (a.fromAnchor.hubScore !== b.fromAnchor.hubScore) {
      return a.fromAnchor.hubScore - b.fromAnchor.hubScore;
    }
  }

  if (a.fromCurrent.topicScore !== b.fromCurrent.topicScore) {
    return a.fromCurrent.topicScore - b.fromCurrent.topicScore;
  }
  if (a.fromCurrent.sameCategory !== b.fromCurrent.sameCategory) {
    return (
      Number(a.fromCurrent.sameCategory) - Number(b.fromCurrent.sameCategory)
    );
  }
  if (a.fromCurrent.hubScore !== b.fromCurrent.hubScore) {
    return a.fromCurrent.hubScore - b.fromCurrent.hubScore;
  }
  return a.post.slug.localeCompare(b.post.slug);
};

const isSameDiscoveryTier = (
  a: DiscoveryScoredPost,
  b: DiscoveryScoredPost,
  diversifyFromAnchor: boolean,
) => {
  if (diversifyFromAnchor) {
    if (a.fromAnchor.topicScore !== b.fromAnchor.topicScore) return false;
    if (a.fromAnchor.sameCategory !== b.fromAnchor.sameCategory) return false;
    if (a.fromAnchor.hubScore !== b.fromAnchor.hubScore) return false;
  }

  return (
    a.fromCurrent.topicScore === b.fromCurrent.topicScore &&
    a.fromCurrent.sameCategory === b.fromCurrent.sameCategory &&
    a.fromCurrent.hubScore === b.fromCurrent.hubScore
  );
};

const pickSimilarPosts = (
  current: PostForNavigation,
  candidates: PostForNavigation[],
  limit: number,
): PostForNavigation[] => {
  return candidates
    .map((post) => scorePost(current, post))
    .sort(compareSimilar)
    .slice(0, limit)
    .map(({ post }) => post);
};

/** 주제 태그가 없을 때(허브만 있을 때)도 유사 글이 discovery로 섞이지 않도록 거리 판별 */
const isDiscoveryDistantFromPost = (
  reference: PostForNavigation,
  post: PostForNavigation,
) => {
  if (countSharedTags(getTopicTags(reference), getTopicTags(post)) > 0) {
    return false;
  }

  const sameCategory = post.category === reference.category;
  const hubScore = countSharedTags(getHubTags(reference), getHubTags(post));
  if (sameCategory && hubScore > 0) {
    return false;
  }

  return true;
};

const narrowDiscoveryCandidates = (
  current: PostForNavigation,
  candidates: PostForNavigation[],
  anchor: PostForNavigation | null,
) => {
  let pool = candidates;

  const distantFromCurrent = pool.filter((post) =>
    isDiscoveryDistantFromPost(current, post),
  );
  if (distantFromCurrent.length > 0) {
    pool = distantFromCurrent;
  }

  if (anchor) {
    const differentCategory = pool.filter(
      (post) => post.category !== anchor.category,
    );
    if (differentCategory.length > 0) {
      pool = differentCategory;
    }

    const distantFromAnchor = pool.filter((post) =>
      isDiscoveryDistantFromPost(anchor, post),
    );
    if (distantFromAnchor.length > 0) {
      pool = distantFromAnchor;
    }
  }

  return pool;
};

const pickDiscoveryPosts = (
  current: PostForNavigation,
  candidates: PostForNavigation[],
  limit: number,
): PostForNavigation[] => {
  const picked: PostForNavigation[] = [];
  let remaining = [...candidates];

  for (let i = 0; i < limit && remaining.length > 0; i++) {
    const anchor = i === 0 ? null : picked[i - 1];
    const diversifyFromAnchor = anchor !== null;
    const pool = narrowDiscoveryCandidates(current, remaining, anchor);

    if (pool.length === 0) break;

    const ranked = pool
      .map((post) => scoreDiscoveryCandidate(current, post, anchor))
      .sort((a, b) => compareDiscoveryCandidate(a, b, diversifyFromAnchor));
    const best = ranked[0];
    const tier = ranked.filter((candidate) =>
      isSameDiscoveryTier(candidate, best, diversifyFromAnchor),
    );
    const index = hashSlug(`${current.slug}:${i}`) % tier.length;
    const selected = tier[index].post;

    picked.push(selected);
    remaining = remaining.filter((post) => post.slug !== selected.slug);
  }

  return picked;
};

export const getRelatedPosts = (
  current: PostForNavigation,
  allPosts: PostForNavigation[],
): RelatedPostRecommendation[] => {
  const candidates = allPosts.filter((post) => post.slug !== current.slug);

  if (candidates.length === 0) return [];

  const similar = pickSimilarPosts(
    current,
    candidates,
    Math.min(SIMILAR_LIMIT, candidates.length),
  );
  const similarSlugs = new Set(similar.map((post) => post.slug));
  const discoveryCandidates = candidates.filter(
    (post) => !similarSlugs.has(post.slug),
  );
  const discovery = pickDiscoveryPosts(
    current,
    discoveryCandidates,
    Math.min(
      DISCOVERY_LIMIT,
      Math.max(RELATED_LIMIT - similar.length, 0),
      discoveryCandidates.length,
    ),
  );

  const related: RelatedPostRecommendation[] = similar.map((post) => ({
    post,
    kind: 'similar',
  }));

  related.push(
    ...discovery.map((post) => ({
      post,
      kind: 'discovery' as const,
    })),
  );

  return related;
};

export const getPostNavigation = (
  current: PostForNavigation,
  allPosts: PostForNavigation[],
): PostNavigation => {
  const sorted = sortByDateDesc(allPosts);
  const index = sorted.findIndex((post) => post.slug === current.slug);

  const prev =
    index >= 0 && index < sorted.length - 1 ? sorted[index + 1] : null;
  const next = index > 0 ? sorted[index - 1] : null;
  const related = getRelatedPosts(current, sorted);

  return { prev, next, related };
};
