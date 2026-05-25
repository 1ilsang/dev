import { renderHook } from '@testing-library/react';

const mockSetImageSrc = jest.fn();
const mockSetImageAlt = jest.fn();

let mockPathname = '/posts/test';
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

jest.mock('../modal/atoms', () => ({
  imageSrcAtom: 'imageSrcAtom',
  imageAltAtom: 'imageAltAtom',
}));

jest.mock('jotai', () => ({
  useSetAtom: (atom: string) =>
    atom === 'imageSrcAtom' ? mockSetImageSrc : mockSetImageAlt,
}));

import { useBindZoomableImages } from './useBindZoomableImages';

describe('useBindZoomableImages', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    mockPathname = '/posts/test';
    mockSetImageSrc.mockClear();
    mockSetImageAlt.mockClear();

    container = document.createElement('div');
    container.id = 'post-body-container';
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should not bind images when pathname is not /posts', () => {
    mockPathname = '/about';
    const img = document.createElement('img');
    img.src = '/test.png';
    img.alt = 'test';
    container.appendChild(img);

    renderHook(() => useBindZoomableImages());

    expect(img.getAttribute('role')).toBeNull();
  });

  it('should not bind when post body container is missing', () => {
    document.body.innerHTML = '';
    const img = document.createElement('img');
    img.src = '/test.png';

    renderHook(() => useBindZoomableImages());

    expect(img.getAttribute('role')).toBeNull();
  });

  it('should bind click handler to images in post body', () => {
    const img = document.createElement('img');
    img.src = '/photo.png';
    img.alt = 'Photo';
    container.appendChild(img);

    renderHook(() => useBindZoomableImages());

    expect(img.getAttribute('role')).toBe('button');
    expect(img.tabIndex).toBe(0);
    expect(img.getAttribute('aria-label')).toBe('Photo 확대');

    img.click();
    expect(mockSetImageSrc).toHaveBeenCalledWith(img.src);
    expect(mockSetImageAlt).toHaveBeenCalledWith('Photo');
  });

  it('should set empty alt when image has no alt', () => {
    const img = document.createElement('img');
    img.src = '/no-alt.png';
    container.appendChild(img);

    renderHook(() => useBindZoomableImages());

    expect(img.getAttribute('aria-label')).toBeNull();

    img.click();
    expect(mockSetImageAlt).toHaveBeenCalledWith('');
  });

  it('should skip images already marked as zoomable', () => {
    const img = document.createElement('img');
    img.src = '/already.png';
    img.dataset.zoomable = 'true';
    container.appendChild(img);

    renderHook(() => useBindZoomableImages());

    expect(img.getAttribute('role')).toBeNull();
  });

  it('should skip images inside a zoomable container', () => {
    const wrapper = document.createElement('button');
    wrapper.dataset.zoomable = 'true';
    const img = document.createElement('img');
    img.src = '/wrapped.png';
    wrapper.appendChild(img);
    container.appendChild(wrapper);

    renderHook(() => useBindZoomableImages());

    expect(img.getAttribute('role')).toBeNull();
  });

  it('should open image on Enter keydown', () => {
    const img = document.createElement('img');
    img.src = '/key.png';
    img.alt = 'Key';
    container.appendChild(img);

    renderHook(() => useBindZoomableImages());

    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
    });
    img.dispatchEvent(event);

    expect(mockSetImageSrc).toHaveBeenCalledWith(img.src);
  });

  it('should open image on Space keydown', () => {
    const img = document.createElement('img');
    img.src = '/space.png';
    img.alt = 'Space';
    container.appendChild(img);

    renderHook(() => useBindZoomableImages());

    const event = new KeyboardEvent('keydown', {
      key: ' ',
      bubbles: true,
    });
    img.dispatchEvent(event);

    expect(mockSetImageSrc).toHaveBeenCalledWith(img.src);
  });

  it('should not open image on other key', () => {
    const img = document.createElement('img');
    img.src = '/other.png';
    img.alt = 'Other';
    container.appendChild(img);

    renderHook(() => useBindZoomableImages());

    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
    });
    img.dispatchEvent(event);

    expect(mockSetImageSrc).not.toHaveBeenCalled();
  });
});
