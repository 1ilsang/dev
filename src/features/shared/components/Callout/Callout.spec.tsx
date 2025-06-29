import { render, screen } from '@testing-library/react';
import { Callout } from './Container';

describe('Callout Component', () => {
  describe('rendering', () => {
    it('should be visible', () => {
      render(<Callout>Test content</Callout>);
      expect(screen.getByText('Test content')).toBeVisible();
    });

    it('should render children correctly', () => {
      const testText = 'This is a test callout message';
      render(<Callout>{testText}</Callout>);
      expect(screen.getByText(testText)).toBeInTheDocument();
    });

    it('should render complex children', () => {
      render(
        <Callout>
          <div>
            <span>Complex</span> content with <strong>HTML</strong>
          </div>
        </Callout>,
      );
      expect(screen.getByText('Complex')).toBeInTheDocument();
      expect(screen.getByText('HTML')).toBeInTheDocument();
    });
  });

  describe('info callout', () => {
    it('should display info icon when info prop is true', () => {
      render(<Callout info>Info message</Callout>);
      expect(screen.getByText('ℹ️')).toBeInTheDocument();
    });

    it('should have correct info styling', () => {
      const { container } = render(<Callout info>Info message</Callout>);
      const calloutDiv = container.firstChild as HTMLElement;
      expect(calloutDiv).toHaveClass('bg-blue-100', 'text-blue-800');
    });
  });

  describe('warning callout', () => {
    it('should display warning icon when warning prop is true', () => {
      render(<Callout warning>Warning message</Callout>);
      expect(screen.getByText('⚠️')).toBeInTheDocument();
    });

    it('should have correct warning styling', () => {
      const { container } = render(<Callout warning>Warning message</Callout>);
      const calloutDiv = container.firstChild as HTMLElement;
      expect(calloutDiv).toHaveClass('bg-yellow-100', 'text-yellow-800');
    });
  });

  describe('error callout', () => {
    it('should display error icon when error prop is true', () => {
      render(<Callout error>Error message</Callout>);
      expect(screen.getByText('❗')).toBeInTheDocument();
    });

    it('should have correct error styling', () => {
      const { container } = render(<Callout error>Error message</Callout>);
      const calloutDiv = container.firstChild as HTMLElement;
      expect(calloutDiv).toHaveClass('bg-red-100', 'text-red-800');
    });

    it('should default to error when no type is specified', () => {
      render(<Callout>Default message</Callout>);
      expect(screen.getByText('❗')).toBeInTheDocument();
    });
  });

  describe('type priority', () => {
    it('should prioritize info over warning and error', () => {
      render(
        <Callout info warning error>
          Priority test
        </Callout>,
      );
      expect(screen.getByText('ℹ️')).toBeInTheDocument();
      expect(screen.queryByText('⚠️')).not.toBeInTheDocument();
      expect(screen.queryByText('❗')).not.toBeInTheDocument();
    });

    it('should prioritize warning over error when info is false', () => {
      render(
        <Callout warning error>
          Priority test
        </Callout>,
      );
      expect(screen.getByText('⚠️')).toBeInTheDocument();
      expect(screen.queryByText('❗')).not.toBeInTheDocument();
    });
  });

  describe('styling and classes', () => {
    it('should have base classes', () => {
      const { container } = render(<Callout>Test</Callout>);
      const calloutDiv = container.firstChild as HTMLElement;
      expect(calloutDiv).toHaveClass(
        'flex',
        'flex-row',
        'gap-1.75',
        'px-4',
        'py-1',
        'rounded-lg',
      );
    });

    it('should have correct text styling for content', () => {
      render(<Callout>Test content</Callout>);
      const contentDiv = screen.getByText('Test content');
      expect(contentDiv).toHaveClass('text-[0.95rem]', 'pr-1');
    });

    it('should have correct icon styling', () => {
      render(<Callout info>Test</Callout>);
      const iconDiv = screen.getByText('ℹ️');
      expect(iconDiv).toHaveClass('text-2xl', 'pt-3.5');
    });
  });

  describe('accessibility', () => {
    it('should be accessible with proper structure', () => {
      render(<Callout info>Accessible content</Callout>);
      const content = screen.getByText('Accessible content');
      expect(content).toBeInTheDocument();
      expect(content.closest('div')).toBeInTheDocument();
    });

    it('should maintain semantic structure for screen readers', () => {
      const { container } = render(
        <Callout warning>Important warning message</Callout>,
      );
      expect(container.firstChild).toHaveAttribute('class');
      expect(screen.getByText('Important warning message')).toBeInTheDocument();
      expect(screen.getByText('⚠️')).toBeInTheDocument();
    });
  });
});
