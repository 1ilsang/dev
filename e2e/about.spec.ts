import { expect, test } from '@playwright/test';
import { screenshotFullPage } from './shared/utils';
import { MACRO_SUITE } from './shared/constants';

test.describe('about', () => {
  test(MACRO_SUITE.SCREEN_SNAPSHOT, async ({ page }) => {
    await screenshotFullPage({ page, url: `/about`, arg: [`about.png`] });
  });

  test(MACRO_SUITE.DOM_SNAPSHOT, async ({ page }) => {
    await page.goto(`/about`);
    const body = await page.locator('#__next').innerHTML();
    expect(body).toMatchSnapshot([`about.html`]);
  });
});
