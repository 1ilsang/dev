let mockPathname = '/posts/test-slug';
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

const mockGa = jest.fn();
jest.mock('../../helpers/logger', () => ({
  ga: (...args: unknown[]) => mockGa(...args),
}));

import { renderHook } from '@testing-library/react';
import { usePostAnalytics } from './usePostAnalytics';

describe('usePostAnalytics', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    jest.useFakeTimers();
    mockPathname = '/posts/test-slug';
    mockGa.mockClear();
    sessionStorage.clear();
    localStorage.clear();

    Object.defineProperty(document.body, 'scrollTop', {
      value: 0,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(document.body, 'scrollHeight', {
      value: 2000,
      configurable: true,
    });
    Object.defineProperty(document.body, 'clientHeight', {
      value: 500,
      configurable: true,
    });

    container = document.createElement('div');
    container.id = 'post-body-container';
    document.body.appendChild(container);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('should not run on non-post pages', () => {
    mockPathname = '/about';
    renderHook(() => usePostAnalytics());
    jest.advanceTimersByTime(20000);
    expect(mockGa).not.toHaveBeenCalled();
  });

  describe('returnVisit', () => {
    it('should fire returnVisit when last visit was 1-7 days ago', () => {
      const twoDaysAgo = Date.now() - 2 * 24 * 60 * 60 * 1000;
      localStorage.setItem('last-visit-ts', String(twoDaysAgo));

      renderHook(() => usePostAnalytics());

      expect(mockGa).toHaveBeenCalledWith('returnVisit', {
        type: 'days-since',
        value: '2',
      });
    });

    it('should not fire returnVisit on first visit', () => {
      renderHook(() => usePostAnalytics());

      expect(mockGa).not.toHaveBeenCalledWith('returnVisit', expect.anything());
    });

    it('should not fire returnVisit if more than 7 days', () => {
      const tenDaysAgo = Date.now() - 10 * 24 * 60 * 60 * 1000;
      localStorage.setItem('last-visit-ts', String(tenDaysAgo));

      renderHook(() => usePostAnalytics());

      expect(mockGa).not.toHaveBeenCalledWith('returnVisit', expect.anything());
    });
  });

  describe('referrerType', () => {
    it('should detect search referrer', () => {
      Object.defineProperty(document, 'referrer', {
        value: 'https://www.google.com/search?q=react',
        configurable: true,
      });

      renderHook(() => usePostAnalytics());

      expect(mockGa).toHaveBeenCalledWith('referrerType', {
        type: 'search',
        value: 'test-slug',
      });
    });

    it('should detect social referrer', () => {
      Object.defineProperty(document, 'referrer', {
        value: 'https://twitter.com/someone/status/123',
        configurable: true,
      });

      renderHook(() => usePostAnalytics());

      expect(mockGa).toHaveBeenCalledWith('referrerType', {
        type: 'social',
        value: 'test-slug',
      });
    });

    it('should detect external referral', () => {
      Object.defineProperty(document, 'referrer', {
        value: 'https://other-blog.com/links',
        configurable: true,
      });

      renderHook(() => usePostAnalytics());

      expect(mockGa).toHaveBeenCalledWith('referrerType', {
        type: 'referral',
        value: 'test-slug',
      });
    });

    it('should not fire when no referrer', () => {
      Object.defineProperty(document, 'referrer', {
        value: '',
        configurable: true,
      });

      renderHook(() => usePostAnalytics());

      expect(mockGa).not.toHaveBeenCalledWith(
        'referrerType',
        expect.anything(),
      );
    });
  });

  describe('sessionDepth', () => {
    it('should fire sessionDepth on 2nd post visit', () => {
      sessionStorage.setItem('session-post-depth', '1');

      renderHook(() => usePostAnalytics());

      expect(mockGa).toHaveBeenCalledWith('sessionDepth', {
        type: 'post-count',
        value: '2',
      });
    });

    it('should not fire on first post visit', () => {
      renderHook(() => usePostAnalytics());

      expect(mockGa).not.toHaveBeenCalledWith(
        'sessionDepth',
        expect.anything(),
      );
    });
  });

  describe('postEngaged', () => {
    it('should fire after 15 seconds', () => {
      renderHook(() => usePostAnalytics());

      jest.advanceTimersByTime(14999);
      expect(mockGa).not.toHaveBeenCalledWith('postEngaged', expect.anything());

      jest.advanceTimersByTime(1);
      expect(mockGa).toHaveBeenCalledWith('postEngaged', {
        type: 'time-on-page',
        value: 'test-slug',
      });
    });
  });

  describe('scroll events', () => {
    const simulateScroll = (scrollTop: number) => {
      Object.defineProperty(document.body, 'scrollTop', {
        value: scrollTop,
        writable: true,
        configurable: true,
      });
      document.body.dispatchEvent(new Event('scroll'));
    };

    beforeEach(() => {
      // Use real addEventListener for scroll
      renderHook(() => usePostAnalytics());
    });

    it('should fire scrollMilestone at 25%', () => {
      // maxScroll = 2000 - 500 = 1500, 25% = 375
      simulateScroll(380);

      expect(mockGa).toHaveBeenCalledWith('scrollMilestone', {
        type: '25%',
        value: 'test-slug',
      });
    });

    it('should fire scrollMilestone at 50% and 75%', () => {
      simulateScroll(760); // 50%
      simulateScroll(1130); // 75%

      expect(mockGa).toHaveBeenCalledWith('scrollMilestone', {
        type: '50%',
        value: 'test-slug',
      });
      expect(mockGa).toHaveBeenCalledWith('scrollMilestone', {
        type: '75%',
        value: 'test-slug',
      });
    });

    it('should fire postReadComplete at 80%', () => {
      simulateScroll(1200); // 80%

      expect(mockGa).toHaveBeenCalledWith('postReadComplete', {
        type: 'scroll-depth',
        value: 'test-slug',
      });
    });

    it('should not fire milestones twice', () => {
      simulateScroll(380);
      simulateScroll(380);

      const calls = mockGa.mock.calls.filter(
        (c) => c[0] === 'scrollMilestone' && c[1].type === '25%',
      );
      expect(calls).toHaveLength(1);
    });

    it('should fire scrollReversal when scrolling up 200px from 300+', () => {
      simulateScroll(600);
      simulateScroll(350); // 600 - 350 = 250 > 200, lastScrollTop 600 > 300

      expect(mockGa).toHaveBeenCalledWith('scrollReversal', {
        type: 're-read',
        value: 'test-slug',
      });
    });

    it('should not fire scrollReversal for small scroll ups', () => {
      simulateScroll(400);
      simulateScroll(300); // only 100px up

      expect(mockGa).not.toHaveBeenCalledWith(
        'scrollReversal',
        expect.anything(),
      );
    });
  });

  describe('codeBlockView', () => {
    let observerCallback: (
      entries: { isIntersecting: boolean; target: Element }[],
    ) => void;

    beforeEach(() => {
      const MockIO = jest.fn((cb) => {
        observerCallback = cb;
        return {
          observe: jest.fn(),
          unobserve: jest.fn(),
          disconnect: jest.fn(),
        };
      });
      Object.defineProperty(window, 'IntersectionObserver', {
        value: MockIO,
        writable: true,
        configurable: true,
      });
    });

    it('should fire after code block is visible for 5 seconds', () => {
      const figure = document.createElement('figure');
      const pre = document.createElement('pre');
      const code = document.createElement('code');
      code.className = 'language-typescript';
      pre.appendChild(code);
      figure.appendChild(pre);
      container.appendChild(figure);

      renderHook(() => usePostAnalytics());

      observerCallback([{ isIntersecting: true, target: figure }]);
      jest.advanceTimersByTime(5000);

      expect(mockGa).toHaveBeenCalledWith('codeBlockView', {
        type: 'typescript',
        value: 'test-slug',
      });
    });

    it('should cancel timer when code block leaves viewport', () => {
      const figure = document.createElement('figure');
      const pre = document.createElement('pre');
      const code = document.createElement('code');
      code.className = 'language-javascript';
      pre.appendChild(code);
      figure.appendChild(pre);
      container.appendChild(figure);

      renderHook(() => usePostAnalytics());

      observerCallback([{ isIntersecting: true, target: figure }]);
      jest.advanceTimersByTime(3000);

      observerCallback([{ isIntersecting: false, target: figure }]);
      jest.advanceTimersByTime(3000);

      expect(mockGa).not.toHaveBeenCalledWith(
        'codeBlockView',
        expect.anything(),
      );
    });
  });

  describe('headingAnchorClick', () => {
    it('should fire on anchor click inside post body', () => {
      const link = document.createElement('a');
      link.href = '#my-heading';
      container.appendChild(link);

      renderHook(() => usePostAnalytics());

      link.click();

      expect(mockGa).toHaveBeenCalledWith('headingAnchorClick', {
        type: 'share-intent',
        value: 'my-heading',
      });
    });
  });

  describe('textCopy', () => {
    it('should fire on text copy with 10+ characters', () => {
      jest.spyOn(document, 'getSelection').mockReturnValue({
        toString: () => 'This is a meaningful selection of text',
      } as Selection);

      renderHook(() => usePostAnalytics());

      document.dispatchEvent(new Event('copy'));

      expect(mockGa).toHaveBeenCalledWith('textCopy', {
        type: 'selection',
        value: 'This is a meaningful selection of text',
      });
    });

    it('should not fire on short text copy', () => {
      jest.spyOn(document, 'getSelection').mockReturnValue({
        toString: () => 'short',
      } as Selection);

      renderHook(() => usePostAnalytics());

      document.dispatchEvent(new Event('copy'));

      expect(mockGa).not.toHaveBeenCalledWith('textCopy', expect.anything());
    });

    it('should truncate long selections to 80 chars', () => {
      const longText = 'a'.repeat(100);
      jest.spyOn(document, 'getSelection').mockReturnValue({
        toString: () => longText,
      } as Selection);

      renderHook(() => usePostAnalytics());

      document.dispatchEvent(new Event('copy'));

      expect(mockGa).toHaveBeenCalledWith('textCopy', {
        type: 'selection',
        value: 'a'.repeat(80),
      });
    });
  });

  describe('readingTime', () => {
    it('should fire readingTime on cleanup if post was read completely', () => {
      jest
        .spyOn(Date, 'now')
        .mockReturnValueOnce(1000000) // effect start
        .mockReturnValueOnce(1000000) // localStorage
        .mockReturnValue(1030000); // cleanup (30 seconds later)

      const { unmount } = renderHook(() => usePostAnalytics());

      // Mark as read
      Object.defineProperty(document.body, 'scrollTop', {
        value: 1300,
        writable: true,
        configurable: true,
      });
      document.body.dispatchEvent(new Event('scroll'));

      unmount();

      expect(mockGa).toHaveBeenCalledWith('readingTime', {
        type: 'seconds',
        value: expect.any(String),
      });
    });

    it('should not fire readingTime if post was not read completely', () => {
      const { unmount } = renderHook(() => usePostAnalytics());
      unmount();

      expect(mockGa).not.toHaveBeenCalledWith('readingTime', expect.anything());
    });
  });

  describe('cleanup', () => {
    it('should clear engaged timer on unmount', () => {
      const { unmount } = renderHook(() => usePostAnalytics());
      unmount();

      jest.advanceTimersByTime(20000);
      expect(mockGa).not.toHaveBeenCalledWith('postEngaged', expect.anything());
    });

    it('should remove all event listeners on unmount', () => {
      const removeSpy = jest.spyOn(document.body, 'removeEventListener');
      const docRemoveSpy = jest.spyOn(document, 'removeEventListener');

      const { unmount } = renderHook(() => usePostAnalytics());
      unmount();

      expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
      expect(docRemoveSpy).toHaveBeenCalledWith('copy', expect.any(Function));
    });
  });
});
