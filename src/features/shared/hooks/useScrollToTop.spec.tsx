import { render } from '@testing-library/react';

let mockPathname = '/posts';
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

import { ScrollToTop } from './useScrollToTop';

describe('ScrollToTop', () => {
  let scrollToSpy: jest.Mock;
  let rafCallbacks: FrameRequestCallback[];

  beforeEach(() => {
    mockPathname = '/posts';
    scrollToSpy = jest.fn();
    document.body.scrollTo = scrollToSpy;
    rafCallbacks = [];
    Object.defineProperty(document.body, 'scrollTop', {
      value: 0,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(window, 'location', {
      value: { hash: '' },
      writable: true,
      configurable: true,
    });
    Object.defineProperty(window.history, 'scrollRestoration', {
      value: 'auto',
      writable: true,
      configurable: true,
    });
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      rafCallbacks.push(cb);
      return rafCallbacks.length;
    });
    sessionStorage.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should set scrollRestoration to manual', () => {
    render(<ScrollToTop />);
    expect(window.history.scrollRestoration).toBe('manual');
  });

  it('should not scroll on initial mount', () => {
    render(<ScrollToTop />);
    expect(scrollToSpy).not.toHaveBeenCalled();
  });

  it('should scroll to 0 on pathname change (link click)', () => {
    const { rerender } = render(<ScrollToTop />);

    mockPathname = '/posts/test';
    rerender(<ScrollToTop />);

    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
  });

  it('should save previous scroll position on pathname change', () => {
    Object.defineProperty(document.body, 'scrollTop', {
      value: 500,
      writable: true,
      configurable: true,
    });

    const { rerender } = render(<ScrollToTop />);

    mockPathname = '/posts/test';
    rerender(<ScrollToTop />);

    const saved = JSON.parse(
      sessionStorage.getItem('scroll-positions') || '{}',
    );
    expect(saved['/posts']).toBe(500);
  });

  it('should restore scroll position on popstate (back/forward)', () => {
    sessionStorage.setItem(
      'scroll-positions',
      JSON.stringify({ '/posts': 300 }),
    );

    mockPathname = '/posts/test';
    const { rerender } = render(<ScrollToTop />);

    // Simulate popstate
    window.dispatchEvent(new PopStateEvent('popstate'));

    mockPathname = '/posts';
    rerender(<ScrollToTop />);

    // Should not scroll to 0
    expect(scrollToSpy).not.toHaveBeenCalledWith(0, 0);

    // Execute requestAnimationFrame callback
    rafCallbacks.forEach((cb) => cb(0));

    expect(scrollToSpy).toHaveBeenCalledWith(0, 300);
  });

  it('should not do anything when pathname stays the same', () => {
    const { rerender } = render(<ScrollToTop />);
    rerender(<ScrollToTop />);
    expect(scrollToSpy).not.toHaveBeenCalled();
  });

  it('should scroll to hash element on initial load', () => {
    Object.defineProperty(window, 'location', {
      value: { hash: '#my-heading' },
      writable: true,
      configurable: true,
    });

    const el = document.createElement('h2');
    el.id = 'my-heading';
    el.scrollIntoView = jest.fn();
    document.body.appendChild(el);

    render(<ScrollToTop />);

    // Execute requestAnimationFrame callback
    rafCallbacks.forEach((cb) => cb(0));

    expect(el.scrollIntoView).toHaveBeenCalled();
    document.body.removeChild(el);
  });

  it('should handle encoded hash on initial load', () => {
    const encodedHash = '#%EB%A6%AC%ED%8F%AC%EC%A7%80%ED%84%B0%EB%A6%AC';
    const decodedId = '리포지터리';

    Object.defineProperty(window, 'location', {
      value: { hash: encodedHash },
      writable: true,
      configurable: true,
    });

    const el = document.createElement('h2');
    el.id = decodedId;
    el.scrollIntoView = jest.fn();
    document.body.appendChild(el);

    render(<ScrollToTop />);

    rafCallbacks.forEach((cb) => cb(0));

    expect(el.scrollIntoView).toHaveBeenCalled();
    document.body.removeChild(el);
  });

  it('should not error when hash element does not exist', () => {
    Object.defineProperty(window, 'location', {
      value: { hash: '#nonexistent' },
      writable: true,
      configurable: true,
    });

    render(<ScrollToTop />);

    expect(() => {
      rafCallbacks.forEach((cb) => cb(0));
    }).not.toThrow();
  });
});
