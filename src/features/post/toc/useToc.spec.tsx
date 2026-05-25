import { renderHook, act } from '@testing-library/react';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock('../../shared/helpers/logger', () => ({
  ga: jest.fn(),
}));

import { useToc } from './useToc';
import type { TOC } from '../../posts/models';

const MOCK_TOC: TOC[] = [
  { depth: 2, value: 'Introduction', id: 'introduction' },
  { depth: 2, value: 'Setup', id: 'setup' },
  { depth: 3, value: 'Install', id: 'install' },
  { depth: 2, value: 'Conclusion', id: 'conclusion' },
];

describe('useToc', () => {
  let rafCallback: FrameRequestCallback;

  beforeEach(() => {
    mockPush.mockClear();
    jest.useFakeTimers();

    // Mock DOM elements for toc headings
    MOCK_TOC.forEach((item, idx) => {
      const el = document.createElement('h2');
      el.id = item.id;
      Object.defineProperty(el, 'offsetTop', {
        value: idx * 500,
        configurable: true,
      });
      el.scrollIntoView = jest.fn();
      document.body.appendChild(el);
    });

    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      rafCallback = cb;
      return 1;
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('should initialize with no activeId', () => {
    const { result } = renderHook(() => useToc({ toc: MOCK_TOC }));
    expect(result.current.activeId).toBeUndefined();
  });

  it('should set activeId based on scroll position after requestAnimationFrame', () => {
    Object.defineProperty(document.body, 'scrollTop', {
      value: 550,
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useToc({ toc: MOCK_TOC }));

    act(() => {
      rafCallback(0);
    });

    // scrollTop 550 + 100 = 650, so headings at 0, 500 qualify → closest is 'setup' (offsetTop 500)
    expect(result.current.activeId).toBe('setup');
  });

  it('should set activeId to last heading when scrolled to bottom', () => {
    Object.defineProperty(document.body, 'scrollTop', {
      value: 2000,
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useToc({ toc: MOCK_TOC }));

    act(() => {
      rafCallback(0);
    });

    expect(result.current.activeId).toBe('conclusion');
  });

  it('should clear targetActiveId after 1 second', () => {
    const { result } = renderHook(() => useToc({ toc: MOCK_TOC }));

    // Simulate a click to set targetActiveId
    const event = {
      preventDefault: jest.fn(),
      currentTarget: { id: 'setup' },
    } as unknown as React.MouseEvent<HTMLAnchorElement>;

    act(() => {
      result.current.handleIndexClick(event);
    });

    expect(result.current.targetActiveId).toBe('setup');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.targetActiveId).toBeUndefined();
  });

  it('should handle hashchange event', () => {
    renderHook(() => useToc({ toc: MOCK_TOC }));

    Object.defineProperty(window, 'location', {
      value: { hash: '#conclusion' },
      writable: true,
      configurable: true,
    });

    act(() => {
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });

    const el = document.getElementById('conclusion');
    expect(el?.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('handleIndexClick should push hash and set targetActiveId', () => {
    const { result } = renderHook(() => useToc({ toc: MOCK_TOC }));

    const event = {
      preventDefault: jest.fn(),
      currentTarget: { id: 'install' },
    } as unknown as React.MouseEvent<HTMLAnchorElement>;

    act(() => {
      result.current.handleIndexClick(event);
    });

    expect(event.preventDefault).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('#install', { scroll: false });
    expect(result.current.targetActiveId).toBe('install');
    expect(result.current.activeId).toBeUndefined();
  });
});
