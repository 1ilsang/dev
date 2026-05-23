import { render, screen } from '@testing-library/react';
import { MainContainer } from './MainContainer';

describe('MainContainer', () => {
  it('should render children', () => {
    render(<MainContainer>Hello</MainContainer>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should render as section element', () => {
    render(<MainContainer>Content</MainContainer>);
    expect(screen.getByText('Content').closest('section')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <MainContainer className="extra">Content</MainContainer>,
    );
    expect(container.querySelector('section')).toHaveClass('extra');
  });
});
