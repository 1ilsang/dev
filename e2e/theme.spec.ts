import { expect, test, type Page } from '@playwright/test';
import { THEME_STORAGE_KEY } from '~/shared/constants/theme';
import { gotoUrl, screenshotFullPage } from './shared/utils';

const getThemeColors = async (page: Page) =>
  page.evaluate(() => {
    const codeToken = document.querySelector<HTMLElement>(
      '.markdown figure code span[style*="--shiki-light"]',
    );

    return {
      background: getComputedStyle(document.body).backgroundColor,
      foreground: getComputedStyle(document.body).color,
      codeColor: codeToken ? getComputedStyle(codeToken).color : '',
      shikiLight: codeToken?.style.getPropertyValue('--shiki-light') ?? '',
      shikiDark: codeToken?.style.getPropertyValue('--shiki-dark') ?? '',
    };
  });

test('defaults to dark mode without a saved preference', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await gotoUrl({ page, url: '/post/nodejs-architecture-dive' });
  const theme = await getThemeColors(page);

  expect(theme.background).toBe('rgb(20, 22, 33)');
  expect(theme.foreground).toBe('rgb(223, 223, 223)');
  expect(theme.codeColor).not.toBe('');
  expect(theme.shikiLight).not.toBe('');
  expect(theme.shikiDark).not.toBe('');
});

test('sidebar theme toggle persists a manual override', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name === 'mobile');

  await page.emulateMedia({ colorScheme: 'dark' });
  await gotoUrl({ page, url: '/tags' });
  const rootBackground = await page
    .locator('html')
    .evaluate((element) => getComputedStyle(element).backgroundImage);
  expect(rootBackground).toContain('rgb(25, 29, 41)');
  expect(rootBackground).toContain('rgb(20, 22, 33)');

  await page.getByRole('button', { name: '라이트 모드로 전환' }).click();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('body')).toHaveCSS(
    'background-color',
    'rgb(252, 252, 251)',
  );

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(
    page.getByRole('button', { name: '다크 모드로 전환' }),
  ).toBeVisible();
});

for (const colorScheme of ['light', 'dark'] as const) {
  test(`@screen-snapshot theme ${colorScheme}`, async ({ page }) => {
    await page.addInitScript(
      ({ key, theme }) => localStorage.setItem(key, theme),
      { key: THEME_STORAGE_KEY, theme: colorScheme },
    );
    await page.emulateMedia({ colorScheme });
    await screenshotFullPage({
      page,
      url: '/tags',
      arg: [`tags-${colorScheme}.png`],
      options: { fullPage: false },
    });

    await gotoUrl({ page, url: '/post/nodejs-architecture-dive' });
    await expect(page.locator('.markdown figure').first()).toHaveScreenshot(
      `code-${colorScheme}.png`,
    );
  });
}
