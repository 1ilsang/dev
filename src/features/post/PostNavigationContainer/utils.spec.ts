import type { Category } from '~/posts/models';
import type { PostForNavigation } from './models';
import { getPostNavigation, getRelatedPosts } from './utils';

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

const getTopicTags = (post: PostForNavigation) =>
  post.frontmatter.tags.filter((tag) => !HUB_TAGS.has(tag));

const countSharedTopicTags = (a: PostForNavigation, b: PostForNavigation) =>
  getTopicTags(b).filter((tag) => getTopicTags(a).includes(tag)).length;

const createPost = (
  slug: string,
  options: {
    date: string;
    tags?: string[];
    category?: Category;
    title?: string;
  },
): PostForNavigation => ({
  slug,
  url: `/posts/${slug}`,
  fullSlug: `js/${slug}`,
  category: options.category ?? 'JavaScript',
  frontmatter: {
    title: options.title ?? slug,
    description: `${slug} description`,
    tags: options.tags ?? [],
    coverImage: `/posts/${slug}/cover.webp`,
    date: options.date,
  },
});

describe('getPostNavigation', () => {
  const posts = [
    createPost('newest', { date: '2024-03-01', tags: ['react', 'frontend'] }),
    createPost('middle', {
      date: '2024-02-01',
      tags: ['react', 'frontend'],
      category: 'JavaScript',
    }),
    createPost('oldest', { date: '2024-01-01', tags: ['rust', 'developer'] }),
  ];

  it('should return next as newer post and prev as older post', () => {
    const navigation = getPostNavigation(posts[1], posts);

    expect(navigation.next?.slug).toBe('newest');
    expect(navigation.prev?.slug).toBe('oldest');
  });

  it('should return null next for the newest post', () => {
    const navigation = getPostNavigation(posts[0], posts);

    expect(navigation.next).toBeNull();
    expect(navigation.prev?.slug).toBe('middle');
  });

  it('should return null prev for the oldest post', () => {
    const navigation = getPostNavigation(posts[2], posts);

    expect(navigation.prev).toBeNull();
    expect(navigation.next?.slug).toBe('middle');
  });

  it('should return null prev and next when current post is not found', () => {
    const unknown = createPost('unknown', { date: '2023-01-01' });
    const navigation = getPostNavigation(unknown, posts);

    expect(navigation.prev).toBeNull();
    expect(navigation.next).toBeNull();
  });

  it('should sort posts by date even when input is unsorted', () => {
    const unsorted = [posts[2], posts[0], posts[1]];
    const navigation = getPostNavigation(posts[1], unsorted);

    expect(navigation.next?.slug).toBe('newest');
    expect(navigation.prev?.slug).toBe('oldest');
  });
});

