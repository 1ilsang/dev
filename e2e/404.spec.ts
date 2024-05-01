import { expect, test } from '@playwright/test';

test.describe('404', () => {
  test('should redirect 404', async ({ page }) => {
    await page.goto('/something_wrong_path');
    await expect(page.getByText(/404 ERROR/)).toBeVisible();
  });

  test(`screen`, async ({ page }) => {
    await page.goto(`/404`);
    await expect(page).toHaveScreenshot([`404.png`], { fullPage: true });
  });

  test(`dom`, async ({ page }) => {
    await page.goto(`/404`);
    const body = await page.locator('#__next').innerHTML();
    expect(body).toMatchSnapshot([`404.txt`]);
  });
});
