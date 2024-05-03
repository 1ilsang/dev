import { expect, test } from '@playwright/test';

test.describe('posts', () => {
  test(`dom`, async ({ page }) => {
    await page.goto(`/posts`);
    await page.waitForTimeout(1000);
    const body = await page.locator('#__next').innerHTML();
    expect(body).toMatchSnapshot([`posts.html`]);
  });
});
