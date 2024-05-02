import { FunctionComponent, PropsWithChildren } from 'react';
import { default as cn } from 'classnames';

type ExternalLinkProps = PropsWithChildren & {
  href: string;
  classNames?: string;
  label?: string;
  disableDefaultCSSTransition?: boolean;
};

const ExternalLink: FunctionComponent<ExternalLinkProps> = ({
  href,
  label,
  classNames = '',
  children,
  disableDefaultCSSTransition = false,
}) => {
  return (
    <a
      className={cn([
        { highlighter: !disableDefaultCSSTransition },
        classNames,
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
