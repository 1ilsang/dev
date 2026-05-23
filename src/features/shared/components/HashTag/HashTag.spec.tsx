import { render, screen } from '@testing-library/react';
import { HashTag } from './HashTag';

describe('HashTag', () => {
  it('should render with # prefix', () => {
    render(<HashTag link="/tags/react" content="react" />);
    expect(screen.getByText('#react')).toBeInTheDocument();
  });

  it('should have correct href', () => {
    render(<HashTag link="/tags/react" content="react" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/tags/react');
  });

  it('should have default target _self', () => {
    render(<HashTag link="/tags/react" content="react" />);
    expect(screen.getByRole('link')).toHaveAttribute('target', '_self');
  });

  it('should apply custom target', () => {
    render(<HashTag link="/tags/react" content="react" target="_blank" />);
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
  });

  it('should apply custom className', () => {
    render(<HashTag link="/tags/react" content="react" className="extra" />);
    expect(screen.getByRole('link')).toHaveClass('extra');
  });
});
