import { expect, test } from '@playwright/test';
import { MACRO_SUITE } from './shared/constants';
import { gotoUrl } from './shared/utils';

test.describe('posts', () => {
  test(MACRO_SUITE.DOM_SNAPSHOT, async ({ page }) => {
    await gotoUrl({ page, url: '/posts' });
    const body = await page.locator('#__next').innerHTML();
    expect(body).toMatchSnapshot([`posts.html`]);
  });
});
