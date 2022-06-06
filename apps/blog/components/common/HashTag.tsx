import Link from "next/link";
import { FunctionComponent } from "react";

interface HashTagProps {
  className?: string;
  link: string;
  content: string;
  target?: string;
}

const HashTag: FunctionComponent<HashTagProps> = ({
  className = "",
  content,
  link,
  target = "_self",
}) => {
  return (
    <Link href={link} target={target}>
      <a className={`${className} hashtag`}>#{content}</a>
    </Link>
  );
};

export default HashTag;
