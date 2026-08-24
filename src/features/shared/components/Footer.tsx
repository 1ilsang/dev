'use client';

import Link from 'next/link';
import type { FunctionComponent, PropsWithChildren } from 'react';
import { memo } from 'react';
import { MyProfile } from '~/about/headline/data/profile';
import { ExternalLink } from './ExternalLink';
import { usePrint } from '../hooks/usePrint';

const Item: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <li className="text-white inline-block text-sm px-4 relative after:content-['•'] after:absolute after:right-[calc(0.2rem*-1)] last:after:content-['']">
      {children}
    </li>
  );
};

const Frame: FunctionComponent<{ idx: number }> = ({ idx }) => {
  const rotate = [
    `rotate-[40deg]`,
    `rotate-[30deg]`,
    `rotate-[0deg]`,
    `rotate-[20deg]`,
    `-rotate-[50deg]`,
    `-rotate-[110deg]`,
    `rotate-[20deg]`,
    `-rotate-[90deg]`,
    `-rotate-[60deg]`,
    `rotate-[10deg]`,
    `-rotate-[70deg]`,
    `-rotate-[80deg]`,
  ];
  return (
    <div className={`flex ${rotate[idx]}`}>
      <div className="w-10 h-full bg-highlight brightness-125" />
      <div className="w-10 h-full bg-snazzy-bg" />
    </div>
  );
};
type Props = {
  showPrint?: boolean;
};
export const Footer: FunctionComponent<Props> = memo(
  ({ showPrint = false }) => {
    const { print } = usePrint({ disable: showPrint });
    const hoverHighlight = 'hover:text-highlight';

    if (print || process.env.NEXT_PUBLIC_E2E) return null;
    return (
      <footer className="relative isolate flex h-screen w-full shrink-0 overflow-hidden xl:mx-auto xl:h-[320px] xl:max-w-[768px] xl:items-center xl:justify-center xl:border-t xl:border-base/40 xl:px-10 xl:py-20">
        <div
          className="flex w-2/3 overflow-hidden xl:hidden"
          aria-hidden="true"
        >
          {Array.from({ length: 12 }, (_, idx) => (
            <Frame key={idx} idx={idx} />
          ))}
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 top-0 hidden h-px overflow-hidden xl:block"
          aria-hidden="true"
        >
          <div className="h-full w-1/3 animate-footer-sweep bg-gradient-to-r from-transparent via-highlight to-transparent motion-reduce:animate-none" />
        </div>

        <ul className="flex w-1/3 items-center justify-center text-center xl:hidden">
          <Item>
            <Link className={hoverHighlight} href="/about">
              1ilsang
            </Link>
          </Item>
          <Item>
            <ExternalLink
              className={hoverHighlight}
              href={MyProfile.github.href}
              label="GitHub"
              disableDefaultCSSTransition
            />
          </Item>
          <Item>
            <ExternalLink
              className={hoverHighlight}
              href={MyProfile.linkedin.href}
              label="LinkedIn"
              disableDefaultCSSTransition
            />
          </Item>
        </ul>

        <div className="relative z-10 hidden w-full items-center justify-between xl:flex">
          <div>
            <Link
              className="text-xl font-bold transition-colors hover:text-highlight"
              href="/"
            >
              1ilsang.dev
            </Link>
            <p className="text-[10px] tracking-[0.25em] text-sub-blue uppercase">
              Keep exploring
            </p>
          </div>
          <ul className="flex items-center">
            <Item>
              <Link className={hoverHighlight} href="/about">
                About
              </Link>
            </Item>
            <Item>
              <ExternalLink
                className={hoverHighlight}
                href={MyProfile.github.href}
                label="GitHub"
                disableDefaultCSSTransition
              />
            </Item>
            <Item>
              <ExternalLink
                className={hoverHighlight}
                href={MyProfile.linkedin.href}
                label="LinkedIn"
                disableDefaultCSSTransition
              />
            </Item>
          </ul>
        </div>
      </footer>
    );
  },
);
Footer.displayName = 'Footer';
