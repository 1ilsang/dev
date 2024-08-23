import { test } from '@playwright/test';
import { urls } from './utils';
import { screenshotFullPage } from 'e2e/shared/utils';
import { MACRO_SUITE } from 'e2e/shared/constants';

test.describe(MACRO_SUITE.SCREEN_SNAPSHOT, () => {
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
