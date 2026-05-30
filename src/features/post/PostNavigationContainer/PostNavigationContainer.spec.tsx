import { render, screen } from '@testing-library/react';

import { PostNavigationContainer } from './PostNavigationContainer';
import type { PostForNavigation, PostNavigation } from './models';

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

describe('PostNavigationContainer', () => {
  it('should render nothing when navigation is empty', () => {
    const navigation: PostNavigation = {
      prev: null,
      next: null,
      related: [],
    };

    const { container } = render(
      <PostNavigationContainer
        navigation={navigation}
        currentSlug="current-post"
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('should render prev/next and related posts', () => {
    const navigation: PostNavigation = {
      prev: createPost('prev-post'),
      next: createPost('next-post'),
      related: [{ kind: 'similar', post: createPost('related-post') }],
    };

    render(
      <PostNavigationContainer
        navigation={navigation}
        currentSlug="current-post"
      />,
    );

    expect(screen.getByRole('navigation', { name: '글 이동' })).toBeVisible();
    expect(screen.getByRole('region', { name: '더 보기' })).toBeVisible();
    expect(screen.getByText('prev-post title')).toBeVisible();
    expect(screen.getByText('next-post title')).toBeVisible();
    expect(screen.getByText('related-post title')).toBeVisible();
  });

  it('should render only related posts when prev/next are missing', () => {
    const navigation: PostNavigation = {
      prev: null,
      next: null,
      related: [{ kind: 'discovery', post: createPost('related-only') }],
    };

    render(
      <PostNavigationContainer
        navigation={navigation}
        currentSlug="current-post"
      />,
    );

    expect(screen.queryByLabelText('글 이동')).not.toBeInTheDocument();
    expect(screen.getByText('related-only title')).toBeVisible();
    expect(screen.getByText('다른 주제 탐색')).toBeVisible();
  });

  it('should render only prev/next when related posts are missing', () => {
    const navigation: PostNavigation = {
      prev: createPost('prev-only'),
      next: null,
      related: [],
    };

    render(
      <PostNavigationContainer
        navigation={navigation}
        currentSlug="current-post"
      />,
    );

    expect(screen.getByRole('navigation', { name: '글 이동' })).toBeVisible();
    expect(screen.queryByLabelText('더 보기')).not.toBeInTheDocument();
    expect(screen.getByText('prev-only title')).toBeVisible();
  });
});
