import { expect, test } from '@playwright/test';
import {
  getPageDomInnerHTML,
  gotoUrl,
  screenshotFullPage,
} from './shared/utils';
import { MACRO_SUITE } from './shared/constants';

test.describe('about', () => {
  test(MACRO_SUITE.SCREEN_SNAPSHOT, async ({ page }) => {
    await screenshotFullPage({ page, url: `/about`, arg: [`about.png`] });
  });

  test(MACRO_SUITE.DOM_SNAPSHOT, async ({ page }) => {
    await gotoUrl({ page, url: '/about' });
    const prettyHtml = await getPageDomInnerHTML({ page });
    expect(prettyHtml).toMatchSnapshot([`about.html`]);
  });

  test(`should exist favicon`, async ({ page }) => {
    await gotoUrl({ page, url: '/about' });
    const faviconUrl = await page.evaluate(() => {
      const link = document.querySelector(
        'link[rel="icon"]',
      ) as HTMLLinkElement | null;
      return link?.href ?? '';
    });

    expect(faviconUrl.endsWith('/favicon.ico')).toBe(true);
  });
});
