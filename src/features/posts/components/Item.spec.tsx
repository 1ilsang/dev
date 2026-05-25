import { render, screen } from '@testing-library/react';
import { PostItem } from './Item';
import type { ServerPost } from '~/app/posts/page';

const mockPost: ServerPost = {
  slug: 'test-post',
  category: 'JavaScript',
  frontmatter: {
    title: 'Test Title',
    coverImage: '/images/test.png',
    description: 'Test description',
    date: '2024-01-15T09:30:00',
    tags: [],
  },
  toc: [],
  url: '/posts/test-post',
  fullSlug: 'test-post',
  readingTime: 6,
};

describe('PostItem', () => {
  it('should render post title', () => {
    render(<PostItem post={mockPost} categoryFilter={new Set()} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should render post description', () => {
    render(<PostItem post={mockPost} categoryFilter={new Set()} />);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('should render cover image', () => {
    render(<PostItem post={mockPost} categoryFilter={new Set()} />);
    expect(screen.getByAltText('Test Title 썸네일')).toHaveAttribute(
      'src',
      '/images/test.png',
    );
  });

  it('should show when categoryFilter is empty', () => {
    render(<PostItem post={mockPost} categoryFilter={new Set()} />);
    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });

  it('should show when category matches filter', () => {
    render(
      <PostItem post={mockPost} categoryFilter={new Set(['JavaScript'])} />,
    );
    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });

  it('should hide when category does not match filter', () => {
    render(<PostItem post={mockPost} categoryFilter={new Set(['Rust'])} />);
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should link to correct post URL', () => {
    render(<PostItem post={mockPost} categoryFilter={new Set()} />);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/posts/test-post',
    );
  });
});
