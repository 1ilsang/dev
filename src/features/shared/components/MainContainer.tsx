import classNames from 'classnames';
import type { FunctionComponent, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  className?: string;
};

export const MainContainer: FunctionComponent<Props> = ({
  children,
  className,
}) => {
  return (
    <section
      className={classNames(
        'h-auto min-h-full max-w-screen-md py-20 md:py-28 mx-4 min-[790px]:m-auto print:py-0',
        className,
      )}
    >
      {children}
    </section>
  );
};
