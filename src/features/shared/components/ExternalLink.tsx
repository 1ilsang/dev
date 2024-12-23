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
  const highlighter =
    'inline-block text-[#30ffcb] leading-[1.1] after:transition-[width] after:duration-500 ease-in-out hover:after:w-[100%] after:w-[0] after:block after:h-[1px] print:text-black print:underline after:bg-[#30ffcb] after:content-[""]';

  return (
    <a
      className={classNames([
        { [highlighter]: !disableDefaultCSSTransition },
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
