import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CodeCopyButton } from './CodeCopyButton';

const mockWriteText = jest.fn().mockResolvedValue(undefined);
Object.assign(navigator, {
  clipboard: { writeText: mockWriteText },
});

const setupDOM = () => {
  const container = document.createElement('div');
  container.className = 'markdown';
  const figure = document.createElement('figure');
  const pre = document.createElement('pre');
  const code = document.createElement('code');
  code.textContent = 'const x = 1;';
  pre.appendChild(code);
  figure.appendChild(pre);
  container.appendChild(figure);
  document.body.appendChild(container);
  return { container, figure, pre };
};

afterEach(() => {
  document.body.innerHTML = '';
  jest.clearAllMocks();
});

describe('CodeCopyButton', () => {
  it('should add copy button to code blocks', async () => {
    setupDOM();
    render(<CodeCopyButton />);

    await waitFor(() => {
      expect(document.querySelector('[data-copy-btn]')).not.toBeNull();
    });
    expect(document.querySelector('[data-copy-btn]')!.textContent).toBe('Copy');
  });

  it('should not add duplicate buttons', async () => {
    setupDOM();
    render(<CodeCopyButton />);
    render(<CodeCopyButton />);

    await waitFor(() => {
      expect(document.querySelectorAll('[data-copy-btn]')).toHaveLength(1);
    });
  });

  it('should copy code to clipboard on click', async () => {
    setupDOM();
    render(<CodeCopyButton />);

    await waitFor(() => {
      expect(document.querySelector('[data-copy-btn]')).not.toBeNull();
    });

    const btn = document.querySelector('[data-copy-btn]') as HTMLButtonElement;
    await userEvent.click(btn);

    expect(mockWriteText).toHaveBeenCalledWith('const x = 1;');
  });

  it('should show done state after click', async () => {
    setupDOM();
    render(<CodeCopyButton />);

    await waitFor(() => {
      expect(document.querySelector('[data-copy-btn]')).not.toBeNull();
    });

    const btn = document.querySelector('[data-copy-btn]') as HTMLButtonElement;
    await userEvent.click(btn);

    expect(btn.textContent).toBe('✅');
    expect(btn.dataset.copied).toBe('true');
  });

  it('should ignore clicks during done state', async () => {
    setupDOM();
    render(<CodeCopyButton />);

    await waitFor(() => {
      expect(document.querySelector('[data-copy-btn]')).not.toBeNull();
    });

    const btn = document.querySelector('[data-copy-btn]') as HTMLButtonElement;
    await userEvent.click(btn);
    await userEvent.click(btn);

    expect(mockWriteText).toHaveBeenCalledTimes(1);
  });

  it('should set pre position to relative', async () => {
    const { pre } = setupDOM();
    render(<CodeCopyButton />);

    await waitFor(() => {
      expect(pre.style.position).toBe('relative');
    });
  });
});
