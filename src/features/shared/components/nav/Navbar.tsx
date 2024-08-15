'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FunctionComponent } from 'react';
import { memo, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Avatar } from '../Avatar';
import usePrint from '~/shared/hooks/usePrint';

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
        className={classNames('tracking-tight mr-6', {
          'text-snazzy-bg': path === '/',
          'text-xl mt-2.5': !logo,
          'text-2xl	font-bold	my-2 ml-3.5': logo,
        })}
      >
        <Link className="hover:underline" href={`${link}`}>
          {text}
        </Link>
      </h2>
    );
  },
);
NavText.displayName = 'NavText';

type Props = { showPrint?: boolean };
const Navbar: FunctionComponent<Props> = ({ showPrint = false }) => {
  const pathname = usePathname();
  const [hover, setHover] = useState(false);
  const [scrollDown, setScrollDown] = useState(false);
  const { print } = usePrint({ disable: showPrint });

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

  if (print) return null;
  return (
    <nav
      className={classNames(
        'fixed z-40 flex flex-wrap w-full justify-between justify-items-center hover:animate-rainbow-water hover:bg-nav hover:bg-[length:400%_400%]',
        {
          'opacity-10	md:opacity-100': !hover && postPage,
          'shadow-nav shadow-lg': navShadow && !scrollDown,
        },
      )}
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
