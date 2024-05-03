import { expect, type Page } from '@playwright/test';

type ScreenshotOptions = {
  fullPage: boolean;
  timeout?: number;
  clip?: { x: number; y: number; width: number; height: number };
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
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);
  // https://github.com/microsoft/playwright/issues/18827#issuecomment-2031261562
  await page.locator('#__next').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  // const { width } = page.viewportSize();
  // const height = await page.evaluate(
  //   () => document.scrollingElement.scrollHeight,
  // );

  const options: ScreenshotOptions = {
    fullPage: true,
    // clip: { x: 0, y: 0, width, height },
  };
  if (timeout >= 0) {
    options.timeout = timeout;
  }

  await expect(page).toHaveScreenshot([...arg], options);
};
