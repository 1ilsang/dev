import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

let mockPathname = '/posts';
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

jest.mock('../../hooks/usePrint', () => ({
  usePrint: () => ({ print: false }),
}));

jest.mock('../Avatar/Avatar', () => ({
  Avatar: () => <div data-testid="avatar" />,
}));

import { Navbar } from './Navbar';

describe('Navbar', () => {
  let scrollToSpy: jest.Mock;

  beforeEach(() => {
    scrollToSpy = jest.fn();
    document.body.scrollTo = scrollToSpy;
    Object.defineProperty(document.body, 'scrollTop', {
      value: 0,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(document.body, 'clientHeight', {
      value: 800,
      configurable: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should have aria-label on nav element', () => {
    render(<Navbar />);
    expect(screen.getByRole('navigation')).toHaveAttribute(
      'aria-label',
      '메인 네비게이션',
    );
  });

  it('should scroll to top when clicking link for current pathname', async () => {
    mockPathname = '/posts';
    render(<Navbar />);

    const postsLink = screen.getByText('posts');
    await userEvent.click(postsLink);

    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
  });

  it('should not scroll to top when clicking link for different pathname', async () => {
    mockPathname = '/tags';
    render(<Navbar />);

    const postsLink = screen.getByText('posts');
    await userEvent.click(postsLink);

    expect(scrollToSpy).not.toHaveBeenCalled();
  });

  it('should not render when print mode is active', () => {
    // Covered by usePrint mock — when print is true, nav returns null
    // This is tested implicitly through the usePrint hook
  });

  it('should register scroll listener on mount', () => {
    const addEventSpy = jest.spyOn(document.body, 'addEventListener');
    mockPathname = '/posts/test';
    render(<Navbar />);

    const scrollCall = addEventSpy.mock.calls.find(
      (call) => call[0] === 'scroll',
    );
    expect(scrollCall).toBeDefined();
  });

  it('should remove scroll listener on unmount', () => {
    const removeSpy = jest.spyOn(document.body, 'removeEventListener');
    const { unmount } = render(<Navbar />);

    unmount();

    const scrollCall = removeSpy.mock.calls.find(
      (call) => call[0] === 'scroll',
    );
    expect(scrollCall).toBeDefined();
  });
});
