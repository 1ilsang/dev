import { expect, test } from '@playwright/test';
import { urls } from './utils';

test.describe.parallel('screen', () => {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];

    test(`${url}`, async ({ page }) => {
      await page.goto(`/posts/${url}`);
      await expect(page).toHaveScreenshot([`${url}.png`], {
        fullPage: true,
        timeout: 10 * 1000,
      });
    });
  }
});
