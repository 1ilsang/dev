import { expect, test } from '@playwright/test';
import { urls } from './utils';

test.describe.parallel('dom', () => {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];

    test(`${url}`, async ({ page }) => {
      await page.goto(`/posts/${url}`);
      const body = await page.locator('#__next').innerHTML();
      expect(body).toMatchSnapshot([`${url}.txt`]);
    });
  }
});
