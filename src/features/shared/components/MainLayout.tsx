import classNames from 'classnames';
import Link from 'next/link';
import type { FunctionComponent, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  className?: string;
};

export const MainLayout: FunctionComponent<Props> = ({
  children,
  className,
}) => {
  return (
    <>
      <Link
        href="#main-content"
        tabIndex={0}
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-50 focus-visible:rounded-md focus-visible:border focus-visible:border-highlight focus-visible:bg-snazzy-bg focus-visible:px-4 focus-visible:py-2 focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
      >
        본문으로 건너뛰기
      </Link>
      <main
        className={classNames('content-plane h-auto min-h-full', className)}
      >
        {children}
      </main>
    </>
  );
};
