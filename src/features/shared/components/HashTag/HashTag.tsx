import classNames from 'classnames';
import Link from 'next/link';
import type { FunctionComponent } from 'react';
import { ga } from '../../helpers/logger';

interface HashTagProps {
  className?: string;
  link: string;
  content: string;
  target?: string;
}

export const HashTag: FunctionComponent<HashTagProps> = ({
  className = '',
  content,
  link,
  target = '_self',
}) => {
  const handleClick = () => {
    ga('tagClick', { type: 'tag', value: content });
  };

  return (
    <Link
      className={classNames('text-highlight print:text-black hover:underline', [
        className,
      ])}
      href={link}
      target={target}
      onClick={handleClick}
    >
      #{content}
    </Link>
  );
};
