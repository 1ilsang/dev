import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CategoryContainer } from './Container';
import { CATEGORY_LIST } from '../constants';

describe('CategoryContainer', () => {
  const defaultProps = {
    categoryFilter: new Set<string>(),
    onClearClick: jest.fn(),
    onCategoryClick: jest.fn(),
  };

  it('should render all categories', () => {
    render(<CategoryContainer {...defaultProps} />);
    CATEGORY_LIST.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('should call onClearClick when clear button clicked', async () => {
    render(<CategoryContainer {...defaultProps} />);
    await userEvent.click(
      screen.getByRole('button', { name: '카테고리 필터 초기화' }),
    );
    expect(defaultProps.onClearClick).toHaveBeenCalled();
  });

  it('should call onCategoryClick when category clicked', async () => {
    render(<CategoryContainer {...defaultProps} />);
    await userEvent.click(screen.getByText(CATEGORY_LIST[0]));
    expect(defaultProps.onCategoryClick).toHaveBeenCalled();
  });

  it('should highlight active category', () => {
    const filter = new Set([CATEGORY_LIST[0]]);
    render(<CategoryContainer {...defaultProps} categoryFilter={filter} />);
    expect(screen.getByText(CATEGORY_LIST[0])).toHaveClass('text-highlight');
  });

  it('should reflect selected state with aria-pressed', () => {
    const filter = new Set([CATEGORY_LIST[0]]);
    render(<CategoryContainer {...defaultProps} categoryFilter={filter} />);

    expect(screen.getByText(CATEGORY_LIST[0])).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByText(CATEGORY_LIST[1])).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });
});
