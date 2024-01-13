import Link from 'next/link';
import React, { FunctionComponent } from 'react';

const Footer: FunctionComponent = React.memo(function Footer() {
  return (
    <footer className="footer">
      <ul>
        <li>
          <Link href="/about">1ilsang</Link>
        </li>
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/1ilsang"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/sang-chul-lee-91a32b154/"
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
        </li>
      </ul>
    </footer>
  );
});

export default Footer;
