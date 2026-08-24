import { render, screen, act, fireEvent } from '@testing-library/react';

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
  let scrollBySpy: jest.Mock;

  beforeEach(() => {
    scrollToSpy = jest.fn();
    scrollBySpy = jest.fn();
    document.body.scrollTo = scrollToSpy;
    document.body.scrollBy = scrollBySpy;
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
      const navigation = screen.getByRole('navigation');
      expect(navigation).toHaveAttribute('aria-label', '메인 네비게이션');
      expect(navigation).toHaveClass(
        'xl:left-0',
        'xl:w-[calc((100vw-1280px)/2+256px)]',
      );
    });

    it('posts 하위에 카테고리 링크 표시', () => {
      render(<Navbar />);

      const categoryTree = screen.getByRole('list', {
        name: '포스트 카테고리',
      });
      expect(categoryTree).toBeVisible();
      expect(screen.getByRole('link', { name: 'JavaScript' })).toHaveAttribute(
        'href',
        '/posts/javascript',
      );
      expect(screen.getByRole('link', { name: 'Rust' })).toHaveAttribute(
        'href',
        '/posts/rust',
      );
    });

    it('프로필 이름과 직무를 같은 세로 영역에 표시', () => {
      render(<Navbar />);

      const desktopLogo = screen.getByRole('link', {
        name: '1ilsang.dev Software Engineer',
      });
      const role = screen.getByText('Software Engineer');

      expect(desktopLogo).toContainElement(role);
      expect(desktopLogo).toHaveClass('hover:no-underline');
      expect(desktopLogo).not.toHaveClass('hover:underline');
      expect(desktopLogo).toHaveClass('xl:px-1');
      expect(role.parentElement).toHaveClass('flex-col');
    });

    it('카테고리 경로에서는 카테고리 링크만 현재 위치로 표시', () => {
      mockPathname = '/posts/javascript';
      render(<Navbar />);

      expect(screen.getByRole('link', { name: 'JavaScript' })).toHaveAttribute(
        'aria-current',
        'page',
      );
      expect(
        screen.getAllByRole('link', { name: 'Posts' })[0],
      ).not.toHaveAttribute('aria-current');
    });

    it('포스트 상세에서는 해당 글의 카테고리를 현재 위치로 표시', () => {
      mockPathname = '/post/test-post';
      render(<Navbar activeCategory="Rust" />);

      expect(screen.getByRole('link', { name: 'Rust' })).toHaveAttribute(
        'aria-current',
        'page',
      );
      expect(
        screen.getByRole('link', { name: 'JavaScript' }),
      ).not.toHaveAttribute('aria-current');
      expect(
        screen.getAllByRole('link', { name: 'Posts' })[0],
      ).not.toHaveAttribute('aria-current');
    });

    it('태그 상세에서는 tags를 현재 위치로 표시', () => {
      mockPathname = '/tags/javascript';
      render(<Navbar />);

      expect(screen.getAllByRole('link', { name: 'Tags' })[0]).toHaveAttribute(
        'aria-current',
        'page',
      );
    });

    it('print 모드에서 null 반환', () => {
      mockPrint = true;
      const { container } = render(<Navbar />);
      expect(container.innerHTML).toBe('');
    });
  });

  describe('NavText 클릭', () => {
    it('현재 pathname과 같은 링크 클릭 시 scrollTo(0,0)', () => {
      mockPathname = '/posts';
      render(<Navbar />);
      fireEvent.click(screen.getAllByText('Posts')[0], { button: 1 });
      expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
    });

    it('다른 pathname 링크 클릭 시 scrollTo 미호출', () => {
      mockPathname = '/tags';
      render(<Navbar />);
      fireEvent.click(screen.getAllByText('Posts')[0], { button: 1 });
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

  describe('사이드바 휠', () => {
    it('휠 입력을 본문 스크롤로 전달', () => {
      render(<Navbar />);

      fireEvent.wheel(screen.getByRole('navigation'), {
        deltaMode: WheelEvent.DOM_DELTA_PIXEL,
        deltaY: 120,
      });

      expect(scrollBySpy).toHaveBeenCalledWith({
        top: 120,
        left: 0,
        behavior: 'auto',
      });
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
