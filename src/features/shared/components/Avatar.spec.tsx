import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';
import { MyProfile } from '~/about/headline/data/profile';

describe('rendering', () => {
  it('should visible', async () => {
    render(<Avatar />);
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
