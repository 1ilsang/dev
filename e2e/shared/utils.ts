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
  const imgLoadingPromises = (await locators.all()).map((locator) => {
    return locator.evaluate<unknown, HTMLImageElement>((image) => {
      // 로드는 성공했으나 이미지 크기가 0이므로 정상적인 이미지 로딩에 실패
      if (image.complete && image.naturalWidth === 0) {
        throw new Error(`\nImage Load failure: [${image.src}]`);
      }
      return (
        image.complete || new Promise((resolve) => (image.onload = resolve))
      );
    });
  });
  // Wait for all once
  await Promise.all(imgLoadingPromises);

  // Step 2. body 기준 뷰포트 설정
  // 스크롤바 커스텀으로인해 window가 아닌 body에 스크롤이 걸려있음. body 컴포넌트 크기로 뷰포트 변경
  const viewportSize = await page.locator('body').evaluate((body) => {
    return {
      width: body.scrollWidth,
      height: body.scrollHeight,
    };
  });
  await page.setViewportSize(viewportSize);

  // Step 3. 최상단으로 스크롤 이동
  // https://github.com/microsoft/playwright/issues/18827#issuecomment-2015560128
  await page.evaluate(() => document.body.scrollTo(0, 0));
  await page.waitForFunction(() => document.body.scrollTop === 0);
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
