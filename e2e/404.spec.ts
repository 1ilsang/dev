import { expect, test } from '@playwright/test';
import {
  getPageDomInnerHTML,
  gotoUrl,
  screenshotFullPage,
  waitImages,
} from './shared/utils';
import { MACRO_SUITE } from './shared/constants';

test.describe('404', () => {
  test('should redirect 404', async ({ page }) => {
    await gotoUrl({ page, url: '/something_wrong_path', timeout: 10_000 });
    await expect(page.getByText(/404 ERROR/)).toBeVisible();
  });

  test(MACRO_SUITE.SCREEN_SNAPSHOT, async ({ page }) => {
    await screenshotFullPage({
      page,
      url: `/something_wrong_path`,
      arg: [`404.png`],
    });
  });

  test(MACRO_SUITE.DOM_SNAPSHOT, async ({ page }) => {
    await gotoUrl({ page, url: '/something_wrong_path', timeout: 10_000 });
    await waitImages({ page });
    const prettyHtml = await getPageDomInnerHTML({ page });
    expect(prettyHtml).toMatchSnapshot([`404.html`]);
  });
});
