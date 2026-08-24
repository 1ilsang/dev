import { fireEvent, render, screen } from '@testing-library/react';
import { THEME_STORAGE_KEY } from '~/shared/constants/theme';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    delete document.documentElement.dataset.theme;
    localStorage.clear();
    const themeColor = document.createElement('meta');
    themeColor.name = 'theme-color';
    document.head.appendChild(themeColor);
  });

  afterEach(() => {
    document.querySelector('meta[name="theme-color"]')?.remove();
  });

  it('저장된 설정이 없으면 다크 모드를 기본으로 사용', () => {
    render(<ThemeToggle />);

    expect(
      screen.getByRole('button', { name: '라이트 모드로 전환' }),
    ).toHaveClass('cursor-pointer');
  });

  it('선택한 테마를 문서와 저장소에 반영', () => {
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole('button', { name: '라이트 모드로 전환' }));

    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute(
      'content',
      '#fcfcfb',
    );
    expect(
      screen.getByRole('button', { name: '다크 모드로 전환' }),
    ).toBeVisible();
  });

  it('저장된 라이트 모드를 복원', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'light');

    render(<ThemeToggle />);

    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(
      screen.getByRole('button', { name: '다크 모드로 전환' }),
    ).toBeVisible();
  });
});
