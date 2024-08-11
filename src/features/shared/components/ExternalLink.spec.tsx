import { render, screen } from '@testing-library/react';
import ExternalLink from './ExternalLink';

describe('rendering', () => {
  it('should href expose when label is empty', async () => {
    const href = '1ilsang.dev';
    render(<ExternalLink href={href} />);

    await screen.findByRole('link');
    expect(screen.getByRole('link')).toHaveTextContent(href);
  });

  it('should label expose when label is exist', async () => {
    const href = '1ilsang.dev';
    const label = 'chul';
    render(<ExternalLink href={href} label="chul" />);

    await screen.findByRole('link');
    expect(screen.getByRole('link')).toHaveTextContent(label);
  });

  it('should have children', async () => {
    const href = '1ilsang.dev';
    const text = 'Hello, world';
    render(<ExternalLink href={href}>{text}</ExternalLink>);

    await screen.findByRole('link');
    expect(screen.getByRole('link')).toHaveTextContent(text);
  });

  it('should have default class', async () => {
    const href = '1ilsang.dev';
    const defaultClass = 'highlighter';
    render(<ExternalLink href={href} />);

    await screen.findByRole('link');
    expect(screen.getByRole('link')).toHaveClass(defaultClass);
  });

  it('should be able to add classes', async () => {
    const href = '1ilsang.dev';
    const propClass = 'chul';
    const defaultClass = 'highlighter';
    render(<ExternalLink classNames={propClass} href={href} />);

    await screen.findByRole('link');

    expect(screen.getByRole('link')).toHaveClass(...[defaultClass, propClass]);
  });
});

describe('attr', () => {
  it('should target has _blank', async () => {
    const href = '1ilsang.dev';
    render(<ExternalLink href={href} />);
    await screen.findByRole('link', { name: href });
    expect(screen.getByRole('link').getAttribute('target')).toBe('_blank');
  });

  it('should rel be secure', async () => {
    const href = '1ilsang.dev';
    render(<ExternalLink href={href} />);
    await screen.findByRole('link', { name: href });
    expect(screen.getByRole('link').getAttribute('rel')).toBe(
      'noopener noreferrer',
    );
  });
});
