import { expect, test } from '@playwright/test';
import { gotoUrl } from './shared/utils';

test.describe('post routes', () => {
  test('legacy post URL redirects while preserving the hash', async ({
    page,
  }) => {
    await gotoUrl({
      page,
      url: '/posts/implicit-coercion#legacy-section',
      timeout: 10_000,
    });

    await expect(page).toHaveURL(/\/post\/implicit-coercion#legacy-section$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      '암묵적 형변환',
    );
  });

  test('category URL renders only post detail links', async ({ page }) => {
    await gotoUrl({ page, url: '/posts/javascript' });

    await expect(page).toHaveURL(/\/posts\/javascript$/);
    await expect(page.getByRole('heading', { name: 'Posts' })).toBeAttached();
    await expect(
      page.getByRole('link', { name: 'JavaScript' }).first(),
    ).toHaveAttribute('aria-current', 'page');

    const postLinks = page.locator('main a[href^="/post/"]');
    expect(await postLinks.count()).toBeGreaterThan(0);
    for (const link of await postLinks.all()) {
      await expect(link).toHaveAttribute('href', /^\/post\//);
    }
  });
});

test('TOC activates headings sequentially while scrolling', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name === 'mobile', 'TOC is desktop-only');
  await gotoUrl({ page, url: '/post/nodejs-architecture-dive' });

  const toc = page.getByRole('complementary', { name: '목차' });
  const links = toc.getByRole('link');
  expect(await links.count()).toBeGreaterThan(3);

  const firstTarget = links.nth(1);
  const secondTarget = links.nth(2);
  const firstId = await firstTarget.getAttribute('id');
  const secondId = await secondTarget.getAttribute('id');

  const scrollToHeading = async (id: string | null) => {
    expect(id).not.toBeNull();
    await page.evaluate((headingId) => {
      const heading = [...document.querySelectorAll('main h2, main h3')].find(
        (element) => element.id === headingId,
      );
      if (!(heading instanceof HTMLElement)) throw new Error('Heading missing');
      document.body.scrollTo(0, heading.offsetTop - 80);
    }, id);
  };

  await scrollToHeading(firstId);
  await expect(firstTarget.locator('span').last()).toHaveClass(/\bscale-102\b/);

  await scrollToHeading(secondId);
  await expect(secondTarget.locator('span').last()).toHaveClass(
    /\bscale-102\b/,
  );
  await expect(firstTarget.locator('span').last()).toHaveClass(/\bscale-100\b/);
});
