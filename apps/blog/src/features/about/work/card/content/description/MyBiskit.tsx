import { FunctionComponent } from 'react';

import DynamicImage from '~/shared/components/DynamicImage';

const MyBiskit: FunctionComponent = () => {
  return (
    <>
      <DynamicImage
        className="image"
        src="https://github.com/1ilsang/dev/assets/23524849/1d4a2e43-72ba-4b3e-b4c7-f236e8574c28"
        alt="Mybiskit cover"
      />
      <div className="text">
        <p className="summary">
          마이비스킷은 직장인을 위한 <b>온라인 취미클래스 플랫폼</b>입니다. 정규
          및 원데이 클래스를 다양한 쿠폰과 정기 결제로 수강할 수 있습니다.
        </p>
        <ul className="main">
          <span>Nuxt.js를 활용해 앞단부터 뒷단까지 개발하였습니다.</span>
          <li>다양한 프로모션 페이지 및 상세 페이지 등을 개발하였습니다</li>
          <li>
            쿠폰 및 결제 API를 개선/개발하였습니다.
            <ul>
              <li>
                테스트 코드를 적용해 리팩토링 과정의 사이드 이펙트를 간소화
                하고자 노력했습니다.
              </li>
              <li>
                트랜잭션 적용 및 결제 플로우 간소화 작업을 진행하였습니다.
              </li>
            </ul>
          </li>
          <li>
            지표 분석을 위한 크롤러를 개발하였습니다.
            <ul>
              <li>
                Puppeteer를 활용해 추출한 데이터를 JSON으로 가공해 S3에 저장하고
                차트 페이지를 만들었습니다.
              </li>
              <li>
                사내 엔지니어링 세미나 &quot;주니어의 반란&quot;을 주최하여 개발
                여정을 공유했습니다.
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MyBiskit;
