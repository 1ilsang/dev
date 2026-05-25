import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContentHeadline from './Headline';

describe('ContentHeadline accessibility', () => {
  it('should expose accordion semantics when clickable', () => {
    render(
      <ContentHeadline
        name="LINE Plus Corp"
        description="Software Engineer"
        onClick={jest.fn()}
        ariaExpanded={false}
        controlsId="line-projects"
      />,
    );

    const trigger = screen.getByRole('button', { name: 'LINE Plus Corp' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-controls', 'line-projects');
  });

  it('should call onClick on Enter key', async () => {
    const onClick = jest.fn();

    render(
      <ContentHeadline
        name="LINE Plus Corp"
        description="Software Engineer"
        onClick={onClick}
        ariaExpanded={false}
        controlsId="line-projects"
      />,
    );

    const trigger = screen.getByRole('button', { name: 'LINE Plus Corp' });
    trigger.focus();
    await userEvent.keyboard('{Enter}');

    expect(onClick).toHaveBeenCalled();
  });

  it('should not be interactive without onClick', () => {
    render(
      <ContentHeadline name="LINE Plus Corp" description="Software Engineer" />,
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
