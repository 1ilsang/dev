import { render, screen } from '@testing-library/react';
import { DateFormatter } from './DateFormatter';

describe('DateFormatter', () => {
  it('should render time element', () => {
    render(<DateFormatter date="2024-01-15T09:30:00" type="iso" />);
    expect(screen.getByText('2024-01-15 09:30')).toBeInTheDocument();
  });

  it('should render with default type using formatDate', () => {
    render(<DateFormatter date={new Date('2024-11-04T21:04:22')} />);
    expect(screen.getByText('2024.11.04 21:04:22')).toBeInTheDocument();
  });

  it('should render with custom format', () => {
    render(
      <DateFormatter
        date={new Date('2024-11-04T21:04:22')}
        format="yyyy-MM-dd"
      />,
    );
    expect(screen.getByText('2024-11-04')).toBeInTheDocument();
  });

  it('should render before text', () => {
    render(<DateFormatter date="2024-01-15T09:30:00" type="iso" before="📅" />);
    expect(screen.getByText('📅')).toBeInTheDocument();
  });

  it('should apply className to time element', () => {
    render(
      <DateFormatter
        date="2024-01-15T09:30:00"
        type="iso"
        className="custom-class"
      />,
    );
    expect(screen.getByText('2024-01-15 09:30')).toHaveClass('custom-class');
  });
});
