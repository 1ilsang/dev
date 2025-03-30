import type { FunctionComponent } from 'react';

export const ExternalAnchor: FunctionComponent<{ href: string }> = ({
  href,
}) => {
  return (
    <a
      className="underline-highlight-fade relative top-[-0.1rem] px-0.25"
      title={href}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      ⎋
    </a>
  );
};