describe('getRelatedPosts', () => {
  it('should exclude the current post', () => {
    const current = createPost('current', {
      date: '2024-02-01',
      tags: ['react', 'frontend'],
    });
    const others = [
      createPost('other-a', {
        date: '2024-03-01',
        tags: ['react', 'frontend'],
      }),
      createPost('other-b', {
        date: '2024-01-01',
        tags: ['career', 'developer'],
        category: 'Activity',
      }),
    ];

    const related = getRelatedPosts(current, [current, ...others]);

    expect(related.every(({ post }) => post.slug !== 'current')).toBe(true);
  });

  it('should prioritize topic tag overlap over hub tags only', () => {
    const current = createPost('current', {
      date: '2024-02-01',
      tags: ['react', 'nextjs', 'frontend', 'javascript'],
    });
    const posts = [
      current,
      createPost('high-score', {
        date: '2024-01-01',
        tags: ['react', 'nextjs', 'frontend', 'javascript'],
      }),
      createPost('low-score', {
        date: '2024-03-01',
        tags: ['react', 'frontend', 'javascript'],
      }),
      createPost('discovery-a', {
        date: '2024-04-01',
        tags: ['career', 'developer', 'remote-work'],
        category: 'Activity',
      }),
      createPost('discovery-b', {
        date: '2024-05-01',
        tags: ['book-review', 'developer', 'career'],
        category: 'Book',
      }),
    ];

    const related = getRelatedPosts(current, posts);

    expect(related).toHaveLength(4);
    expect(related[0]).toEqual({
      kind: 'similar',
      post: expect.objectContaining({ slug: 'high-score' }),
    });
    expect(related[1]).toEqual({
      kind: 'similar',
      post: expect.objectContaining({ slug: 'low-score' }),
    });
    expect(related.slice(2).every(({ kind }) => kind === 'discovery')).toBe(
      true,
    );
    expect(
      related
        .slice(2)
        .map(({ post }) => post.slug)
        .sort(),
    ).toEqual(['discovery-a', 'discovery-b'].sort());
  });

  it('should use same category as tiebreaker when topic score is equal', () => {
    const current = createPost('current', {
      date: '2024-02-01',
      tags: ['react', 'frontend'],
      category: 'JavaScript',
    });
    const posts = [
      current,
      createPost('same-category', {
        date: '2024-01-01',
        tags: ['react', 'frontend'],
        category: 'JavaScript',
      }),
      createPost('other-category', {
        date: '2024-03-01',
        tags: ['react', 'frontend'],
        category: 'Rust',
      }),
      createPost('discovery', {
        date: '2024-04-01',
        tags: ['career', 'developer'],
        category: 'Activity',
      }),
    ];

    const related = getRelatedPosts(current, posts);

    expect(related[0].post.slug).toBe('same-category');
    expect(related[1].post.slug).toBe('other-category');
    expect(related[2].kind).toBe('discovery');
  });

  it('should use date as tiebreaker when topic score and category are equal', () => {
    const current = createPost('current', {
      date: '2024-02-01',
      tags: ['react', 'frontend'],
      category: 'JavaScript',
    });
    const posts = [
      current,
      createPost('older-match', {
        date: '2024-01-01',
        tags: ['react', 'frontend'],
        category: 'JavaScript',
      }),
      createPost('newer-match', {
        date: '2024-03-01',
        tags: ['react', 'frontend'],
        category: 'JavaScript',
      }),
      createPost('discovery', {
        date: '2024-04-01',
        tags: ['career', 'developer'],
        category: 'Activity',
      }),
    ];

    const related = getRelatedPosts(current, posts);

    expect(related[0].post.slug).toBe('newer-match');
    expect(related[1].post.slug).toBe('older-match');
  });

  it('should use slug as final tiebreaker for similar posts', () => {
    const current = createPost('current', {
      date: '2024-02-01',
      tags: ['react', 'frontend'],
      category: 'JavaScript',
    });
    const posts = [
      current,
      createPost('b-post', {
        date: '2024-03-01',
        tags: ['react', 'frontend'],
        category: 'JavaScript',
      }),
      createPost('a-post', {
        date: '2024-03-01',
        tags: ['react', 'frontend'],
        category: 'JavaScript',
      }),
      createPost('discovery', {
        date: '2024-04-01',
        tags: ['career', 'developer'],
        category: 'Activity',
      }),
    ];

    const related = getRelatedPosts(current, posts);

    expect(related[0].post.slug).toBe('a-post');
    expect(related[1].post.slug).toBe('b-post');
  });

  it('should append discovery posts as the last recommendations', () => {
    const current = createPost('current', {
      date: '2024-02-01',
      tags: ['react', 'frontend', 'javascript'],
    });
    const posts = [
      current,
      ...Array.from({ length: 5 }, (_, index) =>
        createPost(`similar-${index}`, {
          date: `2024-0${index + 1}-01`,
          tags: ['react', 'frontend', 'javascript'],
        }),
      ),
      createPost('discovery-a', {
        date: '2024-06-01',
        tags: ['book-review', 'developer', 'career'],
        category: 'Book',
      }),
      createPost('discovery-b', {
        date: '2024-07-01',
        tags: ['retrospect', 'developer', 'career'],
        category: 'Retrospect',
      }),
    ];

    const related = getRelatedPosts(current, posts);

    expect(related).toHaveLength(4);
    expect(related.slice(0, 2).every(({ kind }) => kind === 'similar')).toBe(
      true,
    );
    expect(related.slice(2).every(({ kind }) => kind === 'discovery')).toBe(
      true,
    );
    expect(
      related
        .slice(2)
        .map(({ post }) => post.slug)
        .sort(),
    ).toEqual(['discovery-a', 'discovery-b'].sort());
  });

  it('should pick two discovery posts from different topics', () => {
    const current = createPost('current', {
      date: '2024-02-01',
      tags: ['react', 'frontend', 'javascript'],
    });
    const posts = [
      current,
      createPost('similar-a', {
        date: '2024-03-01',
        tags: ['react', 'frontend', 'javascript'],
      }),
      createPost('similar-b', {
        date: '2024-01-01',
        tags: ['react', 'frontend', 'javascript'],
      }),
      createPost('discovery-a', {
        date: '2024-05-01',
        tags: ['career', 'developer'],
        category: 'Activity',
      }),
      createPost('discovery-b', {
        date: '2024-04-01',
        tags: ['book-review', 'developer'],
        category: 'Book',
      }),
      createPost('discovery-c', {
        date: '2024-06-01',
        tags: ['career', 'developer', 'remote-work'],
        category: 'Activity',
      }),
    ];

    const related = getRelatedPosts(current, posts);
    const discoveryPosts = related
      .filter(({ kind }) => kind === 'discovery')
      .map(({ post }) => post);

    expect(discoveryPosts).toHaveLength(2);
    expect(discoveryPosts.map((post) => post.slug).sort()).toEqual(
      ['discovery-a', 'discovery-b'].sort(),
    );
    expect(discoveryPosts[0].category).not.toBe(discoveryPosts[1].category);
    expect(countSharedTopicTags(discoveryPosts[0], discoveryPosts[1])).toBe(0);
  });

  it('should pick discovery posts deterministically from equally distant candidates', () => {
    const current = createPost('current', {
      date: '2024-02-01',
      tags: ['react', 'frontend', 'javascript'],
    });
    const posts = [
      current,
      createPost('similar-a', {
        date: '2024-03-01',
        tags: ['react', 'frontend', 'javascript'],
      }),
      createPost('similar-b', {
        date: '2024-01-01',
        tags: ['react', 'frontend', 'javascript'],
      }),
      createPost('discovery-a', {
        date: '2024-05-01',
        tags: ['career', 'developer'],
        category: 'Activity',
      }),
      createPost('discovery-b', {
        date: '2024-04-01',
        tags: ['book-review', 'developer'],
        category: 'Book',
      }),
      createPost('discovery-c', {
        date: '2024-06-01',
        tags: ['retrospect', 'developer', 'career'],
        category: 'Retrospect',
      }),
    ];

    const first = getRelatedPosts(current, posts);
    const second = getRelatedPosts(current, posts);

    expect(first.slice(2).map(({ post }) => post.slug)).toEqual(
      second.slice(2).map(({ post }) => post.slug),
    );
    expect(first.slice(2).every(({ kind }) => kind === 'discovery')).toBe(true);
    expect(first.slice(2)).toHaveLength(2);
  });

  it('should return one discovery post when only one discovery candidate exists', () => {
    const current = createPost('current', {
      date: '2024-02-01',
      tags: ['react', 'frontend', 'javascript'],
    });
    const posts = [
      current,
      createPost('similar-a', {
        date: '2024-03-01',
        tags: ['react', 'frontend', 'javascript'],
      }),
      createPost('similar-b', {
        date: '2024-01-01',
        tags: ['react', 'frontend', 'javascript'],
      }),
      createPost('discovery-only', {
        date: '2024-05-01',
        tags: ['career', 'developer'],
        category: 'Activity',
      }),
    ];

    const related = getRelatedPosts(current, posts);

    expect(related).toHaveLength(3);
    expect(related[2]).toEqual({
      kind: 'discovery',
      post: expect.objectContaining({ slug: 'discovery-only' }),
    });
  });

  it('should return only similar posts when there is one candidate', () => {
    const current = createPost('current', {
      date: '2024-02-01',
      tags: ['react', 'frontend'],
    });
    const other = createPost('only-other', {
      date: '2024-03-01',
      tags: ['react', 'frontend'],
    });

    const related = getRelatedPosts(current, [current, other]);

    expect(related).toEqual([{ kind: 'similar', post: other }]);
  });

  it('should return two similar posts without discovery when only two candidates exist', () => {
    const current = createPost('current', {
      date: '2024-02-01',
      tags: ['react', 'frontend'],
    });
    const posts = [
      current,
      createPost('one', { date: '2024-03-01', tags: ['react', 'frontend'] }),
      createPost('two', { date: '2024-01-01', tags: ['react', 'frontend'] }),
    ];

    const related = getRelatedPosts(current, posts);

    expect(related).toHaveLength(2);
    expect(related.every(({ kind }) => kind === 'similar')).toBe(true);
  });

  it('should return empty array when only current post exists', () => {
    const current = createPost('only', { date: '2024-01-01' });

    expect(getRelatedPosts(current, [current])).toEqual([]);
  });
});
