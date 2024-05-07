import { expect, type Page } from '@playwright/test';

type ScreenshotOptions = {
  fullPage: boolean;
  timeout?: number;
  clip?: { x: number; y: number; width: number; height: number };
};

export const waitImages = async ({ page }: { page: Page }) => {
  // https://stackoverflow.com/questions/77287441/how-to-wait-for-full-rendered-image-in-playwright
  const locators = page.locator('//img');
  await locators.evaluateAll((e) => e.map((i) => i.scrollIntoView()));
  // Set up listeners concurrently
  const promises = (await locators.all()).map((locator) =>
    locator.evaluate<any, HTMLImageElement>(
      (image) => image.complete || new Promise((f) => (image.onload = f)),
    ),
  );
  // Wait for all once
  await Promise.all(promises);
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

  await waitImages({ page });
  // await Promise.all(
  //   Array.from(document.images)
  //     .filter((img) => !img.complete)
  //     .map(
  //       (img) =>
  //         new Promise((resolve) => {
  //           img.onload = img.onerror = resolve;
  //         }),
  //     ),
  // );

  // // https://github.com/microsoft/playwright/issues/18827#issuecomment-2031261562
  // await page.locator('#__next').scrollIntoViewIfNeeded();

  // Trigger loading of all images
  // let locators = page.locator('//img');
  // await locators.evaluateAll((e) => e.scrollInfoView());

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
