'use client';

import Link from 'next/link';
import type { FunctionComponent, PropsWithChildren } from 'react';
import { memo } from 'react';
import { MyProfile } from '~/about/headline/data/profile';
import ExternalLink from './ExternalLink';
import usePrint from '../hooks/usePrint';

const Item: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <li className="text-white inline-block text-sm px-4 relative after:content-['•'] after:absolute after:right-[calc(0.2rem*-1)] last:after:content-['']">
      {children}
    </li>
  );
};

type Props = {
  showPrint?: boolean;
};
export const Footer: FunctionComponent<Props> = memo(
  ({ showPrint = false }) => {
    const { print } = usePrint({ disable: showPrint });

    if (print) return null;
    return (
      <footer className="w-full	h-screen pt-[50vh] bg-footer">
        <ul className="text-center">
          <Item>
            <Link className="hover:text-black" href="/about">
              1ilsang
            </Link>
          </Item>
          <Item>
            <ExternalLink
              classNames="hover:text-black"
              href={MyProfile.github.href}
              label="GitHub"
              disableDefaultCSSTransition
            />
          </Item>
          <Item>
            <ExternalLink
              classNames="hover:text-black"
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
