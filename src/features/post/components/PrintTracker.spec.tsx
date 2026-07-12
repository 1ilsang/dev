import { render } from '@testing-library/react';
import { sendGAEvent } from '@next/third-parties/google';

import { PrintTracker } from './PrintTracker';

jest.mock('@next/third-parties/google', () => ({
  sendGAEvent: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  usePathname: () => '/posts/sample-post',
}));

describe('PrintTracker', () => {
  const mockSendGAEvent = sendGAEvent as jest.MockedFunction<
    typeof sendGAEvent
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should track print event with post slug on beforeprint', () => {
    const { unmount } = render(<PrintTracker />);

    window.dispatchEvent(new Event('beforeprint'));

    expect(mockSendGAEvent).toHaveBeenCalledWith('event', 'printPost', {
      type: 'print',
      value: 'sample-post',
    });

    unmount();
    window.dispatchEvent(new Event('beforeprint'));
    expect(mockSendGAEvent).toHaveBeenCalledTimes(1);
  });
});
