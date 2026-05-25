let mockPathname = '/posts/test-post';
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

import { renderHook, act } from '@testing-library/react';
import useProgress, { INIT_MAX } from './useProgress';

describe('useProgress', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockPathname = '/posts/test-post';

    Object.defineProperty(document.body, 'scrollHeight', {
      value: 2000,
      configurable: true,
    });
    Object.defineProperty(document.body, 'clientHeight', {
      value: 800,
      configurable: true,
    });
    Object.defineProperty(document.body, 'scrollTop', {
      value: 0,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('should initialize with progress 0 and max INIT_MAX', () => {
    const { result } = renderHook(() => useProgress());
    expect(result.current.progress).toBe(0);
    expect(result.current.max).toBe(INIT_MAX);
  });

  it('should set max to scrollHeight - clientHeight after loading', async () => {
    const { result } = renderHook(() => useProgress());

    // Resolve pending images (none in test)
    await act(async () => {
      await Promise.resolve();
    });

    // Advance past LOADING_DURATION (1300ms)
    await act(async () => {
      jest.advanceTimersByTime(1300);
    });

    expect(result.current.max).toBe(1200); // 2000 - 800
  });

  it('should reflect current scrollTop as progress after loading', async () => {
    Object.defineProperty(document.body, 'scrollTop', {
      value: 400,
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useProgress());

    await act(async () => {
      await Promise.resolve();
    });
    await act(async () => {
      jest.advanceTimersByTime(1300);
    });

    expect(result.current.progress).toBe(400);
  });

  it('should update DOM element directly on scroll', async () => {
    const progressEl = document.createElement('progress');
    progressEl.id = 'nav-progress';
    progressEl.max = 2000;
    document.body.appendChild(progressEl);

    const addEventSpy = jest.spyOn(document.body, 'addEventListener');

    renderHook(() => useProgress());

    await act(async () => {
      await Promise.resolve();
    });
    await act(async () => {
      jest.advanceTimersByTime(1300);
    });

    const scrollCall = addEventSpy.mock.calls.find(
      (call) => call[0] === 'scroll',
    );
    expect(scrollCall).toBeDefined();
    expect(scrollCall![2]).toEqual({ passive: true });

    const scrollHandler = scrollCall![1] as () => void;
    Object.defineProperty(document.body, 'scrollTop', {
      value: 600,
      writable: true,
      configurable: true,
    });
    scrollHandler();

    expect(progressEl.value).toBe(600);

    document.body.removeChild(progressEl);
    addEventSpy.mockRestore();
  });

  it('should clean up scroll listener on unmount', async () => {
    const removeSpy = jest.spyOn(document.body, 'removeEventListener');

    const { unmount } = renderHook(() => useProgress());

    await act(async () => {
      await Promise.resolve();
    });
    await act(async () => {
      jest.advanceTimersByTime(1300);
    });

    unmount();

    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeSpy.mockRestore();
  });

  it('should show loading animation during interval phase', async () => {
    const { result } = renderHook(() => useProgress());

    // Advance a few intervals (45ms each)
    act(() => {
      jest.advanceTimersByTime(45 * 3);
    });

    // Progress should have incremented from 0
    expect(result.current.progress).toBeGreaterThan(0);
    expect(result.current.max).toBe(INIT_MAX);
  });
});
