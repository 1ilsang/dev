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

jest.mock('./useProgress', () => ({
  __esModule: true,
  INIT_MAX: 1,
  default: jest.fn(),
}));

jest.mock('./useBindZoomableImages', () => ({
  useBindZoomableImages: jest.fn(),
}));

jest.mock('./usePostAnalytics', () => ({
  usePostAnalytics: jest.fn(),
}));

import useProgress, { INIT_MAX } from './useProgress';
import { NavProgress } from './Progress';

const mockUseProgress = useProgress as jest.MockedFunction<typeof useProgress>;

describe('NavProgress', () => {
  beforeEach(() => {
    mockUseProgress.mockReturnValue({ progress: 0.3, max: INIT_MAX });
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

  it('should use loading progress style when max is INIT_MAX', () => {
    render(<NavProgress />);
    expect(screen.getByRole('progressbar')).toHaveClass(
      '[&::-webkit-progress-value]:bg-base-og',
    );
  });

  it('should use ready progress style when max is not INIT_MAX', () => {
    mockUseProgress.mockReturnValue({ progress: 40, max: 100 });
    render(<NavProgress />);
    expect(screen.getByRole('progressbar')).toHaveClass(
      '[&::-webkit-progress-value]:progress-wheel',
    );
  });
});
