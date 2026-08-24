'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FunctionComponent } from 'react';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { CATEGORY_LIST, getCategoryPath } from '~/posts/constants';
import type { Category } from '~/posts/models';
import { usePrint } from '~/shared/hooks/usePrint';
import { Avatar } from '../Avatar';
import { ThemeToggle } from './ThemeToggle';

interface NavTextProps {
  text: string;
  subtitle?: string;
  link: string;
  logo?: boolean;
  path?: string;
  icon?: 'home' | 'posts' | 'tags' | 'about';
  activeOnSubpath?: boolean;
}

type IconName =
  | NonNullable<NavTextProps['icon']>
  | 'javascript'
  | 'rust'
  | 'activity'
  | 'book'
  | 'retrospect'
  | 'tool'
  | 'algorithm';

const NavIcon = ({ name }: { name: IconName }) => {
  const commonProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.7,
  };

  return (
    <svg
      aria-hidden="true"
      className="h-[18px] w-[18px] flex-none"
      viewBox="0 0 24 24"
      {...commonProps}
    >
      {name === 'home' && (
        <>
          <path d="m3 11 9-8 9 8" />
          <path d="M5 10v10h14V10M9 20v-6h6v6" />
        </>
      )}
      {name === 'posts' && (
        <>
          <path d="M6 3h9l4 4v14H6z" />
          <path d="M14 3v5h5M9 12h6M9 16h6" />
        </>
      )}
      {name === 'tags' && (
        <>
          <path d="M20 12 12 20 4 12V4h8z" />
          <circle cx="9" cy="9" r="1.3" />
        </>
      )}
      {name === 'about' && (
        <>
          <circle cx="12" cy="7" r="3" />
          <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
        </>
      )}
      {name === 'javascript' && (
        <>
          <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
        </>
      )}
      {name === 'rust' && (
        <>
          <circle cx="12" cy="12" r="5" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
        </>
      )}
      {name === 'activity' && <path d="M3 12h4l2-6 4 12 2-6h6" />}
      {name === 'book' && (
        <>
          <path d="M4 5a3 3 0 0 1 3-2h5v17H7a3 3 0 0 0-3 2z" />
          <path d="M20 5a3 3 0 0 0-3-2h-5v17h5a3 3 0 0 1 3 2z" />
        </>
      )}
      {name === 'retrospect' && (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v5l3 2M5 5 3 8" />
        </>
      )}
      {name === 'tool' && (
        <path d="M14 6a4 4 0 0 0-5 5L3 17l4 4 6-6a4 4 0 0 0 5-5l-3 3-4-4z" />
      )}
      {name === 'algorithm' && (
        <>
          <circle cx="6" cy="5" r="2" />
          <circle cx="18" cy="12" r="2" />
          <circle cx="6" cy="19" r="2" />
          <path d="M8 5h3a3 3 0 0 1 3 3v1M8 19h3a3 3 0 0 0 3-3v-1" />
        </>
      )}
    </svg>
  );
};

const NavText: FunctionComponent<NavTextProps> = memo(
  ({
    text,
    subtitle,
    link,
    logo = false,
    path,
    icon,
    activeOnSubpath = false,
  }) => {
    const pathname = usePathname();
    const current =
      pathname === link || (activeOnSubpath && pathname.startsWith(`${link}/`));
    const handleClick = () => {
      if (pathname === link) {
        document.body.scrollTo(0, 0);
      }
    };

    return (
      <div
        className={classNames('tracking-tight mr-6 xl:mr-0', {
          'text-on-vibrant xl:text-white': path === '/',
          'text-xl mt-2.5 xl:mt-0 xl:text-[1rem]': !logo,
          'text-2xl font-bold my-2 ml-3.5 xl:m-0': logo,
        })}
      >
        <Link
          aria-current={current ? 'page' : undefined}
          className={classNames(
            'xl:block xl:rounded-sm xl:border xl:border-transparent xl:py-2.5 xl:no-underline xl:transition-colors xl:hover:border-base/40 xl:hover:bg-base/10',
            {
              'xl:px-1': subtitle,
              'xl:px-3': !subtitle,
              'hover:underline': !subtitle,
              'hover:no-underline': subtitle,
              'xl:border-base/60 xl:bg-base/10 xl:text-highlight':
                current && !logo,
            },
          )}
          href={link}
          onClick={handleClick}
        >
          <span className="flex items-center gap-3">
            {icon && <NavIcon name={icon} />}
            <span className={classNames({ 'flex flex-col': subtitle })}>
              <span>{text}</span>
              {subtitle && (
                <span className="whitespace-nowrap text-xs font-normal text-dark">
                  {subtitle}
                </span>
              )}
            </span>
          </span>
        </Link>
      </div>
    );
  },
);
NavText.displayName = 'NavText';

