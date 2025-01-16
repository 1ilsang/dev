import { expect, test } from '@playwright/test';
import { slugList } from './utils';

test.describe('common', () => {
  test('Check all post count', () => {
    const ALL_POST_COUNT = 37;
    expect(slugList.length).toEqual(ALL_POST_COUNT);
  });
});
