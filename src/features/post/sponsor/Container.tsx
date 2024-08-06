'use client';

import { FunctionComponent } from 'react';
import { useSponsor } from './useSponsor';
import { PGMap } from './constants';

const SponsorContainer: FunctionComponent = () => {
  const { handlePayClick } = useSponsor();

  return (
    <div className="sponsor">
      <div>☕ 소주 한 잔 후원하기</div>
      <sub>(예금주: 이상철)</sub>
      <img
        className="pay-icon"
        src={PGMap.toss.logo}
        onClick={handlePayClick('toss')}
        alt="toss"
      />
      <img
        className="pay-icon small"
        src={PGMap.kakao.logo}
        onClick={handlePayClick('kakao')}
        alt="kakao"
      />
    </div>
  );
};

export { SponsorContainer };
