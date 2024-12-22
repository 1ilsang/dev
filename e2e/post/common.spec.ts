import { expect, test } from '@playwright/test';
import { urls } from './utils';

test.describe('common', () => {
  test('Check all post count', () => {
    const ALL_POST_COUNT = 37;
    expect(urls.length).toEqual(ALL_POST_COUNT);
  });
});
