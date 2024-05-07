import { expect, test } from '@playwright/test';
import { screenshotFullPage, waitImages } from './shared/utils';
import { MACRO_SUITE } from './shared/constants';

test.describe('404', () => {
  test('should redirect 404', async ({ page }) => {
    await page.goto('/something_wrong_path');
    await expect(page.getByText(/404 ERROR/)).toBeVisible();
  });

  test(MACRO_SUITE.SCREEN_SNAPSHOT, async ({ page }) => {
    await screenshotFullPage({ page, url: `/404`, arg: [`404.png`] });
  });

  test(MACRO_SUITE.DOM_SNAPSHOT, async ({ page }) => {
    await page.goto(`/404`);
    await waitImages({ page });
    const body = await page.locator('#__next').innerHTML();
    expect(body).toMatchSnapshot([`404.html`]);
  });
});
