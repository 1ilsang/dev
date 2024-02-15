import { FunctionComponent, PropsWithChildren } from 'react';

type ExternalLinkProps = PropsWithChildren & {
  href: string;
  classNames?: string;
  label?: string;
};

const ExternalLink: FunctionComponent<ExternalLinkProps> = ({
  href,
  label,
  classNames = '',
  children,
}) => {
  return (
    <a
      className={`highlighter ${classNames}`}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {label ? label : href}
      {children}
    </a>
  );
};

export default ExternalLink;
