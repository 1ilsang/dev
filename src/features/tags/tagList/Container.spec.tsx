import { render, screen } from '@testing-library/react';

import { TagListContainer } from './Container';

describe('TagListContainer', () => {
  it('should render heading, topic count, and hashtags', () => {
    render(
      <TagListContainer
        tags={[
          {
            name: 'react',
            postCount: 3,
            relatedTags: ['testing', 'typescript'],
          },
          { name: 'testing', postCount: 2, relatedTags: ['react'] },
        ]}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Tags' })).toBeVisible();
    expect(screen.getByText('2 topics')).toBeVisible();
    expect(screen.getByRole('list', { name: '태그 목록' })).toBeVisible();
    expect(
      screen
        .getAllByRole('link', { name: '#react' })
        .every((link) => link.getAttribute('href') === '/tags/react'),
    ).toBe(true);
    expect(
      screen
        .getAllByRole('link', { name: '#testing' })
        .every((link) => link.getAttribute('href') === '/tags/testing'),
    ).toBe(true);
    expect(screen.getByText('3 posts')).toBeVisible();
    expect(
      screen.getByRole('navigation', { name: 'react 관련 태그' }),
    ).toBeVisible();
    expect(screen.getAllByRole('link', { name: '#react' })[0]).toHaveClass(
      'after:inset-0',
    );
    expect(
      screen.getByRole('navigation', { name: 'react 관련 태그' }),
    ).toHaveClass('relative', 'z-10');
  });

  it('should render only heading when tags are empty', () => {
    render(<TagListContainer tags={[]} />);

    expect(screen.getByRole('heading', { name: 'Tags' })).toBeInTheDocument();
    expect(screen.getByText('0 topics')).toBeVisible();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
