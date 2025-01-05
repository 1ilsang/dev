import { render, screen } from '@testing-library/react';
import ExternalLink, { highlighterClass } from './ExternalLink';

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
