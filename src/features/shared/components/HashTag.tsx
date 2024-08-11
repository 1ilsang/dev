import classNames from 'classnames';
import Link from 'next/link';
import type { FunctionComponent } from 'react';

interface HashTagProps {
  className?: string;
  link: string;
  content: string;
  target?: string;
}

const HashTag: FunctionComponent<HashTagProps> = ({
  className = '',
  content,
  link,
  target = '_self',
}) => {
  return (
    <Link
      className={classNames('text-highlight print:text-black hover:underline', [
        className,
      ])}
      href={link}
      target={target}
    >
      #{content}
    </Link>
  );
};

export default HashTag;
