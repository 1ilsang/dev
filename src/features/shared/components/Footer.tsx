import Link from 'next/link';
import type { FunctionComponent } from 'react';
import { memo } from 'react';
import { MyProfile } from '~/about/headline/data/profile';

const Footer: FunctionComponent = memo(() => {
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
            href={MyProfile.github.href}
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href={MyProfile.linkedin.href}
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
Footer.displayName = 'Footer';

export default Footer;
