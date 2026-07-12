import { render, screen } from '@testing-library/react';

import { ProjectDate } from './ProjectDate';

describe('ProjectDate', () => {
  it('should render start and end dates', () => {
    render(
      <ProjectDate
        startDate={Date.UTC(2020, 0, 1)}
        endDate={Date.UTC(2022, 0, 1)}
        format="yyyy"
        className="extra"
      />,
    );

    expect(screen.getByText('2020')).toBeVisible();
    expect(screen.getByText('2022')).toBeVisible();
    expect(screen.getByText(/-/)).toBeVisible();
  });

  it('should render Present when endDate is missing', () => {
    const { container } = render(
      <ProjectDate startDate={Date.UTC(2023, 0, 1)} format="yyyy" />,
    );

    expect(screen.getByText('2023')).toBeVisible();
    expect(container).toHaveTextContent('Present');
  });
});
