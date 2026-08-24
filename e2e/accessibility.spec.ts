import { expect, test } from '@playwright/test';

for (const path of ['/', '/tags']) {
  test(`skip link moves keyboard focus to main content: ${path}`, async ({
    page,
  }) => {
    await page.goto(path);

    const skipLink = page.getByRole('link', { name: '본문으로 건너뛰기' });
    await page.mouse.move(100, 100);
    const pointerModeBox = await skipLink.boundingBox();
    expect(pointerModeBox?.width).toBeLessThanOrEqual(1);
    expect(pointerModeBox?.height).toBeLessThanOrEqual(1);

    await page.keyboard.press('Tab');

    await expect(skipLink).toBeFocused();
    const keyboardModeBox = await skipLink.boundingBox();
    expect(keyboardModeBox?.width).toBeGreaterThan(1);
    expect(keyboardModeBox?.height).toBeGreaterThan(1);

    await page.keyboard.press('Enter');

    await expect(page.locator('#main-content')).toBeFocused();
  });
}
