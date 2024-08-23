'use client';

import type { FunctionComponent } from 'react';
import { useSponsor } from './useSponsor';
import { PGMap } from './constants';

const SponsorContainer: FunctionComponent = () => {
  const { handlePayClick } = useSponsor();

  const payIconClass = 'cursor-pointer object-contain hover:animate-bouncing';

  return (
    <div className="flex items-center mt-1.5	mb-56">
      <div>☕ 소주 한 잔 후원하기</div>
      <sub>(예금주: 이상철)</sub>
      <img
        className={`w-20 ${payIconClass}`}
        src={PGMap.toss.logo}
        onClick={handlePayClick('toss')}
        alt="toss"
      />
      <img
        className={`w-12 ${payIconClass}`}
        src={PGMap.kakao.logo}
        onClick={handlePayClick('kakao')}
        alt="kakao"
      />
    </div>
  );
};

export { SponsorContainer };
