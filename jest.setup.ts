import '@testing-library/jest-dom';
import '@testing-library/user-event';

// Mock IntersectionObserver
class IntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

// Mock Google Analytics functions to prevent warnings in test environment
jest.mock('@next/third-parties/google', () => ({
  GoogleAnalytics: jest.fn(() => null),
  sendGAEvent: jest.fn(),
}));
