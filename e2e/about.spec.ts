import { expect, test } from '@playwright/test';

test.describe('about', () => {
  test(`snapshot: about`, async ({ page }) => {
    await page.goto(`/about`);
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
