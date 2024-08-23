import type { FunctionComponent, PropsWithChildren } from 'react';
import classNames from 'classnames';

type ExternalLinkProps = PropsWithChildren & {
  href: string;
  className?: string;
  label?: string;
  disableDefaultCSSTransition?: boolean;
};

const ExternalLink: FunctionComponent<ExternalLinkProps> = ({
  href,
  label,
  className = '',
  children,
  disableDefaultCSSTransition = false,
}) => {
  return (
    <a
      className={classNames([
        { highlighter: !disableDefaultCSSTransition },
        className,
      ])}
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
