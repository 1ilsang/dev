import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

let mockPathname = '/posts';
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

let mockPrint = false;
jest.mock('../../hooks/usePrint', () => ({
  usePrint: () => ({ print: mockPrint }),
}));

jest.mock('../Avatar/Avatar', () => ({
  Avatar: () => <div data-testid="avatar" />,
}));

import { Navbar } from './Navbar';

const setScrollTop = (value: number) => {
  Object.defineProperty(document.body, 'scrollTop', {
    value,
    writable: true,
    configurable: true,
  });
};

describe('Navbar', () => {
  let scrollToSpy: jest.Mock;

  beforeEach(() => {
    scrollToSpy = jest.fn();
    document.body.scrollTo = scrollToSpy;
    mockPathname = '/posts';
    mockPrint = false;
    setScrollTop(0);
    Object.defineProperty(document.body, 'clientHeight', {
      value: 800,
      configurable: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('렌더링', () => {
    it('nav에 aria-label 설정', () => {
      render(<Navbar />);
      expect(screen.getByRole('navigation')).toHaveAttribute(
        'aria-label',
        '메인 네비게이션',
      );
    });

    it('print 모드에서 null 반환', () => {
      mockPrint = true;
      const { container } = render(<Navbar />);
      expect(container.innerHTML).toBe('');
    });
  });

  describe('NavText 클릭', () => {
    it('현재 pathname과 같은 링크 클릭 시 scrollTo(0,0)', async () => {
      mockPathname = '/posts';
      render(<Navbar />);
      await userEvent.click(screen.getByText('posts'));
      expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
    });

    it('다른 pathname 링크 클릭 시 scrollTo 미호출', async () => {
      mockPathname = '/tags';
      render(<Navbar />);
      await userEvent.click(screen.getByText('posts'));
      expect(scrollToSpy).not.toHaveBeenCalled();
    });
  });

  describe('navShadow', () => {
    it('/ 경로에서는 shadow 클래스 없음', () => {
      mockPathname = '/';
      render(<Navbar />);
      const nav = screen.getByRole('navigation');
      expect(nav.className).not.toContain('shadow-nav');
    });

    it('/about 경로에서는 shadow 클래스 없음', () => {
      mockPathname = '/about';
      render(<Navbar />);
      const nav = screen.getByRole('navigation');
      expect(nav.className).not.toContain('shadow-nav');
    });

    it('/posts 경로에서 scrollDown=false이면 shadow 클래스 있음', () => {
      mockPathname = '/posts';
      setScrollTop(0);
      render(<Navbar />);
      const nav = screen.getByRole('navigation');
      expect(nav.className).toContain('shadow-nav');
    });
  });

  describe('scrollDown 상태', () => {
    it('마운트 시 scrollTop > 50이면 scrollDown=true (새로고침 복원)', () => {
      mockPathname = '/posts';
      setScrollTop(100);
      render(<Navbar />);
      // scrollDown=true → shadow 제거
      const nav = screen.getByRole('navigation');
      expect(nav.className).not.toContain('shadow-nav');
    });

    it('스크롤 이벤트로 scrollTop > 50 되면 shadow 제거', () => {
      mockPathname = '/posts';
      setScrollTop(0);

      const addEventSpy = jest.spyOn(document.body, 'addEventListener');
      render(<Navbar />);

      const scrollCall = addEventSpy.mock.calls.find(
        (call) => call[0] === 'scroll',
      );
      const scrollHandler = scrollCall![1] as () => void;

      setScrollTop(100);
      act(() => {
        scrollHandler();
      });

      const nav = screen.getByRole('navigation');
      expect(nav.className).not.toContain('shadow-nav');
    });

    it('스크롤 이벤트로 scrollTop <= 50 되면 shadow 복원', () => {
      mockPathname = '/posts';
      setScrollTop(100);

      const addEventSpy = jest.spyOn(document.body, 'addEventListener');
      render(<Navbar />);

      const scrollCall = addEventSpy.mock.calls.find(
        (call) => call[0] === 'scroll',
      );
      const scrollHandler = scrollCall![1] as () => void;

      setScrollTop(30);
      act(() => {
        scrollHandler();
      });

      const nav = screen.getByRole('navigation');
      expect(nav.className).toContain('shadow-nav');
    });
  });

  describe('클린업', () => {
    it('마운트 시 scroll 리스너 등록', () => {
      const addEventSpy = jest.spyOn(document.body, 'addEventListener');
      render(<Navbar />);
      const scrollCall = addEventSpy.mock.calls.find(
        (call) => call[0] === 'scroll',
      );
      expect(scrollCall).toBeDefined();
    });

    it('언마운트 시 scroll 리스너 제거', () => {
      const removeSpy = jest.spyOn(document.body, 'removeEventListener');
      const { unmount } = render(<Navbar />);
      unmount();
      const scrollCall = removeSpy.mock.calls.find(
        (call) => call[0] === 'scroll',
      );
      expect(scrollCall).toBeDefined();
    });
  });
});
