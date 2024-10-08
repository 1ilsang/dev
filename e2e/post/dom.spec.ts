import { expect, test } from '@playwright/test';
import { urls } from './utils';
import { MACRO_SUITE } from 'e2e/shared/constants';
import { gotoUrl } from 'e2e/shared/utils';

test.describe(MACRO_SUITE.DOM_SNAPSHOT, () => {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];

    test(`${url}`, async ({ page }) => {
      await gotoUrl({ page, url: `/posts/${url}` });
      const body = await page.locator('main').innerHTML();
      expect(body).toMatchSnapshot([`${url}.html`]);
    });
  }
});
