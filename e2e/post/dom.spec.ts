import { expect, test } from '@playwright/test';
import { urls } from './utils';
import { MACRO_SUITE } from 'e2e/shared/constants';

test.describe(MACRO_SUITE.DOM_SNAPSHOT, () => {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];

    test(`${url}`, async ({ page }) => {
      await page.goto(`/posts/${url}`);
      await page.evaluate(() => document.fonts.ready);
      const body = await page.locator('#__next').innerHTML();
      expect(body).toMatchSnapshot([`${url}.html`]);
    });
  }
});
