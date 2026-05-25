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
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-snazzy-bg focus:text-white focus:rounded"
      >
        본문으로 건너뛰기
      </Link>
      <main className={classNames('h-auto', className)}>{children}</main>
    </>
  );
};
