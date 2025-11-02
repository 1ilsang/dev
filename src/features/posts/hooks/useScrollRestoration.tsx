'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';

const SCROLL_POSITIONS_KEY = 'scroll-positions';

const getScrollPositions = (): Map<string, number> => {
  if (typeof window === 'undefined') return new Map();

  try {
    const stored = sessionStorage.getItem(SCROLL_POSITIONS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return new Map(
        Object.entries(parsed).map(([key, value]) => [key, Number(value)]),
      );
    }
  } catch (error) {
    console.warn('Failed to load scroll positions from sessionStorage:', error);
  }

  return new Map();
};

const saveScrollPositions = (positions: Map<string, number>) => {
  if (typeof window === 'undefined') return;

  try {
    const obj = Object.fromEntries(positions.entries());
    sessionStorage.setItem(SCROLL_POSITIONS_KEY, JSON.stringify(obj));
  } catch (error) {
    console.warn('Failed to save scroll positions to sessionStorage:', error);
  }
};

export const useScrollRestoration = () => {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 스크롤 점프 방지를 위한 CSS 조작
    const preventScrollJump = () => {
      const positions = getScrollPositions();
      const savedPosition = positions.get(pathname);

      if (savedPosition !== undefined) {
        document.documentElement.style.scrollBehavior = 'auto';
        document.body.scrollTo(0, savedPosition);
        requestAnimationFrame(() => {
          document.documentElement.style.scrollBehavior = '';
        });
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', preventScrollJump);
    } else {
      preventScrollJump();
    }

    // 페이지 이탈 시 현재 스크롤 위치 저장
    const handleBeforeUnload = () => {
      // NOTE: posts 기준으로 body에 스크롤이 있음. window.scrollY가 필요하다면 개선 필요
      const scrollY = document.body.scrollTop;
      const positions = getScrollPositions();
      positions.set(pathname, scrollY);
      saveScrollPositions(positions);
    };
    return () => {
      handleBeforeUnload();
    };
  }, [pathname]);
};
