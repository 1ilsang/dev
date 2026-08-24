import { useRouter } from 'next/navigation';
import { redirectUrlMapper } from '../constants';
import { useEffect, useState } from 'react';

export const useNotFound = () => {
  const [redirect, setRedirect] = useState<null | string>(null);
  const { replace } = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const { pathname, hash } = url;
    const legacyPostMatch = pathname.match(/^\/posts\/([^/]+)$/);
    const redirectUrl =
      redirectUrlMapper[pathname] ??
      (legacyPostMatch ? `/post/${legacyPostMatch[1]}` : undefined);

    setRedirect(redirectUrl ?? '');
    if (redirectUrl) {
      replace(`${redirectUrl}${hash}`);
    }
  }, []);

  return { redirect };
};
