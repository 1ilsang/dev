import { useLayoutEffect, useState } from 'react';

export const useCSR = () => {
  const [isCSR, setCSR] = useState(false);

  useLayoutEffect(() => {
    setCSR(true);
  }, []);

  return {
    isCSR: typeof window !== 'undefined' && isCSR,
  };
};
