import { render, screen } from '@testing-library/react';

import { RelatedPosts } from './RelatedPosts';
import type { PostForNavigation } from './models';

const createPost = (slug: string): PostForNavigation => ({
  slug,
  url: `/posts/${slug}`,
  fullSlug: `js/${slug}`,
  category: 'JavaScript',
  frontmatter: {
    title: `${slug} title`,
    description: `${slug} description`,
    tags: ['react'],
    coverImage: `/posts/${slug}/cover.webp`,
    date: '2024-01-01T00:00:00.000Z',
  },
});

describe('RelatedPosts', () => {
  it('should render nothing when recommendations are empty', () => {
    const { container } = render(
      <RelatedPosts recommendations={[]} currentSlug="current-post" />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('should render section heading and post list', () => {
    render(
      <RelatedPosts
        recommendations={[
          { kind: 'similar', post: createPost('related-a') },
          { kind: 'discovery', post: createPost('related-b') },
        ]}
        currentSlug="current-post"
      />,
    );

    expect(screen.getByRole('heading', { name: '더 보기' })).toBeVisible();
    expect(screen.getByRole('region', { name: '더 보기' })).toBeVisible();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('related-a title')).toBeVisible();
    expect(screen.getByText('related-b title')).toBeVisible();
    expect(screen.getByText('다른 주제 탐색')).toBeVisible();
  });
});
