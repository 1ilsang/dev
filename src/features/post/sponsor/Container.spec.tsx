import { render, screen } from '@testing-library/react';
import { sendGAEvent } from '@next/third-parties/google';

import { SponsorContainer } from './Container';

jest.mock('@next/third-parties/google', () => ({
  sendGAEvent: jest.fn(),
}));

describe('SponsorContainer', () => {
  const mockSendGAEvent = sendGAEvent as jest.MockedFunction<
    typeof sendGAEvent
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render GitHub sponsors iframe', () => {
    render(<SponsorContainer />);

    const iframe = screen.getByTitle('Sponsor 1ilsang');
    expect(iframe).toHaveAttribute(
      'src',
      'https://github.com/sponsors/1ilsang/button',
    );
  });

  it('should track sponsor click when iframe is focused on blur', () => {
    render(<SponsorContainer />);
    const iframe = screen.getByTitle('Sponsor 1ilsang');

    Object.defineProperty(document, 'activeElement', {
      configurable: true,
      get: () => iframe,
    });

    window.dispatchEvent(new Event('blur'));

    expect(mockSendGAEvent).toHaveBeenCalledWith('event', 'sponsorClick', {
      type: 'sponsor',
      value: 'github-sponsors',
    });
  });

  it('should not track when blur happens without iframe focus', () => {
    render(<SponsorContainer />);

    Object.defineProperty(document, 'activeElement', {
      configurable: true,
      get: () => document.body,
    });

    window.dispatchEvent(new Event('blur'));

    expect(mockSendGAEvent).not.toHaveBeenCalled();
  });
});
