import type { PageAssertionsToHaveScreenshotOptions } from '@playwright/test';
import { expect, type Page } from '@playwright/test';
import prettier from 'prettier';

const prettierOptions = {
  ...(await prettier.resolveConfig(process.cwd())),
  parser: 'html',
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

// virtual-list를 위해 content-visibility-auto contain-intrinsic-size 클래스를
// 설정할 경우 때문에 스크롤을 최하단으로 이동(가상 리스트의 모든 아이템을 로드하기 위함)
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

const waitForStableDocumentHeight = async (page: Page) => {
  await page.evaluate(async () => {
    let previousHeight = -1;
    let stableChecks = 0;

    for (let attempt = 0; attempt < 30; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const currentHeight = document.body.scrollHeight;
      stableChecks = currentHeight === previousHeight ? stableChecks + 1 : 0;
      if (stableChecks >= 3) return;
      previousHeight = currentHeight;
    }

    throw new Error('Document height did not stabilize');
  });
};

export const waitImages = async ({
  page,
}: Pick<ScreenshotFullPageOptions, 'page'>) => {
  const curUrl = page.url();
  const isPosts = curUrl.endsWith('/posts');

  // Step 1. 모든 이미지 로딩을 기다림
  // https://stackoverflow.com/questions/77287441/how-to-wait-for-full-rendered-image-in-playwright
  const visibleImages = await page.locator('img:visible').all();
  for (const image of visibleImages) {
    // https://playwright.dev/docs/api/class-locator#locator-scroll-into-view-if-needed
    // 이미지 요소가 준비되었는지 확인
    await image.scrollIntoViewIfNeeded();
    await image.evaluate<unknown, HTMLImageElement>(
      async (element) => {
        if (!element.complete) {
          await new Promise<void>((resolve) => {
            element.addEventListener('load', () => resolve(), { once: true });
          });
        }

        // 로드는 성공했으나 이미지 크기가 0이므로 정상적인 이미지 로딩에 실패
        if (element.naturalWidth === 0) {
          throw new Error(`\nImage Load failure: [${element.src}]`);
        }
        await element.decode();
      },
      { timeout: 3_000 },
    );
  }

  if (isPosts) {
    await scrollToEnd(page);
  }

  await waitForStableDocumentHeight(page);

  // Step 3. 최상단으로 스크롤 이동
  // https://github.com/microsoft/playwright/issues/18827#issuecomment-2015560128
  await page.evaluate(() => document.body.scrollTo(0, 0));
  await page.waitForFunction(() => document.body.scrollTop === 0);
  await waitForStableDocumentHeight(page);
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

export const getPageDomInnerHTML = async ({
  page,
  selector = 'main',
}: {
  page: Page;
  selector?: string;
}): Promise<string> => {
  await page.evaluate(() => document.body.scrollTo(0, 0));
  await page.waitForFunction(() => document.body.scrollTop === 0);
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );

  const body = await page.locator(selector).innerHTML();
  return prettier.format(body, prettierOptions);
};
