import { expect, test } from '@playwright/test';

test.describe('about', () => {
  test(`screen`, async ({ page }) => {
    await page.goto(`/about`);
    await expect(page).toHaveScreenshot([`about.png`], { fullPage: true });
  });

  test(`dom`, async ({ page }) => {
    await page.goto(`/about`);
    const body = await page.locator('#__next').innerHTML();
    expect(body).toMatchSnapshot([`about.txt`]);
  });
});
