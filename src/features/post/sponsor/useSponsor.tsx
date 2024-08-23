import { useAtom } from 'jotai';
import type { MouseEventHandler } from 'react';
import { imageSizeAtom, imageSrcAtom } from '~/shared/components/modal/atoms';
import type { PG } from './models';
import { PGMap } from './constants';

const useSponsor = () => {
  const [, setImageSrc] = useAtom(imageSrcAtom);
  const [, setImageSize] = useAtom(imageSizeAtom);

  const handlePayClick =
    (pg: PG): MouseEventHandler<HTMLImageElement> =>
    () => {
      const touchDevice = 'ontouchstart' in document.documentElement;
      const target = PGMap[pg];

      if (touchDevice) {
        setTimeout(() => {
          window.open(target.deeplink);
        }, 500);
        return;
      }
      setImageSize('small');
      setImageSrc(target.qr);
    };

  return {
    handlePayClick,
  };
};

export { useSponsor };
