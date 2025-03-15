'use client';

import classNames from 'classnames';
import type { FunctionComponent, PropsWithChildren } from 'react';
import { ga } from '../helpers/logger';

type ExternalLinkProps = PropsWithChildren & {
  href: string;
  className?: string;
  label?: string;
  disableDefaultCSSTransition?: boolean;
};

export const highlighterClass =
  'inline-block text-[#30ffcb] leading-[1.1] after:transition-[width] after:duration-500 ease-in-out hover:after:w-[100%] after:w-0 after:block after:h-[1px] print:text-black print:underline after:bg-[#30ffcb] after:content-[""]';

const ExternalLink: FunctionComponent<ExternalLinkProps> = ({
  href,
  label,
  className = '',
  children,
  disableDefaultCSSTransition = false,
}) => {
  const value = label || href;
  const handleExternalLinkClick = () => {
    ga('linkClick', { type: 'external-link', value });
  };
  return (
    <a
      className={classNames([
        { [highlighterClass]: !disableDefaultCSSTransition },
        className,
      ])}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      onClick={handleExternalLinkClick}
    >
      {value}
      {children}
    </a>
  );
};

export default ExternalLink;
