import { useRouter } from 'next/router';
import { redirectUrlMapper } from '../constants';
import { useEffect, useState } from 'react';

const useNotFound = () => {
  const [redirect, setRedirect] = useState<null | string>(null);
  const { push } = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const { pathname, hash } = url;

    if (redirectUrlMapper[pathname]) {
      setRedirect(redirectUrlMapper[pathname]);
      push(`${redirectUrlMapper[pathname]}${hash}`);
    } else {
      setRedirect('');
    }
  });

  return { redirect };
};

export default useNotFound;
