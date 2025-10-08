import { sendGAEvent } from '@next/third-parties/google';
import { infoLog, ga } from './logger';

// Mock the external dependency
jest.mock('@next/third-parties/google', () => ({
  sendGAEvent: jest.fn(),
}));

describe('logger', () => {
  // Mock console.info to avoid cluttering test output
  const originalConsoleInfo = console.info;
  const mockConsoleInfo = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    console.info = mockConsoleInfo;
  });

  afterAll(() => {
    console.info = originalConsoleInfo;
  });

  describe('infoLog', () => {
    it('should log message with proper formatting', () => {
      const message = 'Test message';

      infoLog(message);

      expect(mockConsoleInfo).toHaveBeenCalledWith(
        `\n\x1b[36m ✓ ${message} \x1b[0m`,
      );
    });

    it('should handle empty message', () => {
      const message = '';

      infoLog(message);

      expect(mockConsoleInfo).toHaveBeenCalledWith(`\n\x1b[36m ✓  \x1b[0m`);
    });

    it('should handle special characters in message', () => {
      const message = 'Test with 特殊문자 and 123!@#';

      infoLog(message);

      expect(mockConsoleInfo).toHaveBeenCalledWith(
        `\n\x1b[36m ✓ ${message} \x1b[0m`,
      );
    });
  });

  describe('ga', () => {
    const mockSendGAEvent = sendGAEvent as jest.MockedFunction<
      typeof sendGAEvent
    >;

    it('should call sendGAEvent with correct parameters for buttonClick', () => {
      const actionType = 'buttonClick';
      const value = { type: 'submit', value: 'contact-form' };

      ga(actionType, value);

      expect(mockSendGAEvent).toHaveBeenCalledWith('event', actionType, value);
    });

    it('should call sendGAEvent with correct parameters for linkClick', () => {
      const actionType = 'linkClick';
      const value = { type: 'external', value: 'https://example.com' };

      ga(actionType, value);

      expect(mockSendGAEvent).toHaveBeenCalledWith('event', actionType, value);
    });

    it('should call sendGAEvent with correct parameters for categoryClick', () => {
      const actionType = 'categoryClick';
      const value = { type: 'filter', value: 'javascript' };

      ga(actionType, value);

      expect(mockSendGAEvent).toHaveBeenCalledWith('event', actionType, value);
    });

    it('should call sendGAEvent with correct parameters for tocClick', () => {
      const actionType = 'tocClick';
      const value = { type: 'toc', value: 'section-1' };

      ga(actionType, value);

      expect(mockSendGAEvent).toHaveBeenCalledWith('event', actionType, value);
    });

    it('should call sendGAEvent with correct parameters for videoClick', () => {
      const actionType = 'videoClick';
      const value = { type: 'play', value: 'intro-video' };

      ga(actionType, value);

      expect(mockSendGAEvent).toHaveBeenCalledWith('event', actionType, value);
    });

    it('should handle value with special characters', () => {
      const actionType = 'linkClick';
      const value = {
        type: 'internal',
        value: '/posts/한글-제목-with-특수문자!',
      };

      ga(actionType, value);

      expect(mockSendGAEvent).toHaveBeenCalledWith('event', actionType, value);
    });

    it('should be called exactly once per invocation', () => {
      const actionType = 'buttonClick';
      const value = { type: 'test', value: 'test-value' };

      ga(actionType, value);

      expect(mockSendGAEvent).toHaveBeenCalledTimes(1);
    });
  });
});
