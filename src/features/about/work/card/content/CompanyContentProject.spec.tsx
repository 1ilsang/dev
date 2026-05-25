import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ProjectName } from '../../models';

import { CompanyContentProject } from './CompanyContentProject';

jest.mock('./ProjectDetail', () => ({
  __esModule: true,
  default: () => null,
}));

describe('CompanyContentProject accessibility', () => {
  const defaultProps = {
    name: ProjectName.TBD,
    tags: [],
    startDate: 202401,
    format: 'yyyy.MM',
    print: false,
    summary: 'project summary',
    body: null,
  };

  it('should expose accordion semantics', () => {
    render(<CompanyContentProject {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: /Coming Soon/i });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-controls', ProjectName.TBD);
  });

  it('should toggle with Space key', async () => {
    render(<CompanyContentProject {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: /Coming Soon/i });
    trigger.focus();
    await userEvent.keyboard(' ');

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('should toggle with Enter key', async () => {
    render(<CompanyContentProject {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: /Coming Soon/i });
    trigger.focus();
    await userEvent.keyboard('{Enter}');

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
});
