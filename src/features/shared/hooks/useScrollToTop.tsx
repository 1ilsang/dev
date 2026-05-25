'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef } from 'react';

const SCROLL_POSITIONS_KEY = 'scroll-positions';

const getScrollPositions = (): Record<string, number> => {
  try {
    const stored = sessionStorage.getItem(SCROLL_POSITIONS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const saveScrollPosition = (pathname: string, scrollY: number) => {
  try {
    const positions = getScrollPositions();
    positions[pathname] = scrollY;
    sessionStorage.setItem(SCROLL_POSITIONS_KEY, JSON.stringify(positions));
  } catch {
    return {};
  }
};

let isPopState = false;
if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    isPopState = true;
  });
}

export const ScrollToTop = () => {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 초기 로드 시 해시가 있으면 해당 요소로 스크롤
    const hash = window.location.hash;
    if (hash) {
      requestAnimationFrame(() => {
        const id = decodeURIComponent(hash.slice(1));
        document.getElementById(id)?.scrollIntoView();
      });
    }
  }, []);

  useLayoutEffect(() => {
    if (prevPathname.current === pathname) return;

    // 이전 페이지 스크롤 위치 저장
    saveScrollPosition(prevPathname.current, document.body.scrollTop);
    prevPathname.current = pathname;

    if (isPopState) {
      // 뒤로가기/앞으로가기: 스크롤 복원
      isPopState = false;
      const saved = getScrollPositions()[pathname];
      if (saved !== undefined) {
        requestAnimationFrame(() => {
          document.body.scrollTo(0, saved);
        });
      }
    } else {
      // 링크 클릭: 스크롤 0
      document.body.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};