type Props = {
  showPrint?: boolean;
  activeCategory?: Category;
};
export const Navbar: FunctionComponent<Props> = ({
  showPrint = false,
  activeCategory,
}) => {
  const pathname = usePathname();
  const [scrollDown, setScrollDown] = useState(
    typeof document !== 'undefined' && document.body.scrollTop > 50,
  );
  const navRef = useRef<HTMLElement>(null);
  const { print } = usePrint({ disable: showPrint });

  const navShadow = useMemo(() => {
    return !['/', '/about'].includes(pathname);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (document.body.scrollTop > document.body.clientHeight) {
        if (!scrollDown) {
          setScrollDown(true);
        }
        return;
      }
      setScrollDown(document.body.scrollTop > 50);
    };
    handleScroll();
    document.body.addEventListener('scroll', handleScroll);
    return () => {
      document.body.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const navigation = navRef.current;
    if (!navigation) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.deltaY === 0) return;

      const deltaMultiplier =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 16
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? document.body.clientHeight
            : 1;

      event.preventDefault();
      document.body.scrollBy({
        top: event.deltaY * deltaMultiplier,
        left: 0,
        behavior: 'auto',
      });
    };

    navigation.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      navigation.removeEventListener('wheel', handleWheel);
    };
  }, []);

  if (print) return null;
  return (
    <nav
      ref={navRef}
      aria-label="메인 네비게이션"
      className={classNames(
        'fixed z-40 flex flex-wrap w-full justify-between justify-items-center max-xl:hover:animate-rainbow-water max-xl:hover:bg-nav max-xl:hover:bg-[length:400%_400%] xl:top-0 xl:left-0 xl:h-screen xl:w-[calc((100vw-1280px)/2+256px)] xl:flex-col xl:flex-nowrap xl:items-stretch xl:justify-start xl:border-r xl:border-base/40 xl:bg-sidebar xl:py-[40px]',
        {
          'max-xl:shadow-nav max-xl:shadow-lg': navShadow && !scrollDown,
        },
      )}
    >
      <div className="hidden h-full w-[216px] xl:mr-5 xl:ml-auto xl:flex xl:flex-col">
        <div className="ml-3 mb-4 flex items-center">
          <Avatar nav />
          <div className="flex min-w-0 flex-col items-start justify-center">
            <NavText
              logo
              text="1ilsang.dev"
              subtitle="Software Engineer"
              link="/"
              path={pathname}
            />
          </div>
        </div>

        <ul className="flex flex-col gap-1">
          <li>
            <NavText icon="home" text="Home" link="/" />
          </li>
          <li>
            <NavText icon="posts" text="Posts" link="/posts" />
            <ul
              aria-label="포스트 카테고리"
              className="mt-0.5 ml-[21px] py-1 pl-3"
            >
              {CATEGORY_LIST.map((category, index) => (
                <li
                  className={classNames(
                    'relative before:absolute before:-left-3 before:top-0 before:w-px before:bg-base/50 after:absolute after:-left-3 after:top-1/2 after:h-px after:w-3 after:bg-base/50',
                    {
                      'before:h-full': index < CATEGORY_LIST.length - 1,
                      'before:h-1/2': index === CATEGORY_LIST.length - 1,
                    },
                  )}
                  key={category}
                >
                  <Link
                    aria-current={
                      pathname === getCategoryPath(category) ||
                      activeCategory === category
                        ? 'page'
                        : undefined
                    }
                    className={classNames(
                      'group flex min-w-0 items-center gap-2.5 border px-3 py-2 text-[13px] transition-colors',
                      {
                        'border-base/60 bg-base/20 text-white':
                          pathname === getCategoryPath(category) ||
                          activeCategory === category,
                        'border-transparent text-sub-blue hover:border-base/40 hover:bg-base/10 hover:text-white':
                          pathname !== getCategoryPath(category) &&
                          activeCategory !== category,
                      },
                    )}
                    href={getCategoryPath(category)}
                  >
                    <NavIcon name={category.toLowerCase() as IconName} />
                    <span className="truncate">{category}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <NavText activeOnSubpath icon="tags" text="Tags" link="/tags" />
          </li>
          <li>
            <NavText icon="about" text="About" link="/about" />
          </li>
        </ul>

        <div className="mt-auto">
          <ThemeToggle />
          <p className="mt-4 border-t border-base/40 pt-5 text-xs text-dark">
            © 1ilsang
          </p>
        </div>
      </div>

      <div className="flex w-full justify-between xl:hidden">
        <NavText logo text="1ilsang" link="/" path={pathname} />
        <div className="flex">
          <NavText text="Posts" link="/posts" />
          <NavText text="Tags" link="/tags" />
          <Avatar nav />
        </div>
      </div>
    </nav>
  );
};
