import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { sendGAEvent } from '@next/third-parties/google';

import { PrevNext } from './PrevNext';
import type { PostForNavigation } from './models';

jest.mock('@next/third-parties/google', () => ({
  sendGAEvent: jest.fn(),
}));

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

describe('PrevNext', () => {
  const mockSendGAEvent = sendGAEvent as jest.MockedFunction<
    typeof sendGAEvent
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render nothing when prev and next are both null', () => {
    const { container } = render(
      <PrevNext prev={null} next={null} currentSlug="current-post" />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('should render prev link only', () => {
    render(
      <PrevNext
        prev={createPost('prev-post')}
        next={null}
        currentSlug="current-post"
      />,
    );

    const prevLink = screen.getByRole('link', {
      name: '이전 글: prev-post title',
    });
    expect(prevLink).toHaveAttribute('href', '/posts/prev-post');
    expect(screen.getByText('← 이전 글')).toBeVisible();
    expect(screen.queryByText('다음 글 →')).not.toBeInTheDocument();
  });

  it('should render next link only', () => {
    render(
      <PrevNext
        prev={null}
        next={createPost('next-post')}
        currentSlug="current-post"
      />,
    );

    const nextLink = screen.getByRole('link', {
      name: '다음 글: next-post title',
    });
    expect(nextLink).toHaveAttribute('href', '/posts/next-post');
    expect(screen.getByText('다음 글 →')).toBeVisible();
    expect(screen.queryByText('← 이전 글')).not.toBeInTheDocument();
  });

  it('should render both prev and next links', () => {
    render(
      <PrevNext
        prev={createPost('prev-post')}
        next={createPost('next-post')}
        currentSlug="current-post"
      />,
    );

    expect(
      screen.getByRole('link', { name: '이전 글: prev-post title' }),
    ).toHaveAttribute('href', '/posts/prev-post');
    expect(
      screen.getByRole('link', { name: '다음 글: next-post title' }),
    ).toHaveAttribute('href', '/posts/next-post');
  });

  it('should track prev click', async () => {
    render(
      <PrevNext
        prev={createPost('prev-post')}
        next={null}
        currentSlug="current-post"
      />,
    );

    await userEvent.click(
      screen.getByRole('link', { name: '이전 글: prev-post title' }),
    );

    expect(mockSendGAEvent).toHaveBeenCalledWith('event', 'postNavigation', {
      type: 'prev',
      value: 'current-post>prev-post',
    });
  });

  it('should track next click', async () => {
    render(
      <PrevNext
        prev={null}
        next={createPost('next-post')}
        currentSlug="current-post"
      />,
    );

    await userEvent.click(
      screen.getByRole('link', { name: '다음 글: next-post title' }),
    );

    expect(mockSendGAEvent).toHaveBeenCalledWith('event', 'postNavigation', {
      type: 'next',
      value: 'current-post>next-post',
    });
  });
});
