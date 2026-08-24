'use client';

import { useEffect, useState } from 'react';
import { THEME_COLOR, THEME_STORAGE_KEY } from '~/shared/constants/theme';

type Theme = 'light' | 'dark';

const updateThemeColor = (theme: Theme) => {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLOR[theme]);
};

const getEffectiveTheme = (): Theme => {
  const savedTheme =
    document.documentElement.dataset.theme ??
    localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;

  return 'dark';
};

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>();

  useEffect(() => {
    const effectiveTheme = getEffectiveTheme();
    document.documentElement.dataset.theme = effectiveTheme;
    updateThemeColor(effectiveTheme);
    setTheme(effectiveTheme);
  }, []);

  const handleClick = () => {
    const nextTheme =
      (theme ?? getEffectiveTheme()) === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    updateThemeColor(nextTheme);
    setTheme(nextTheme);
  };

  const nextTheme = theme === 'dark' ? '라이트' : '다크';

  return (
    <button
      type="button"
      className="flex w-full cursor-pointer items-center gap-2 rounded-sm border border-base/40 px-3 py-2 text-left text-xs text-sub-blue transition-colors hover:border-base/70 hover:bg-base/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
      aria-label={`${nextTheme} 모드로 전환`}
      onClick={handleClick}
    >
      <svg
        aria-hidden="true"
        className="h-4 w-4 flex-none"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
        viewBox="0 0 24 24"
      >
        {theme === 'dark' ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M20.5 15.5A8 8 0 0 1 8.5 3.5a8.5 8.5 0 1 0 12 12z" />
        )}
      </svg>
      <span>{nextTheme} 모드</span>
    </button>
  );
};
