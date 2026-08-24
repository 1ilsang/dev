'use client';

import { useEffect } from 'react';
import { ga } from '../../helpers/logger';

export const CodeCopyButton = () => {
  useEffect(() => {
    const figures = document.querySelectorAll('.markdown figure');
    figures.forEach((figure) => {
      if (figure.querySelector('[data-copy-btn]')) return;
      const pre = figure.querySelector('pre');
      if (!pre) return;

      const btn = document.createElement('button');
      btn.setAttribute('data-copy-btn', '');
      btn.setAttribute('aria-label', 'Copy code');
      btn.textContent = 'Copy';
      Object.assign(btn.style, {
        position: 'absolute',
        top: '8px',
        right: '8px',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '12px',
        lineHeight: '1',
        color: 'var(--theme-copy-foreground)',
        background: 'var(--theme-copy-background)',
        border: '1px solid var(--theme-code-border)',
        cursor: 'pointer',
        transition: 'color 0.15s, border-color 0.15s',
        minWidth: '52px',
        textAlign: 'center',
        backgroundSize: '200% 100%',
        backgroundPosition: '100% 0',
      });

      btn.addEventListener('mouseenter', () => {
        if (btn.dataset.copied) return;
        btn.style.color = 'var(--theme-foreground)';
        btn.style.background = 'var(--theme-copy-hover-background)';
      });
      btn.addEventListener('mouseleave', () => {
        if (btn.dataset.copied) return;
        btn.style.color = 'var(--theme-copy-foreground)';
        btn.style.background = 'var(--theme-copy-background)';
      });

      btn.addEventListener('click', async () => {
        if (btn.dataset.copied) return;
        const code = pre.querySelector('code');
        const text = code?.textContent ?? '';
        await navigator.clipboard.writeText(text);
        ga('codeCopy', { type: 'code-block', value: text.slice(0, 50) });

        btn.dataset.copied = 'true';
        btn.textContent = '✅';
        btn.style.color = 'var(--theme-copy-success)';
        btn.style.borderColor = 'var(--theme-copy-success)';
        btn.style.cursor = 'default';
        btn.style.transition = 'none';
        btn.style.background =
          'linear-gradient(to right, var(--theme-copy-success-background) var(--fill), var(--theme-copy-background) var(--fill))';
        btn.style.setProperty('--fill', '0%');

        requestAnimationFrame(() => {
          btn.style.transition =
            '--fill 0.3s linear, color 0.15s, border-color 0.15s';
          btn.style.setProperty('--fill', '100%');
        });

        setTimeout(() => {
          delete btn.dataset.copied;
          btn.textContent = 'Copy';
          btn.style.color = 'var(--theme-copy-foreground)';
          btn.style.background = 'var(--theme-copy-background)';
          btn.style.borderColor = 'var(--theme-code-border)';
          btn.style.cursor = 'pointer';
          btn.style.transition = 'color 0.15s, border-color 0.15s';
        }, 2000);
      });

      pre.style.position = 'relative';
      pre.appendChild(btn);
    });

    // Register CSS property for animatable gradient
    if (!document.querySelector('style[data-copy-btn-style]')) {
      const style = document.createElement('style');
      style.setAttribute('data-copy-btn-style', '');
      style.textContent = `@property --fill { syntax: '<percentage>'; inherits: false; initial-value: 0%; }`;
      document.head.appendChild(style);
    }
  }, []);

  return null;
};
