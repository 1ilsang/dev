import { expect, test } from '@playwright/test';
import { MACRO_SUITE } from './shared/constants';
import type { ScreenshotFullPageOptions } from './shared/utils';
import { gotoUrl, screenshotFullPage } from './shared/utils';

test.describe('posts', () => {
  test(MACRO_SUITE.DOM_SNAPSHOT, async ({ page }) => {
    await gotoUrl({ page, url: '/posts' });
    const body = await page.locator('main').innerHTML();
    expect(body).toMatchSnapshot([`posts.html`]);
  });

  test(MACRO_SUITE.SCREEN_SNAPSHOT, async ({ page }) => {
    const options: ScreenshotFullPageOptions = {
      page,
      url: '/posts',
      arg: [`posts.png`],
    };
    await screenshotFullPage(options);
  });
});
