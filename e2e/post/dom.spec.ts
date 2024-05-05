import { expect, test } from '@playwright/test';
import { urls } from './utils';

test.describe('dom', () => {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];

    test(`${url}`, async ({ page }) => {
      await page.goto(`/posts/${url}`);
      // TODO: floating이 깜빡이는 문제가 존재함.
      await page.waitForTimeout(1000);
      const body = await page.locator('#__next').innerHTML();
      expect(body).toMatchSnapshot([`${url}.html`]);
    });
  }
});
