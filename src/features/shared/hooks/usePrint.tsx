import { useEffect, useState } from 'react';

type BeforeFn = (event: WindowEventMap['beforeprint']) => void;
type AfterFn = (event: WindowEventMap['afterprint']) => void;

const usePrint = (beforeFn?: BeforeFn, afterFn?: AfterFn) => {
  const [print, setPrint] = useState(false);

  useEffect(() => {
    const handleBeforePrint: BeforeFn = (e) => {
      beforeFn?.(e);
      setPrint(true);
    };
    const handleAfterPrint: AfterFn = (e) => {
      afterFn?.(e);
      setPrint(false);
    };
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  return { print };
};

export default usePrint;
