import { expect, test } from '@playwright/test';

import { getAllPosts, urlToSlugMap } from '~/shared/helpers/post';

getAllPosts();
const urls = Object.keys(urlToSlugMap);

test.describe.parallel('post', () => {
  test('Check all post count', () => {
    const ALL_POST_COUNT = 32;
    expect(urls.length).toEqual(ALL_POST_COUNT);
  });

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    test(`snapshot: ${url}`, async ({ page }) => {
      await page.goto(`/posts/${url}`);
      await expect(page).toHaveScreenshot({ fullPage: true });
    });
  }
});
