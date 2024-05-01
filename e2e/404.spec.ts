import { expect, test } from '@playwright/test';

test.describe('404', () => {
  test('should redirect 404', async ({ page }) => {
    await page.goto('/something_wrong_path');
    await expect(page.getByText(/404 ERROR/)).toBeVisible();
  });

  test(`snapshot: 404`, async ({ page }) => {
    await page.goto(`/404`);
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
