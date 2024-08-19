import classNames from 'classnames';
import type { FunctionComponent, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  className?: string;
};

export const MainLayout: FunctionComponent<Props> = ({
  children,
  className,
}) => {
  return <main className={classNames('h-auto', className)}>{children}</main>;
};
