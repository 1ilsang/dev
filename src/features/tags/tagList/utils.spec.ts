import { getTagSummaries } from './utils';

describe('getTagSummaries', () => {
  it('sorts tags by post count and ranks related tags by co-occurrence', () => {
    const summaries = getTagSummaries([
      { frontmatter: { tags: ['react', 'typescript', 'frontend'] } },
      { frontmatter: { tags: ['react', 'typescript', 'testing'] } },
      { frontmatter: { tags: ['react', 'testing'] } },
    ]);

    expect(summaries[0]).toEqual({
      name: 'react',
      postCount: 3,
      relatedTags: ['testing', 'typescript', 'frontend'],
    });
    expect(summaries.find(({ name }) => name === 'typescript')).toEqual({
      name: 'typescript',
      postCount: 2,
      relatedTags: ['react', 'testing', 'frontend'],
    });
  });

  it('counts a duplicated tag only once per post', () => {
    expect(
      getTagSummaries([{ frontmatter: { tags: ['react', 'react'] } }]),
    ).toEqual([{ name: 'react', postCount: 1, relatedTags: [] }]);
  });
});
