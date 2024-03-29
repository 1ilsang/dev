import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, memo, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import { AvatarImage } from '../Avatar';

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
        className={classNames(
          `tracking-tight focus:text-gray-700`,
          [
            logo
              ? 'text-2xl font-bold mt-2 mb-2 ml-3.5'
              : 'text-xl mt-2.5 mr-6',
          ],
          { 'background-color': path === '/' },
        )}
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
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const [scrollDown, setScrollDown] = useState(false);

  const [notHome, postPage] = useMemo(() => {
    const { pathname } = router;
    return [pathname !== '/', pathname.includes('/posts')];
  }, [router.pathname]);

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
      className={classNames('nav flex-wrap water-rainbow', {
        'post-nav-trans': !hover && postPage,
        'nav-shadow': notHome && !scrollDown,
      })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavText logo text="1ilsang" link="/" path={router.pathname} />
      <div className="flex">
        <NavText text="posts" link="/posts" />
        <NavText text="tags" link="/tags" />
        <AvatarImage nav />
      </div>
    </nav>
  );
};

export default Navbar;
