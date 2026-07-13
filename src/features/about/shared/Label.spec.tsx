import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Label } from './Label';

describe('Label', () => {
  it('should render static heading when onClick is omitted', () => {
    render(<Label label="WORK EXPERIENCE" />);

    expect(screen.getByText('WORK EXPERIENCE')).toBeVisible();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should render interactive button and handle click/keyboard', async () => {
    const onClick = jest.fn();
    render(<Label label="WORK EXPERIENCE" onClick={onClick} ariaExpanded />);

    const button = screen.getByRole('button', { name: 'WORK EXPERIENCE' });
    expect(button).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);

    button.focus();
    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(2);

    await userEvent.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(3);

    await userEvent.keyboard('a');
    expect(onClick).toHaveBeenCalledTimes(3);
  });
});
