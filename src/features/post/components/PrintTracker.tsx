'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ga } from '~/shared/helpers/logger';

export const PrintTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => {
      const slug = pathname.replace('/posts/', '');
      ga('printPost', { type: 'print', value: slug });
    };
    window.addEventListener('beforeprint', handler);
    return () => window.removeEventListener('beforeprint', handler);
  }, [pathname]);

  return null;
};
