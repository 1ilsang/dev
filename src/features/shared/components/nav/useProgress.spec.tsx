let mockPathname = '/posts/test-post';
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

import { renderHook, act } from '@testing-library/react';
import useProgress, { INIT_MAX } from './useProgress';

const LOADING_DURATION = 1300;
const INTERVAL_MS = 45;

const setBodyDimensions = (scrollHeight: number, clientHeight: number) => {
  Object.defineProperty(document.body, 'scrollHeight', {
    value: scrollHeight,
    configurable: true,
  });
  Object.defineProperty(document.body, 'clientHeight', {
    value: clientHeight,
    configurable: true,
  });
};

const setScrollTop = (value: number) => {
  Object.defineProperty(document.body, 'scrollTop', {
    value,
    writable: true,
    configurable: true,
  });
};

describe('useProgress', () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    jest.useFakeTimers();
    mockPathname = '/posts/test-post';
    setBodyDimensions(2000, 800);
    setScrollTop(0);
    // useProgress의 Promise+setTimeout 패턴에서 발생하는 act() 경고 억제
    console.error = (...args: unknown[]) => {
      if (typeof args[0] === 'string' && args[0].includes('not wrapped in act'))
        return;
      originalConsoleError(...args);
    };
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
    console.error = originalConsoleError;
  });

  describe('초기 상태', () => {
    it('progress=0, max=INIT_MAX으로 시작', () => {
      const { result } = renderHook(() => useProgress());
      expect(result.current.progress).toBe(0);
      expect(result.current.max).toBe(INIT_MAX);
    });
  });

  describe('로딩 애니메이션', () => {
    it('인터벌마다 progress가 증가', () => {
      const { result } = renderHook(() => useProgress());

      act(() => {
        jest.advanceTimersByTime(INTERVAL_MS * 3);
      });

      expect(result.current.progress).toBeGreaterThan(0);
      expect(result.current.max).toBe(INIT_MAX);
    });

    it('progress는 INIT_MAX를 넘으면 순환', () => {
      const { result } = renderHook(() => useProgress());

      // 0.02씩 증가하므로 50번 = 1.0 → 0으로 순환
      act(() => {
        jest.advanceTimersByTime(INTERVAL_MS * 51);
      });

      expect(result.current.progress).toBeLessThan(INIT_MAX);
    });
  });

  describe('로딩 완료 후 전환', () => {
    const waitForReady = async () => {
      // 이미지 로딩 Promise 해소 + setTimeout 스케줄링
      await act(async () => {
        await Promise.resolve();
        await Promise.resolve();
      });
      // LOADING_DURATION 대기
      await act(async () => {
        jest.advanceTimersByTime(LOADING_DURATION);
      });
    };

    it('max가 scrollHeight - clientHeight로 설정됨', async () => {
      const { result } = renderHook(() => useProgress());
      await waitForReady();
      expect(result.current.max).toBe(1200);
    });

    it('progress가 현재 scrollTop으로 설정됨', async () => {
      setScrollTop(400);
      const { result } = renderHook(() => useProgress());
      await waitForReady();
      expect(result.current.progress).toBe(400);
    });

    it('스크롤 시 DOM element를 직접 업데이트', async () => {
      const progressEl = document.createElement('progress');
      progressEl.id = 'nav-progress';
      progressEl.max = 2000;
      document.body.appendChild(progressEl);

      const addEventSpy = jest.spyOn(document.body, 'addEventListener');
      renderHook(() => useProgress());
      await waitForReady();

      const scrollCall = addEventSpy.mock.calls.find(
        (call) => call[0] === 'scroll',
      );
      expect(scrollCall).toBeDefined();
      expect(scrollCall![2]).toEqual({ passive: true });

      // 스크롤 핸들러 실행
      const scrollHandler = scrollCall![1] as () => void;
      setScrollTop(600);
      scrollHandler();
      expect(progressEl.value).toBe(600);

      document.body.removeChild(progressEl);
      addEventSpy.mockRestore();
    });
  });

  describe('클린업', () => {
    const waitForReady = async () => {
      await act(async () => {
        await Promise.resolve();
        await Promise.resolve();
      });
      await act(async () => {
        jest.advanceTimersByTime(LOADING_DURATION);
      });
    };

    it('언마운트 시 scroll 리스너 제거', async () => {
      const removeSpy = jest.spyOn(document.body, 'removeEventListener');

      const { unmount } = renderHook(() => useProgress());
      await waitForReady();

      unmount();
      expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
      removeSpy.mockRestore();
    });

    it('로딩 중 언마운트 시 인터벌 정리', () => {
      const { unmount } = renderHook(() => useProgress());
      unmount();
      act(() => {
        jest.advanceTimersByTime(INTERVAL_MS * 100);
      });
    });
  });

  describe('pathname 변경', () => {
    const waitForReady = async () => {
      await act(async () => {
        await Promise.resolve();
        await Promise.resolve();
      });
      await act(async () => {
        jest.advanceTimersByTime(LOADING_DURATION);
      });
    };

    it('pathname 변경 시 progress와 max 초기화', async () => {
      const { result, rerender } = renderHook(() => useProgress());
      await waitForReady();

      expect(result.current.max).toBe(1200);

      // pathname 변경
      mockPathname = '/posts/another-post';
      rerender();

      expect(result.current.progress).toBe(0);
      expect(result.current.max).toBe(INIT_MAX);
    });
  });
});
