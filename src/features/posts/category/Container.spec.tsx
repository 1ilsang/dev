import { render, screen } from '@testing-library/react';
import { CategoryContainer } from './Container';
import { CATEGORY_LIST } from '../constants';

describe('CategoryContainer', () => {
  it('should render all categories', () => {
    render(<CategoryContainer />);
    CATEGORY_LIST.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('should link clear control to all posts', () => {
    render(<CategoryContainer />);
    expect(
      screen.getByRole('link', { name: '카테고리 필터 초기화' }),
    ).toHaveAttribute('href', '/posts');
  });

  it('should link categories to static category routes', () => {
    render(<CategoryContainer />);
    expect(screen.getByRole('link', { name: 'JavaScript' })).toHaveAttribute(
      'href',
      '/posts/javascript',
    );
  });

  it('should highlight active category', () => {
    render(<CategoryContainer activeCategory={CATEGORY_LIST[0]} />);
    expect(screen.getByText(CATEGORY_LIST[0])).toHaveClass('text-highlight');
  });

  it('should expose active category with aria-current', () => {
    render(<CategoryContainer activeCategory={CATEGORY_LIST[0]} />);
    expect(screen.getByText(CATEGORY_LIST[0])).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByText(CATEGORY_LIST[1])).not.toHaveAttribute(
      'aria-current',
    );
  });
});
