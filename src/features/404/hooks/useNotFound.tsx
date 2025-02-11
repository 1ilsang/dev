import { useRouter } from 'next/navigation';
import { redirectUrlMapper } from '../constants';
import { useEffect, useState } from 'react';

export const useNotFound = () => {
  const [redirect, setRedirect] = useState<null | string>(null);
  const { push } = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const { pathname, hash } = url;
    const redirectUrl = redirectUrlMapper[pathname];

    setRedirect(redirectUrl ?? '');
    if (redirectUrl) {
      push(`${redirectUrl}${hash}`);
    }
  }, []);

  return { redirect };
};
