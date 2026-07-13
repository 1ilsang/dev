import { render, screen } from '@testing-library/react';

import { ExternalAnchor } from './ExternalAnchor';

describe('ExternalAnchor', () => {
  it('should render external link with accessibility attributes', () => {
    render(<ExternalAnchor href="https://example.com" />);

    const link = screen.getByRole('link', {
      name: '외부 링크: https://example.com',
    });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveAttribute('title', 'https://example.com');
    expect(screen.getByText('⎋')).toHaveAttribute('aria-hidden', 'true');
  });
});
