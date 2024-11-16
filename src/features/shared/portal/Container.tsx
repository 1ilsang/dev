'use client';

import { type FunctionComponent, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { useCSR } from '../hooks/useCSR';

type PortalProps = PropsWithChildren & {
  id?: string;
};

// FIXME: React 19.0.0-rc.1 has a bug with the type of createPortal
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const Portal: FunctionComponent<PortalProps> = ({
  children,
  id = 'portal',
}) => {
  const { isCSR } = useCSR();
  if (!isCSR) return null;

  const el = document.getElementById(id);
  if (!el) {
    throw new Error(`Not found Portal id: ${id}`);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return createPortal(children, el);
};
