import { render, screen } from '@testing-library/react';
import { Avatar } from './Container';
import { MyProfile } from '~/about/headline/data/profile';

describe('rendering', () => {
  it('should visible', async () => {
    render(<Avatar />);
    expect(
      screen.getByRole('img', { name: '1ilsang character' }),
    ).toBeVisible();
  });

  it('should visible with nav prop', async () => {
    render(<Avatar nav />);
    expect(
      screen.getByRole('img', { name: '1ilsang character' }),
    ).toBeVisible();
  });
});

describe('attr', () => {
  it('should href be "/about"', async () => {
    render(<Avatar />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/about');
  });

  it('should same MyProfile', async () => {
    render(<Avatar />);
    const img = screen.getByAltText(MyProfile.personal.alt);
    expect(img).toHaveAttribute('src', MyProfile.personal.imageSrc);
  });
});

describe('styles', () => {
  it('should have default styles when nav is false', async () => {
    render(<Avatar />);
    const container = screen.getByRole('img', { name: '1ilsang character' });
    expect(container).toHaveClass('mr-2', 'w-9', 'h-9', 'md:w-12', 'md:h-12');

    const img = screen.getByAltText(MyProfile.personal.alt);
    expect(img).toHaveClass(
      'border',
      'border-solid',
      'rounded-full',
      'border-sub-blue',
    );
  });

  it('should have nav styles when nav is true', async () => {
    render(<Avatar nav />);
    const container = screen.getByRole('img', { name: '1ilsang character' });
    expect(container).toHaveClass('mr-2', 'w-8', 'h-8', 'mt-2');

    const img = screen.getByAltText(MyProfile.personal.alt);
    expect(img).toHaveClass(
      'border',
      'border-solid',
      'rounded-full',
      'border-white-blue',
    );
  });
});

describe('accessibility', () => {
  it('should have proper ARIA attributes', async () => {
    render(<Avatar />);
    const container = screen.getByRole('img', { name: '1ilsang character' });
    expect(container).toHaveAttribute('aria-label', '1ilsang character');
  });

  it('should have proper image alt text', async () => {
    render(<Avatar />);
    const img = screen.getByAltText(MyProfile.personal.alt);
    expect(img).toBeInTheDocument();
  });
});

describe('component', () => {
  it('should have proper displayName', () => {
    expect(Avatar.displayName).toBe('Avatar');
  });
});
