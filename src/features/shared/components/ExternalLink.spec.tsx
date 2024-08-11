import { render, screen } from '@testing-library/react';
import ExternalLink from './ExternalLink';

describe('rendering', () => {
  it('label이 없을 경우 href가 노출되어야 함', async () => {
    const href = '1ilsang.dev';
    render(<ExternalLink href={href} />);

    await screen.findByRole('link');
    expect(screen.getByRole('link')).toHaveTextContent(href);
  });

  it('label이 있을 경우 라벨이 노출되어야 함', async () => {
    const href = '1ilsang.dev';
    const label = 'chul';
    render(<ExternalLink href={href} label="chul" />);

    await screen.findByRole('link');
    expect(screen.getByRole('link')).toHaveTextContent(label);
  });

  it('children이 있을 경우 해당 컴포넌트가 노출되어야 함', async () => {
    const href = '1ilsang.dev';
    const text = 'Hello, world';
    render(<ExternalLink href={href}>{text}</ExternalLink>);

    await screen.findByRole('link');
    expect(screen.getByRole('link')).toHaveTextContent(text);
  });

  it('기본 클래스명으로 highlighter가 있어야 함', async () => {
    const href = '1ilsang.dev';
    const defaultClass = 'highlighter';
    render(<ExternalLink href={href} />);

    await screen.findByRole('link');
    expect(screen.getByRole('link')).toHaveClass(defaultClass);
  });

  it('클래스를 추가할 수 있어야 함', async () => {
    const href = '1ilsang.dev';
    const propClass = 'chul';
    const defaultClass = 'highlighter';
    render(<ExternalLink classNames={propClass} href={href} />);

    await screen.findByRole('link');

    expect(screen.getByRole('link')).toHaveClass(...[defaultClass, propClass]);
  });
});

describe('attr', () => {
  it('클릭시 새창으로 떠야한다', async () => {
    const href = '1ilsang.dev';
    render(<ExternalLink href={href} />);
    await screen.findByRole('link', { name: href });
    expect(screen.getByRole('link').getAttribute('target')).toBe('_blank');
  });

  it('클릭시 rel이 적용되어야 한다', async () => {
    const href = '1ilsang.dev';
    render(<ExternalLink href={href} />);
    await screen.findByRole('link', { name: href });
    expect(screen.getByRole('link').getAttribute('rel')).toBe(
      'noopener noreferrer',
    );
  });
});
