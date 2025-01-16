'use client';

import { useCallback, useEffect, useState } from 'react';

type BeforeFn = (event: WindowEventMap['beforeprint']) => void;
type AfterFn = (event: WindowEventMap['afterprint']) => void;

type Props = {
  disable?: boolean;
  beforeFn?: BeforeFn;
  afterFn?: AfterFn;
};

export const usePrint = (props?: Props) => {
  const { disable = false, beforeFn, afterFn } = props ?? {};
  const [print, setPrint] = useState(false);

  const handleBeforePrint: BeforeFn = useCallback(
    (e) => {
      if (disable) return;
      beforeFn?.(e);
      setPrint(true);
    },
    [disable],
  );
  const handleAfterPrint: AfterFn = useCallback(
    (e) => {
      if (disable) return;
      afterFn?.(e);
      setPrint(false);
    },
    [disable],
  );

  useEffect(() => {
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [disable]);

  return { print };
};
