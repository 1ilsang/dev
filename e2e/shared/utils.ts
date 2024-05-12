import { expect, type Page } from '@playwright/test';

type ScreenshotOptions = {
  fullPage: boolean;
  timeout?: number;
  clip?: { x: number; y: number; width: number; height: number };
};

export const gotoUrl = async ({
  page,
  url,
  timeout = 30_000,
}: {
  page: Page;
  url: string;
  timeout?: number;
}) => {
  await page.goto(url, { timeout });
  await page.evaluate(() => document.fonts.ready);
};

export const waitImages = async ({ page }: { page: Page }) => {
  // Step 1. 모든 이미지 로딩을 기다림
  // https://stackoverflow.com/questions/77287441/how-to-wait-for-full-rendered-image-in-playwright
  const locators = page.locator('img');
  const scrollPromises = (await locators.all()).map(async (locator) => {
    // https://playwright.dev/docs/api/class-locator#locator-scroll-into-view-if-needed
    // 이미지 요소가 준비되었는지 확인
    return await locator.scrollIntoViewIfNeeded();
  });
  await Promise.all(scrollPromises);
  // Set up listeners concurrently
  const imgLoadingPromises = (await locators.all()).map((locator) =>
    locator.evaluate<any, HTMLImageElement>(
      (image) => image.complete || new Promise((f) => (image.onload = f)),
    ),
  );
  // Wait for all once
  await Promise.all(imgLoadingPromises);

  // Step 2. 최상단으로 스크롤 이동
  // https://github.com/microsoft/playwright/issues/18827#issuecomment-2015560128
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForFunction(() => window.scrollY === 0);
};

export const screenshotFullPage = async ({
  page,
  url,
  arg,
  timeout,
}: {
  page: Page;
  url: string;
  arg: string[];
  timeout?: number;
}) => {
  await gotoUrl({ page, url });
  await waitImages({ page });

  const options: ScreenshotOptions = {
    fullPage: true,
  };
  if (timeout >= 0) {
    options.timeout = timeout;
  }

  await expect(page).toHaveScreenshot([...arg], options);
};
