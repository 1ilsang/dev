import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TOC_DEPTH, type TOC } from '~/posts/models';
import { TocItem } from './Item';

const h2Item: TOC = { depth: TOC_DEPTH.H2, value: 'Section', id: 'section' };
const h3Item: TOC = {
  depth: TOC_DEPTH.H3,
  value: 'Subsection',
  id: 'subsection',
};

describe('TocItem', () => {
  it('should render h2 item link', () => {
    const handleIndexClick = jest.fn();
    render(
      <ul>
        <TocItem
          item={h2Item}
          active={false}
          targetActive={false}
          lastSubList={false}
          handleIndexClick={handleIndexClick}
        />
      </ul>,
    );

    const link = screen.getByRole('link', { name: 'Section' });
    expect(link).toHaveAttribute('href', '#section');
    expect(link).toHaveClass('hover:text-sub-blue');
  });

  it('should apply target active and last sub list styles for h3', () => {
    render(
      <ul>
        <TocItem
          item={h3Item}
          active
          targetActive
          lastSubList
          handleIndexClick={jest.fn()}
        />
      </ul>,
    );

    const item = screen.getByRole('listitem');
    expect(item).toHaveClass('mb-1.5', 'animate-toc-index');
    expect(screen.getByRole('link', { name: 'Subsection' })).toHaveClass(
      'text-orange-300',
    );
  });

  it('should call handleIndexClick on link click', async () => {
    const handleIndexClick = jest.fn((event) => {
      event.preventDefault();
    });

    render(
      <ul>
        <TocItem
          item={h2Item}
          active={false}
          targetActive={false}
          lastSubList={false}
          handleIndexClick={handleIndexClick}
        />
      </ul>,
    );

    await userEvent.click(screen.getByRole('link', { name: 'Section' }));
    expect(handleIndexClick).toHaveBeenCalledTimes(1);
  });
});
