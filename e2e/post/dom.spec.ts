import { expect, test } from '@playwright/test';
import { slugList } from './utils';
import { MACRO_SUITE } from 'e2e/shared/constants';
import { getPageDomInnerHTML, gotoUrl } from 'e2e/shared/utils';

test.describe(MACRO_SUITE.DOM_SNAPSHOT, () => {
  for (let i = 0; i < slugList.length; i++) {
    const slug = slugList[i];

    test(`${slug}`, async ({ page }) => {
      await gotoUrl({ page, url: `/posts/${slug}` });

      const prettyHtml = await getPageDomInnerHTML({ page });

      expect(prettyHtml).toMatchSnapshot([`${slug}.html`]);
    });
  }
});
