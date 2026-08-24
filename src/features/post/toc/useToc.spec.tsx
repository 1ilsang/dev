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

const setScrollTop = (value: number) => {
  Object.defineProperty(document.body, 'scrollTop', {
    value,
    writable: true,
    configurable: true,
  });
};

const mockRaf = () => {
  let rafCallback: FrameRequestCallback;
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
    rafCallback = cb;
    return 1;
  });
  return () => rafCallback(0);
};

describe('useToc', () => {
  beforeEach(() => {
    mockPush.mockClear();
    jest.useFakeTimers();

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
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  describe('초기 activeId (동기 계산)', () => {
    it('scrollTop=0 → 첫 번째 헤딩 활성화', () => {
      setScrollTop(0);
      const { result } = renderHook(() => useToc({ toc: MOCK_TOC }));
      expect(result.current.activeId).toBe('introduction');
    });

    it('scrollTop=550 → offsetTop<=650인 마지막 헤딩(setup) 활성화', () => {
      setScrollTop(550);
      const { result } = renderHook(() => useToc({ toc: MOCK_TOC }));
      expect(result.current.activeId).toBe('setup');
    });

    it('scrollTop=2000 → 마지막 헤딩 활성화', () => {
      setScrollTop(2000);
      const { result } = renderHook(() => useToc({ toc: MOCK_TOC }));
      expect(result.current.activeId).toBe('conclusion');
    });

    it('DOM에 헤딩 요소가 없으면 undefined', () => {
      document.body.innerHTML = '';
      setScrollTop(0);
      const { result } = renderHook(() => useToc({ toc: MOCK_TOC }));
      expect(result.current.activeId).toBeUndefined();
    });
  });

  describe('스크롤 복원 (rAF)', () => {
    it('마운트 후 scrollTop이 변경되면 rAF에서 activeId 갱신', () => {
      setScrollTop(0);
      const flushRaf = mockRaf();

      const { result } = renderHook(() => useToc({ toc: MOCK_TOC }));
      expect(result.current.activeId).toBe('introduction');

      // 브라우저 스크롤 복원 시뮬레이션
      setScrollTop(1200);
      act(() => flushRaf());

      expect(result.current.activeId).toBe('install');
    });

    it('scrollTop이 변하지 않으면 rAF 후에도 동일한 activeId 유지', () => {
      setScrollTop(550);
      const flushRaf = mockRaf();

      const { result } = renderHook(() => useToc({ toc: MOCK_TOC }));
      expect(result.current.activeId).toBe('setup');

      act(() => flushRaf());
      expect(result.current.activeId).toBe('setup');
    });
  });

  describe('스크롤 기반 순차 활성화', () => {
    it('스크롤 위치에 따라 문서 순서대로 activeId 갱신', () => {
      setScrollTop(0);
      const { result } = renderHook(() => useToc({ toc: MOCK_TOC }));
      expect(result.current.activeId).toBe('introduction');

      setScrollTop(550);
      act(() => {
        document.body.dispatchEvent(new Event('scroll'));
      });
      expect(result.current.activeId).toBe('setup');

      setScrollTop(1100);
      act(() => {
        document.body.dispatchEvent(new Event('scroll'));
      });
      expect(result.current.activeId).toBe('install');

      setScrollTop(1600);
      act(() => {
        document.body.dispatchEvent(new Event('scroll'));
      });
      expect(result.current.activeId).toBe('conclusion');
    });

    it('언마운트 시 scroll 리스너 제거', () => {
      setScrollTop(0);
      const removeEventListener = jest.spyOn(
        document.body,
        'removeEventListener',
      );

      const { unmount } = renderHook(() => useToc({ toc: MOCK_TOC }));
      unmount();

      expect(removeEventListener).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
      );
    });
  });

  describe('handleIndexClick', () => {
    it('클릭 시 targetActiveId 설정, activeId 초기화', () => {
      setScrollTop(0);
      const { result } = renderHook(() => useToc({ toc: MOCK_TOC }));

      const event = {
        preventDefault: jest.fn(),
        currentTarget: { id: 'install' },
      } as unknown as React.MouseEvent<HTMLAnchorElement>;

      act(() => {
        result.current.handleIndexClick(event);
      });

      expect(event.preventDefault).toHaveBeenCalled();
      expect(result.current.targetActiveId).toBe('install');
      expect(result.current.activeId).toBeUndefined();
    });

    it('scrollIntoView가 smooth로 호출됨', () => {
      setScrollTop(0);
      const { result } = renderHook(() => useToc({ toc: MOCK_TOC }));

      const event = {
        preventDefault: jest.fn(),
        currentTarget: { id: 'setup' },
      } as unknown as React.MouseEvent<HTMLAnchorElement>;

      act(() => {
        result.current.handleIndexClick(event);
      });

      const el = document.getElementById('setup');
      expect(el?.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    });

    it('스크롤 완료 후 router.push 호출', () => {
      setScrollTop(0);
      jest.useFakeTimers();
      const { result } = renderHook(() => useToc({ toc: MOCK_TOC }));

      const event = {
        preventDefault: jest.fn(),
        currentTarget: { id: 'setup' },
      } as unknown as React.MouseEvent<HTMLAnchorElement>;

      act(() => {
        result.current.handleIndexClick(event);
      });

      // 즉시 호출되지 않음
      expect(mockPush).not.toHaveBeenCalled();

      // 100ms 후 (스크롤 없이 타임아웃) push 호출
      act(() => {
        jest.advanceTimersByTime(100);
      });

      expect(mockPush).toHaveBeenCalledWith('#setup', { scroll: false });
    });
  });

  describe('targetActiveId 타이머', () => {
    it('1초 후 targetActiveId가 undefined로 초기화', () => {
      setScrollTop(0);
      const { result } = renderHook(() => useToc({ toc: MOCK_TOC }));

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

    it('1초 이전에는 targetActiveId 유지', () => {
      setScrollTop(0);
      const { result } = renderHook(() => useToc({ toc: MOCK_TOC }));

      const event = {
        preventDefault: jest.fn(),
        currentTarget: { id: 'setup' },
      } as unknown as React.MouseEvent<HTMLAnchorElement>;

      act(() => {
        result.current.handleIndexClick(event);
      });

      act(() => {
        jest.advanceTimersByTime(999);
      });
      expect(result.current.targetActiveId).toBe('setup');
    });
  });

  describe('hashchange 이벤트', () => {
    it('hashchange 시 해당 요소로 스크롤 및 targetActiveId 설정', () => {
      setScrollTop(0);
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
  });
});
