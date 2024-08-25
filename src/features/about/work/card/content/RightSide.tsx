import type { FunctionComponent, PropsWithChildren } from 'react';

type Props = PropsWithChildren;

export const RightSide: FunctionComponent<Props> = ({ children }) => {
  return <div className="w-full flex flex-col ml-0 md:ml-6">{children}</div>;
};
