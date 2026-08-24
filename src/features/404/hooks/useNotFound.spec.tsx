import { renderHook } from '@testing-library/react';

const mockReplace = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

import { useNotFound } from './useNotFound';

const setLocation = (href: string) => {
  Object.defineProperty(window, 'location', {
    value: { href },
    writable: true,
    configurable: true,
  });
};

describe('useNotFound', () => {
  beforeEach(() => {
    mockReplace.mockClear();
  });

  it('기존 포스트 주소를 새 주소로 대체 이동', () => {
    setLocation('https://1ilsang.dev/posts/legacy-post#section');

    const { result } = renderHook(() => useNotFound());

    expect(result.current.redirect).toBe('/post/legacy-post');
    expect(mockReplace).toHaveBeenCalledWith('/post/legacy-post#section');
  });

  it('매핑된 다단계 이전 주소를 올바른 포스트로 이동', () => {
    setLocation('https://1ilsang.dev/posts/js/sort');

    const { result } = renderHook(() => useNotFound());

    expect(result.current.redirect).toBe('/post/array-prototype-sort');
    expect(mockReplace).toHaveBeenCalledWith('/post/array-prototype-sort');
  });

  it('알 수 없는 주소는 이동하지 않음', () => {
    setLocation('https://1ilsang.dev/unknown');

    const { result } = renderHook(() => useNotFound());

    expect(result.current.redirect).toBe('');
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
