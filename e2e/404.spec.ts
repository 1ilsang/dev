import { expect, test } from '@playwright/test';
import { screenshotFullPage } from './utils';

test.describe('404', () => {
  test('should redirect 404', async ({ page }) => {
    await page.goto('/something_wrong_path');
    await expect(page.getByText(/404 ERROR/)).toBeVisible();
  });

  test(`screen`, async ({ page }) => {
    await screenshotFullPage({ page, url: `/404`, arg: [`404.png`] });
  });

  test(`dom`, async ({ page }) => {
    await page.goto(`/404`);
    await page.waitForTimeout(2000);
    const body = await page.locator('#__next').innerHTML();
    expect(body).toMatchSnapshot([`404.html`]);
  });
});
