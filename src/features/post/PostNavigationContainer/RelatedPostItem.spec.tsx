import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { sendGAEvent } from '@next/third-parties/google';

import { RelatedPostItem } from './RelatedPostItem';
import type { PostForNavigation } from './models';

jest.mock('@next/third-parties/google', () => ({
  sendGAEvent: jest.fn(),
}));

const mockPost: PostForNavigation = {
  slug: 'sample-post',
  url: '/posts/sample-post',
  fullSlug: 'js/sample-post',
  category: 'JavaScript',
  frontmatter: {
    title: 'Sample Post Title',
    description: 'Sample post description',
    tags: ['react'],
    coverImage: '/posts/sample-post/cover.webp',
    date: '2024-01-15T00:00:00.000Z',
  },
};

describe('RelatedPostItem', () => {
  const mockSendGAEvent = sendGAEvent as jest.MockedFunction<
    typeof sendGAEvent
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render post link with title, description, cover image, and date', () => {
    render(
      <RelatedPostItem
        post={mockPost}
        currentSlug="current-post"
        rank={1}
        kind="similar"
      />,
    );

    const link = screen.getByRole('link', { name: /Sample Post Title/i });
    expect(link).toHaveAttribute('href', '/posts/sample-post');
    expect(screen.getByText('Sample post description')).toBeVisible();
    const image = screen.getByRole('presentation');
    expect(image).toHaveAttribute('src', '/posts/sample-post/cover.webp');
    expect(image).toHaveAttribute('alt', '');
    expect(link).toHaveAttribute(
      'aria-describedby',
      'related-post-sample-post-description',
    );
    expect(screen.getByRole('time')).toBeVisible();
    expect(screen.queryByText('다른 주제 탐색')).not.toBeInTheDocument();
  });

  it('should render discovery label for discovery recommendations', () => {
    render(
      <RelatedPostItem
        post={mockPost}
        currentSlug="current-post"
        rank={3}
        kind="discovery"
      />,
    );

    expect(screen.getByText('다른 주제 탐색')).toBeVisible();
  });

  it('should track similar click', async () => {
    render(
      <RelatedPostItem
        post={mockPost}
        currentSlug="current-post"
        rank={1}
        kind="similar"
      />,
    );

    const link = screen.getByRole('link', { name: /Sample Post Title/i });
    link.addEventListener('click', (event) => {
      event.preventDefault();
    });
    await userEvent.click(link);

    expect(mockSendGAEvent).toHaveBeenCalledWith('event', 'postNavigation', {
      type: 'similar',
      value: 'current-post>sample-post#1',
    });
  });

  it('should track discovery click', async () => {
    render(
      <RelatedPostItem
        post={mockPost}
        currentSlug="current-post"
        rank={3}
        kind="discovery"
      />,
    );

    const link = screen.getByRole('link', { name: /Sample Post Title/i });
    link.addEventListener('click', (event) => {
      event.preventDefault();
    });
    await userEvent.click(link);

    expect(mockSendGAEvent).toHaveBeenCalledWith('event', 'postNavigation', {
      type: 'discovery',
      value: 'current-post>sample-post#3',
    });
  });
});
