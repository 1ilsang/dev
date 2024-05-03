import { test } from '@playwright/test';
import { urls } from './utils';
import { screenshotFullPage } from 'e2e/utils';

test.describe(`screen`, () => {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];

    test(`${url}`, async ({ page }) => {
      await screenshotFullPage({
        page,
        url: `/posts/${url}`,
        arg: [`${url}.png`],
        timeout: 10 * 1000,
      });
    });
  }
});
