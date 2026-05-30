import { sendGAEvent } from '@next/third-parties/google';
import { infoLog, ga, trackPostNavigation } from './logger';

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
        `\x1b[36m ✓ ${message} \x1b[0m`,
      );
    });

    it('should handle empty message', () => {
      const message = '';

      infoLog(message);

      expect(mockConsoleInfo).toHaveBeenCalledWith(`\x1b[36m ✓  \x1b[0m`);
    });

    it('should handle special characters in message', () => {
      const message = 'Test with 特殊문자 and 123!@#';

      infoLog(message);

      expect(mockConsoleInfo).toHaveBeenCalledWith(
        `\x1b[36m ✓ ${message} \x1b[0m`,
      );
    });
  });

  describe('ga', () => {
    const mockSendGAEvent = sendGAEvent as jest.MockedFunction<
      typeof sendGAEvent
    >;

    it('should call sendGAEvent with correct parameters for buttonClick', () => {
      const actionType = 'homeClick' as const;
      const value = { type: 'router-push', value: '/posts' };

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
      const actionType = 'sponsorClick' as const;
      const value = { type: 'sponsor', value: 'github-sponsors' };

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
      const actionType = 'linkClick' as const;
      const value = { type: 'test', value: 'test-value' };

      ga(actionType, value);

      expect(mockSendGAEvent).toHaveBeenCalledTimes(1);
    });
  });

  describe('trackPostNavigation', () => {
    const mockSendGAEvent = sendGAEvent as jest.MockedFunction<
      typeof sendGAEvent
    >;

    it('should track prev navigation', () => {
      trackPostNavigation('prev', 'current-post', 'older-post');

      expect(mockSendGAEvent).toHaveBeenCalledWith('event', 'postNavigation', {
        type: 'prev',
        value: 'current-post>older-post',
      });
    });

    it('should track next navigation', () => {
      trackPostNavigation('next', 'current-post', 'newer-post');

      expect(mockSendGAEvent).toHaveBeenCalledWith('event', 'postNavigation', {
        type: 'next',
        value: 'current-post>newer-post',
      });
    });

    it('should track related navigation with rank', () => {
      trackPostNavigation('similar', 'current-post', 'related-post', 2);

      expect(mockSendGAEvent).toHaveBeenCalledWith('event', 'postNavigation', {
        type: 'similar',
        value: 'current-post>related-post#2',
      });
    });

    it('should track discovery navigation with rank', () => {
      trackPostNavigation('discovery', 'current-post', 'other-post', 3);

      expect(mockSendGAEvent).toHaveBeenCalledWith('event', 'postNavigation', {
        type: 'discovery',
        value: 'current-post>other-post#3',
      });
    });
  });
});
