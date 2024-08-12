'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FunctionComponent } from 'react';
import { memo, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Avatar } from '../Avatar';

interface NavTextProps {
  text: string;
  link: string;
  logo?: boolean;
  path?: string;
}

const NavText: FunctionComponent<NavTextProps> = memo(
  ({ text, link, logo = false, path }) => {
    return (
      <h2
        className={classNames(`nav-text`, {
          'nav-home': path === '/',
          'nav-logo': logo,
        })}
      >
        <Link className="hover-underline" href={`${link}`}>
          {text}
        </Link>
      </h2>
    );
  },
);
NavText.displayName = 'NavText';

const Navbar: FunctionComponent = () => {
  const pathname = usePathname();
  const [hover, setHover] = useState(false);
  const [scrollDown, setScrollDown] = useState(false);

  const [navShadow, postPage] = useMemo(() => {
    return [!['/', '/about'].includes(pathname), pathname.startsWith('/posts')];
  }, [pathname]);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollDown(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={classNames('nav water-rainbow', {
        'opacity-10	md:opacity-100': !hover && postPage,
        'nav-shadow': navShadow && !scrollDown,
      })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavText logo text="1ilsang" link="/" path={pathname} />
      <div className="flex">
        <NavText text="posts" link="/posts" />
        <NavText text="tags" link="/tags" />
        <Avatar nav />
      </div>
    </nav>
  );
};

export default Navbar;
