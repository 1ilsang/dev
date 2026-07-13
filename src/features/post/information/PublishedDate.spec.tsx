import { render, screen } from '@testing-library/react';

import { PublishedDate } from './PublishedDate';

describe('PublishedDate', () => {
  it('should render published date only', () => {
    render(<PublishedDate date="2024-01-15T00:00:00.000Z" />);

    expect(screen.getByText('Published')).toBeVisible();
    expect(screen.queryByText('Updated')).not.toBeInTheDocument();
    expect(screen.queryByText('·')).not.toBeInTheDocument();
  });

  it('should render published and updated dates with separator', () => {
    render(
      <PublishedDate
        date="2024-01-15T00:00:00.000Z"
        updatedDate="2024-02-01T00:00:00.000Z"
      />,
    );

    expect(screen.getByText('Published')).toBeVisible();
    expect(screen.getByText('Updated')).toBeVisible();
    expect(screen.getByText('·')).toBeVisible();
    expect(screen.getAllByRole('time')).toHaveLength(2);
  });
});
