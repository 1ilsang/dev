import { render, screen } from '@testing-library/react';

import { Tags } from './Tags';

describe('Tags', () => {
  it('should render each tag', () => {
    render(<Tags tags={['React18', 'AWS']} />);

    expect(screen.getByText('React18')).toBeVisible();
    expect(screen.getByText('AWS')).toBeVisible();
  });

  it('should render empty container when tags are empty', () => {
    const { container } = render(<Tags tags={[]} />);

    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
