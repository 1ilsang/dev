import { render, screen } from '@testing-library/react';

let mockPrint = false;
jest.mock('../hooks/usePrint', () => ({
  usePrint: () => ({ print: mockPrint }),
}));

import { Footer } from './Footer';

describe('Footer', () => {
  beforeEach(() => {
    mockPrint = false;
  });

  it('내부 및 외부 탐색 링크를 제공', () => {
    render(<Footer />);

    expect(screen.getByRole('contentinfo')).toBeVisible();
    expect(screen.getByRole('contentinfo')).toHaveClass('shrink-0');
    expect(screen.getByRole('link', { name: '1ilsang.dev' })).toHaveAttribute(
      'href',
      '/',
    );
    expect(screen.getAllByRole('link', { name: 'GitHub' })).toHaveLength(2);
    expect(screen.getAllByRole('link', { name: 'LinkedIn' })).toHaveLength(2);
    expect(screen.queryByText('EOF')).not.toBeInTheDocument();
  });

  it('인쇄 모드에서는 렌더링하지 않음', () => {
    mockPrint = true;
    const { container } = render(<Footer />);

    expect(container).toBeEmptyDOMElement();
  });
});
