import { expect, test } from '@playwright/test';
import { MACRO_SUITE } from './shared/constants';
import type { ScreenshotFullPageOptions } from './shared/utils';
import {
  getPageDomInnerHTML,
  gotoUrl,
  screenshotFullPage,
} from './shared/utils';
import { slugList } from './post/utils';

test.describe('posts', () => {
  test('Check all post count', () => {
    const ALL_POST_COUNT = 40;
    expect(slugList.length).toEqual(ALL_POST_COUNT);
  });

  test(MACRO_SUITE.DOM_SNAPSHOT, async ({ page }) => {
    await gotoUrl({ page, url: '/posts' });
    const prettyHtml = await getPageDomInnerHTML({ page });
    expect(prettyHtml).toMatchSnapshot([`posts.html`]);
  });

  test(MACRO_SUITE.SCREEN_SNAPSHOT, async ({ page }) => {
    const projectName = test.info().project.name as 'desktop' | 'mobile';
    const options: ScreenshotFullPageOptions = {
      page,
      url: '/posts',
      arg: [`posts.png`],
      projectName,
    };
    await screenshotFullPage(options);
  });
});
