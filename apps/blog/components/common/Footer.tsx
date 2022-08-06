import Link from "next/link";
import { FunctionComponent } from "react";

const Footer: FunctionComponent = () => {
  return (
    <footer className="footer">
      <ul>
        <li>
          <Link href="/about">1ilsang</Link>
        </li>
        <li>
          <Link href="https://github.com/1ilsang" passHref>
            <a rel="noopener noreferrer" target="_blank">
              GitHub
            </a>
          </Link>
        </li>
        <li>
          <Link
            href="https://www.linkedin.com/in/sang-chul-lee-91a32b154/"
            passHref
          >
            <a rel="noopener noreferrer" target="_blank">
              LinkedIn
            </a>
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
