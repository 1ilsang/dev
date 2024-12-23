import type { FunctionComponent, PropsWithChildren } from 'react';

type Props = PropsWithChildren;

export const RightSide: FunctionComponent<Props> = ({ children }) => {
  return <div className="flex flex-col w-full ml-0 md:ml-6">{children}</div>;
};
