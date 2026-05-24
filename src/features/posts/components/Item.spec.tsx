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
    expect(screen.getByAltText('cover')).toHaveAttribute(
      'src',
      '/images/test.png',
    );
  });

  it('should show when categoryFilter is empty', () => {
    const { container } = render(
      <PostItem post={mockPost} categoryFilter={new Set()} />,
    );
    expect(container.querySelector('li')).not.toHaveClass('h-0');
  });

  it('should show when category matches filter', () => {
    const { container } = render(
      <PostItem post={mockPost} categoryFilter={new Set(['JavaScript'])} />,
    );
    expect(container.querySelector('li')).not.toHaveClass('h-0');
  });

  it('should hide when category does not match filter', () => {
    const { container } = render(
      <PostItem post={mockPost} categoryFilter={new Set(['Rust'])} />,
    );
    expect(container.querySelector('li')).toHaveClass('h-0');
  });

  it('should link to correct post URL', () => {
    render(<PostItem post={mockPost} categoryFilter={new Set()} />);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/posts/test-post',
    );
  });
});
