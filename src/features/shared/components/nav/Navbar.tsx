'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FunctionComponent } from 'react';
import { memo, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Avatar } from '../Avatar';
import { usePrint } from '~/shared/hooks/usePrint';

interface NavTextProps {
  text: string;
  link: string;
  logo?: boolean;
  path?: string;
}

const NavText: FunctionComponent<NavTextProps> = memo(
  ({ text, link, logo = false, path }) => {
    const pathname = usePathname();
    const handleClick = () => {
      if (pathname === link) {
        document.body.scrollTo(0, 0);
      }
    };

    return (
      <div
        className={classNames('tracking-tight mr-6', {
          'text-snazzy-bg': path === '/',
          'text-xl mt-2.5': !logo,
          'text-2xl font-bold my-2 ml-3.5': logo,
        })}
      >
        <Link className="hover:underline" href={link} onClick={handleClick}>
          {text}
        </Link>
      </div>
    );
  },
);
NavText.displayName = 'NavText';

type Props = { showPrint?: boolean };
export const Navbar: FunctionComponent<Props> = ({ showPrint = false }) => {
  const pathname = usePathname();
  const [scrollDown, setScrollDown] = useState(
    typeof document !== 'undefined' && document.body.scrollTop > 50,
  );
  const { print } = usePrint({ disable: showPrint });

  const navShadow = useMemo(() => {
    return !['/', '/about'].includes(pathname);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (document.body.scrollTop > document.body.clientHeight) return;
      setScrollDown(document.body.scrollTop > 50);
    };
    document.body.addEventListener('scroll', handleScroll);
    return () => {
      document.body.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (print) return null;
  return (
    <nav
      aria-label="메인 네비게이션"
      className={classNames(
        'fixed z-40 flex flex-wrap w-full justify-between justify-items-center hover:animate-rainbow-water hover:bg-nav hover:bg-[length:400%_400%]',
        {
          'shadow-nav shadow-lg': navShadow && !scrollDown,
        },
      )}
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
