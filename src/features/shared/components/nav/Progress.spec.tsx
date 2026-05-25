import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  usePathname: () => '/posts',
}));

jest.mock('jotai', () => ({
  useSetAtom: () => jest.fn(),
}));

jest.mock('../modal/atoms', () => ({
  imageSrcAtom: {},
  imageAltAtom: {},
}));

import { NavProgress } from './Progress';

describe('NavProgress', () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    console.error = (...args: unknown[]) => {
      if (typeof args[0] === 'string' && args[0].includes('not wrapped in act'))
        return;
      originalConsoleError(...args);
    };
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it('should render progress element with aria-label', () => {
    render(<NavProgress />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-label', '페이지 읽기 진행률');
  });

  it('should have id for direct DOM updates', () => {
    render(<NavProgress />);
    expect(document.getElementById('nav-progress')).toBeInTheDocument();
  });
});
