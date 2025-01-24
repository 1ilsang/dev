import { expect, test } from '@playwright/test';
import { MyProfile } from '~/about/headline/data/profile';
import {
  MetaDescription,
  MetaKeywords,
  MetaTitle,
} from '~/shared/constants/blog';

test.describe('metadata', () => {
  test('should exist favicon', async ({ page }) => {
    await page.goto('/');
    const faviconUrl = await page.evaluate(() => {
      const link = document.querySelector(
        'link[rel="icon"]',
      ) as HTMLLinkElement | null;
      return link?.href ?? '';
    });

    expect(faviconUrl.endsWith('/favicon.ico')).toBe(true);
  });

  test('should exist title', async ({ page }) => {
    await page.goto('/');
    const title = await page.title();

    expect(title).toBe(MetaTitle.HOME);
  });

  test('should exist meta description', async ({ page }) => {
    await page.goto('/');
    const metaDescription = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="description"]');
      return meta?.getAttribute('content') ?? '';
    });
    expect(metaDescription).toBe(MetaDescription.HOME);
  });

  test('should exist meta keywords', async ({ page }) => {
    await page.goto('/');
    const metaKeywords = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="keywords"]');
      return meta?.getAttribute('content') ?? '';
    });
    expect(metaKeywords).toBe(MetaKeywords.HOME);
  });

  test('should exist open graph', async ({ page }) => {
    await page.goto('/');
    const openGraph = await page.evaluate(() => {
      const meta = document.querySelector('meta[property="og:title"]');
      return meta?.getAttribute('content') ?? '';
    });

    expect(openGraph).toBe(MetaTitle.HOME);
  });

  test('should exist robots.txt', async ({ page }) => {
    await page.goto('/robots.txt');
    const text = await page.innerText('pre');

    expect(text).toContain('User-Agent: *');
  });

  test('should exist sitemap.xml', async ({ page }) => {
    const sitemap = await page.goto('/sitemap.xml');

    const body = await sitemap.body();
    const bodyText = body.toString();

    expect(bodyText).toContain(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    );
    expect(bodyText).toContain(MyProfile.blog.href);
  });
});
