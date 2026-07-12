import { render, screen } from '@testing-library/react';

import { MyProfile } from '~/about/headline/data/profile';
import { ProfileSection } from './ProfileSection';

describe('ProfileSection', () => {
  it('should render avatar, about link, and profile description', () => {
    render(<ProfileSection />);

    expect(
      screen.getByRole('link', { name: 'About 페이지로 이동' }),
    ).toBeVisible();
    expect(
      screen.getByRole('link', { name: MyProfile.personal.label }),
    ).toHaveAttribute('href', '/about');
    expect(screen.getByText(MyProfile.personal.description)).toBeVisible();
  });
});
