'use client';

import { type FunctionComponent, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { useCSR } from '../hooks/useCSR';

type PortalProps = PropsWithChildren & {
  id?: string;
};

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

  return createPortal(children, el);
};
