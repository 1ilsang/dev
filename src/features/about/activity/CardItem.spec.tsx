import { render, screen } from '@testing-library/react';

import { ActivityType, type Activity } from './models';
import { CardItem } from './CardItem';

const activity: Activity = {
  name: 'FEConf',
  type: ActivityType.conference,
  startDate: 2024,
  url: 'https://feconf.kr',
};

describe('CardItem', () => {
  it('should render activity type and external link', () => {
    render(
      <ul>
        <CardItem activity={activity} />
      </ul>,
    );

    expect(screen.getByText(ActivityType.conference)).toBeVisible();
    const link = screen.getByRole('link', { name: 'FEConf' });
    expect(link).toHaveAttribute('href', 'https://feconf.kr');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
