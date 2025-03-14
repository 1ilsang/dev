import { test } from '@playwright/test';
import { slugList } from './utils';
import { screenshotFullPage } from 'e2e/shared/utils';
import { MACRO_SUITE } from 'e2e/shared/constants';

test.describe(MACRO_SUITE.SCREEN_SNAPSHOT, () => {
  for (let i = 0; i < slugList.length; i++) {
    const slug = slugList[i];

    test(`${slug}`, async ({ page }) => {
      await screenshotFullPage({
        page,
        url: `/posts/${slug}`,
        arg: [`${slug}.png`],
        timeout: 10 * 1000,
      });
    });
  }
});
