'use client';

import { useEffect } from 'react';

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
        color: '#a0aec0',
        background: '#2d3748',
        border: '1px solid #4a5568',
        cursor: 'pointer',
        transition: 'color 0.15s, border-color 0.15s',
        minWidth: '52px',
        textAlign: 'center',
        backgroundSize: '200% 100%',
        backgroundPosition: '100% 0',
      });

      btn.addEventListener('mouseenter', () => {
        if (btn.dataset.copied) return;
        btn.style.color = '#fff';
        btn.style.background = '#4a5568';
      });
      btn.addEventListener('mouseleave', () => {
        if (btn.dataset.copied) return;
        btn.style.color = '#a0aec0';
        btn.style.background = '#2d3748';
      });

      btn.addEventListener('click', async () => {
        if (btn.dataset.copied) return;
        const code = pre.querySelector('code');
        const text = code?.textContent ?? '';
        await navigator.clipboard.writeText(text);

        btn.dataset.copied = 'true';
        btn.textContent = '✅';
        btn.style.color = '#68d391';
        btn.style.borderColor = '#68d391';
        btn.style.cursor = 'default';
        btn.style.transition = 'none';
        btn.style.background =
          'linear-gradient(to right, #22543d var(--fill), #2d3748 var(--fill))';
        btn.style.setProperty('--fill', '0%');

        requestAnimationFrame(() => {
          btn.style.transition =
            '--fill 0.3s linear, color 0.15s, border-color 0.15s';
          btn.style.setProperty('--fill', '100%');
        });

        setTimeout(() => {
          delete btn.dataset.copied;
          btn.textContent = 'Copy';
          btn.style.color = '#a0aec0';
          btn.style.background = '#2d3748';
          btn.style.borderColor = '#4a5568';
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
