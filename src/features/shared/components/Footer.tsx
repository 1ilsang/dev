'use client';

import Link from 'next/link';
import type { FunctionComponent, PropsWithChildren } from 'react';
import { memo } from 'react';
import { MyProfile } from '~/about/headline/data/profile';
import ExternalLink from './ExternalLink';
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
      <footer className="flex w-full h-screen">
        <div className="flex w-2/3 overflow-hidden">
          {Array.from({ length: 12 }, (_, idx) => (
            <Frame key={idx} idx={idx} />
          ))}
        </div>
        <ul className="content-center w-1/3 text-center">
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
      </footer>
    );
  },
);
Footer.displayName = 'Footer';
