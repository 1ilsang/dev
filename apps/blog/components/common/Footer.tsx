import Link from "next/link";
import { FunctionComponent } from "react";

const Footer: FunctionComponent = () => {
  return (
    <div className="footer">
      <ul>
        <li>
          <Link href="/about">1ilsang</Link>
        </li>
        <li>
          <Link href="https://github.com/1ilsang" passHref>
            <a rel="noopener noreferrer" target="_blank">
              github
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
