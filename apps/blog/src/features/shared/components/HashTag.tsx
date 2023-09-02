import Link from 'next/link';
import { FunctionComponent } from 'react';

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
    <Link className={`${className} hashtag`} href={link} target={target}>
      #{content}
    </Link>
  );
};

export default HashTag;
