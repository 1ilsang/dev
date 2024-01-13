import { FunctionComponent } from 'react';

import DynamicImage from '~/shared/components/DynamicImage';

const Place: FunctionComponent = () => {
  return (
    <>
      <DynamicImage
        className="image border"
        width={320}
        src="https://github.com/1ilsang/dev/assets/23524849/ad5e8f2d-9226-4290-823c-1742521e0aa0"
        alt="LINE Place cover"
      />
      <div className="text">
        <p className="summary">
          LINE PLACE는 유저의 <b>위치 기반으로 음식점 추천 및 검색</b> 할 수
          있는 서비스입니다.
        </p>
        <ul className="main">
          <li>
            Home 화면을 개발하였습니다.
            <ul>
              <li>위치 기반 API Flow를 정리하였습니다.</li>
            </ul>
          </li>
          <li>Profile/Settings 개발 하였습니다.</li>
          <li>
            Koa 커스텀 서버 개발을 진행하였습니다.
            <ul>
              <li>
                nGrinder를 활용해 Stress test를 통해 서버 가용량 산출 작업을
                하였습니다.
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Place;
