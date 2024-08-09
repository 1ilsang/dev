import type { PG, PGUrl } from './models';

export const PGMap: Record<PG, PGUrl> = {
  toss: {
    logo: '/images/logo/toss-pay.webp',
    qr: '/images/qr/toss-pay.webp',
    deeplink:
      'supertoss://send?amount=1500&bank=%ED%86%A0%EC%8A%A4%EB%B1%85%ED%81%AC&accountNo=100025633555&origin=qr',
  },
  kakao: {
    logo: '/images/logo/kakao-pay.webp',
    qr: '/images/qr/kakao-pay.webp',
    deeplink: 'https://qr.kakaopay.com/Fdn34TAhh2ee01093',
  },
};
