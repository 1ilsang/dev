import type { TagSummary } from './models';

type TaggedPost = {
  frontmatter: {
    tags: string[];
  };
};

export const getTagSummaries = (posts: TaggedPost[]): TagSummary[] => {
  const postCounts = new Map<string, number>();
  const relations = new Map<string, Map<string, number>>();

  posts.forEach(({ frontmatter }) => {
    const tags = [...new Set(frontmatter.tags)];

    tags.forEach((tag) => {
      postCounts.set(tag, (postCounts.get(tag) ?? 0) + 1);

      const relatedCounts = relations.get(tag) ?? new Map<string, number>();
      tags.forEach((relatedTag) => {
        if (relatedTag !== tag) {
          relatedCounts.set(
            relatedTag,
            (relatedCounts.get(relatedTag) ?? 0) + 1,
          );
        }
      });
      relations.set(tag, relatedCounts);
    });
  });

  return [...postCounts.entries()]
    .sort(
      ([tagA, countA], [tagB, countB]) =>
        countB - countA || tagA.localeCompare(tagB),
    )
    .map(([name, postCount]) => ({
      name,
      postCount,
      relatedTags: [...(relations.get(name)?.entries() ?? [])]
        .sort(
          ([tagA, countA], [tagB, countB]) =>
            countB - countA ||
            (postCounts.get(tagB) ?? 0) - (postCounts.get(tagA) ?? 0) ||
            tagA.localeCompare(tagB),
        )
        .slice(0, 3)
        .map(([tag]) => tag),
    }));
};
