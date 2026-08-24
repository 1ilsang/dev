export const THEME_STORAGE_KEY = '1ilsang-theme';
export const THEME_COLOR = {
  light: '#fcfcfb',
  dark: 'rgb(20 22 33)',
} as const;

export const THEME_INIT_SCRIPT = `
  try {
    const theme = localStorage.getItem('${THEME_STORAGE_KEY}');
    if (theme === 'light' || theme === 'dark') {
      document.documentElement.dataset.theme = theme;
    }
  } catch {}
`;
