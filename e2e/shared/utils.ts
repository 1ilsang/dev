import type { PageAssertionsToHaveScreenshotOptions } from '@playwright/test';
import { expect, type Page } from '@playwright/test';

export const gotoUrl = async ({
  page,
  url,
  timeout = 3_000,
}: {
  page: Page;
  url: string;
  timeout?: number;
}) => {
  await page.goto(url, { timeout });
  await page.evaluate(() => document.fonts.ready);
};

// virtual-list를 위해 content-visibility-auto contain-intrinsic-size 클래스를
// 설정했기 때문에 스크롤을 최하단으로 이동(가상 리스트의 모든 아이템을 로드하기 위함)
// https://stackoverflow.com/questions/69183922/playwright-auto-scroll-to-bottom-of-infinite-scroll-page
const scrollToEnd = async (page: Page) => {
  const maxScrolls = 100;
  const scrollDelay = 1000;
  let previousHeight = 0;
  let scrollAttempts = 0;

  while (scrollAttempts < maxScrolls) {
    await page.evaluate(() => {
      const GO_TO_END = 1_000_000_000;
      document.body.scrollTo(0, GO_TO_END);
    });
    await page.waitForTimeout(scrollDelay);
    const currentHeight = await page.evaluate(() => document.body.scrollHeight);
    if (currentHeight === previousHeight) {
      break;
    }
    previousHeight = currentHeight;
    scrollAttempts++;
  }
};

export const waitImages = async ({
  page,
}: Pick<ScreenshotFullPageOptions, 'page'>) => {
  const curUrl = page.url();
  const isPosts = curUrl.endsWith('/posts');

  if (isPosts) {
    await scrollToEnd(page);
  }

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
    return locator.evaluate<unknown, HTMLImageElement>(
      (image) => {
        // 로드는 성공했으나 이미지 크기가 0이므로 정상적인 이미지 로딩에 실패
        if (image.complete && image.naturalWidth === 0) {
          throw new Error(`\nImage Load failure: [${image.src}]`);
        }
        return (
          image.complete || new Promise((resolve) => (image.onload = resolve))
        );
      },
      { timeout: 3_000 },
    );
  });
  // Wait for all once
  await Promise.all(imgLoadingPromises);

  if (isPosts) {
    await scrollToEnd(page);
  }

  // Step 3. body 기준 뷰포트 설정
  // 스크롤바 커스텀으로인해 window가 아닌 body에 스크롤이 걸려있음. body 컴포넌트 크기로 뷰포트 변경
  const viewportSize = await page
    .locator('body')
    .evaluate(({ scrollWidth }) => {
      // 문서 높이 계산
      // https://ko.javascript.info/size-and-scroll-window#ref-190
      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight,
      );
      return {
        height: scrollHeight,
        width: scrollWidth,
      };
    });
  await page.setViewportSize(viewportSize);

  // Step 4. 최상단으로 스크롤 이동
  // https://github.com/microsoft/playwright/issues/18827#issuecomment-2015560128
  await page.evaluate(() => document.body.scrollTo(0, 0));
  await page.waitForFunction(() => document.body.scrollTop === 0);
};

export type ScreenshotFullPageOptions = {
  page: Page;
  url: string;
  arg: string[];
  timeout?: number;
  options?: PageAssertionsToHaveScreenshotOptions;
};
export const screenshotFullPage = async ({
  page,
  url,
  arg,
  timeout,
  options,
}: ScreenshotFullPageOptions) => {
  await gotoUrl({ page, url });
  await waitImages({ page });

  const screenOptions: PageAssertionsToHaveScreenshotOptions = {
    fullPage: true,
    ...options,
  };
  if (timeout >= 0) {
    screenOptions.timeout = timeout;
  }

  await expect(page).toHaveScreenshot([...arg], screenOptions);
};
