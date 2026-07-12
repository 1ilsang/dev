import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ga } from '../shared/helpers/logger';

import { HomeContainer } from './Container';

jest.mock('../shared/helpers/logger', () => ({
  ga: jest.fn(),
}));

describe('HomeContainer', () => {
  it('should link to posts with accessible name', () => {
    render(<HomeContainer />);

    expect(
      screen.getByRole('link', { name: '포스트 목록으로 이동' }),
    ).toHaveAttribute('href', '/posts');
  });

  it('should expose hover hint via title', () => {
    render(<HomeContainer />);

    expect(
      screen.getByRole('link', { name: '포스트 목록으로 이동' }),
    ).toHaveAttribute('title', '포스트 목록으로 이동');
  });

  it('should be skip link target', () => {
    render(<HomeContainer />);

    expect(document.getElementById('main-content')).toHaveAttribute(
      'tabIndex',
      '-1',
    );
  });

  it('should fire analytics on click', async () => {
    render(<HomeContainer />);

    const link = screen.getByRole('link', { name: '포스트 목록으로 이동' });
    link.addEventListener('click', (event) => {
      event.preventDefault();
    });
    await userEvent.click(link);

    expect(ga).toHaveBeenCalledWith('homeClick', {
      type: 'router-push',
      value: '/posts',
    });
  });
});
