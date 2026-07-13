import { render, screen } from '@testing-library/react';

import { TagListContainer } from './Container';

describe('TagListContainer', () => {
  it('should render sr-only heading and hashtags', () => {
    render(<TagListContainer tags={['react', 'testing']} />);

    expect(screen.getByRole('heading', { name: 'Tags' })).toHaveClass(
      'sr-only',
    );
    expect(screen.getByRole('link', { name: '#react' })).toHaveAttribute(
      'href',
      '/tags/react',
    );
    expect(screen.getByRole('link', { name: '#testing' })).toHaveAttribute(
      'href',
      '/tags/testing',
    );
  });

  it('should render only heading when tags are empty', () => {
    render(<TagListContainer tags={[]} />);

    expect(screen.getByRole('heading', { name: 'Tags' })).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
