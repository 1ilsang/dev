import { render, screen } from '@testing-library/react';

import type { PostType } from '~/posts/models';
import { InformationContainer } from './InformationContainer';

const createPost = (
  overrides: Partial<PostType['frontmatter']> & { readingTime?: number } = {},
): PostType =>
  ({
    MDX: () => null,
    toc: [],
    url: '/posts/sample',
    slug: 'sample',
    fullSlug: 'js/sample',
    category: 'JavaScript',
    readingTime: overrides.readingTime ?? 5,
    frontmatter: {
      title: 'Sample',
      description: 'desc',
      tags: ['react', 'nextjs'],
      coverImage: '/cover.webp',
      date: '2024-01-15T00:00:00.000Z',
      ...overrides,
    },
  }) as PostType;

describe('InformationContainer', () => {
  it('should render profile, tags, published date, and reading time', () => {
    render(<InformationContainer post={createPost()} />);

    expect(screen.getByText('1ilsang')).toBeVisible();
    expect(screen.getByRole('link', { name: '#react' })).toHaveAttribute(
      'href',
      '/tags/react',
    );
    expect(screen.getByRole('link', { name: '#nextjs' })).toHaveAttribute(
      'href',
      '/tags/nextjs',
    );
    expect(screen.getByText('Published')).toBeVisible();
    expect(screen.getByText('5 min read')).toBeVisible();
  });

  it('should render updated date when updatedAt exists', () => {
    render(
      <InformationContainer
        post={createPost({ updatedAt: '2024-02-01T00:00:00.000Z' })}
      />,
    );

    expect(screen.getByText('Updated')).toBeVisible();
  });
});
