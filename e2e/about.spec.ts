import { expect, test } from '@playwright/test';
import { screenshotFullPage } from './utils';

test.describe('about', () => {
  test(`screen`, async ({ page }) => {
    await screenshotFullPage({ page, url: `/about`, arg: [`about.png`] });
  });

  test(`dom`, async ({ page }) => {
    await page.goto(`/about`);
    const body = await page.locator('#__next').innerHTML();
    expect(body).toMatchSnapshot([`about.html`]);
  });
});
