import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExternalLink, { highlighterClass } from './ExternalLink';
import { ga } from '../helpers/logger';

jest.mock('../helpers/logger', () => ({
  ga: jest.fn(),
}));

describe('rendering', () => {
  it('should visible', async () => {
    render(<ExternalLink href="1ilsang.dev" />);
    expect(screen.getByRole('link')).toBeVisible();
  });

  it('should href expose when label is empty', async () => {
    const href = '1ilsang.dev';
    render(<ExternalLink href={href} />);
    expect(screen.getByRole('link')).toHaveTextContent(href);
  });

  it('should label expose when label is exist', async () => {
    const label = 'chul';
    render(<ExternalLink href="1ilsang.dev" label={label} />);
    expect(screen.getByRole('link')).toHaveTextContent(label);
  });

  it('should have children', async () => {
    const text = 'Hello, world';
    render(<ExternalLink href="1ilsang.dev">{text}</ExternalLink>);
    expect(screen.getByRole('link')).toHaveTextContent(text);
  });

  it('should have default class', async () => {
    render(<ExternalLink href="1ilsang.dev" />);
    expect(screen.getByRole('link')).toHaveClass(highlighterClass);
  });

  it('should be able to add classes', async () => {
    const propClass = 'chul';
    render(<ExternalLink className={propClass} href="1ilsang.dev" />);
    expect(screen.getByRole('link')).toHaveClass(
      ...[highlighterClass, propClass],
    );
  });

  it('should disable default CSS transition when prop is true', async () => {
    render(<ExternalLink href="1ilsang.dev" disableDefaultCSSTransition />);
    expect(screen.getByRole('link')).not.toHaveClass(highlighterClass);
  });

  it('should render with both label and children', async () => {
    const label = 'My Link';
    const childText = ' - Click here';
    render(
      <ExternalLink href="1ilsang.dev" label={label}>
        {childText}
      </ExternalLink>,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveTextContent(`${label}${childText}`);
  });
});

describe('attr', () => {
  it('should href be propValue', () => {
    const href = '1ilsang.dev';
    render(<ExternalLink href={href} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', href);
  });

  it('should target has _blank', async () => {
    render(<ExternalLink href="1ilsang.dev" />);
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
  });

  it('should rel be secure', async () => {
    render(<ExternalLink href="1ilsang.dev" />);
    expect(screen.getByRole('link')).toHaveAttribute(
      'rel',
      'noopener noreferrer',
    );
  });
});

describe('interactions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call ga tracking when clicked with href as value', async () => {
    const href = 'https://example.com';
    render(<ExternalLink href={href} />);

    await userEvent.click(screen.getByRole('link'));

    expect(ga).toHaveBeenCalledWith('linkClick', {
      type: 'external-link',
      value: href,
    });
  });

  it('should call ga tracking when clicked with label as value', async () => {
    const href = 'https://example.com';
    const label = 'Example Site';
    render(<ExternalLink href={href} label={label} />);

    await userEvent.click(screen.getByRole('link'));

    expect(ga).toHaveBeenCalledWith('linkClick', {
      type: 'external-link',
      value: label,
    });
  });
});
