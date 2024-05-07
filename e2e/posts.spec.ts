import { expect, test } from '@playwright/test';
import { MACRO_SUITE } from './shared/constants';

test.describe('posts', () => {
  test(MACRO_SUITE.DOM_SNAPSHOT, async ({ page }) => {
    await page.goto(`/posts`);
    await page.evaluate(() => document.fonts.ready);
    const body = await page.locator('#__next').innerHTML();
    expect(body).toMatchSnapshot([`posts.html`]);
  });
});
