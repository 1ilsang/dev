import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { sendGAEvent } from '@next/third-parties/google';

import { HashTag } from './HashTag';

jest.mock('@next/third-parties/google', () => ({
  sendGAEvent: jest.fn(),
}));

describe('HashTag', () => {
  const mockSendGAEvent = sendGAEvent as jest.MockedFunction<
    typeof sendGAEvent
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with # prefix', () => {
    render(<HashTag link="/tags/react" content="react" />);
    expect(screen.getByText('#react')).toBeInTheDocument();
  });

  it('should have correct href', () => {
    render(<HashTag link="/tags/react" content="react" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/tags/react');
  });

  it('should have default target _self', () => {
    render(<HashTag link="/tags/react" content="react" />);
    expect(screen.getByRole('link')).toHaveAttribute('target', '_self');
  });

  it('should apply custom target', () => {
    render(<HashTag link="/tags/react" content="react" target="_blank" />);
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
  });

  it('should apply custom className', () => {
    render(<HashTag link="/tags/react" content="react" className="extra" />);
    expect(screen.getByRole('link')).toHaveClass('extra');
  });

  it('should track tag click', async () => {
    render(<HashTag link="/tags/react" content="react" />);

    const link = screen.getByRole('link');
    link.addEventListener('click', (event) => {
      event.preventDefault();
    });
    await userEvent.click(link);

    expect(mockSendGAEvent).toHaveBeenCalledWith('event', 'tagClick', {
      type: 'tag',
      value: 'react',
    });
  });
});
