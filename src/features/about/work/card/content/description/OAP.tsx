import { FunctionComponent } from 'react';

import DynamicImage from '~/shared/components/DynamicImage';

const OAP: FunctionComponent = () => {
  return (
    <>
      <DynamicImage
        className="image border"
        width={320}
        src="https://github.com/1ilsang/dev/assets/23524849/7c2ad355-607a-4692-9a95-be44e45f144d"
        alt="Official Account cover"
      />
      <div className="text">
        <p className="summary">
          Official Account Profile 페이지는 공식 계정을 운영하는{' '}
          <b>비즈니스 오너의 정보를 보다 쉽게 찾을</b> 수 있도록 도와주는 페이지
          입니다.
        </p>
        <ul className="main">
          <li>
            Traffic, Nearby, Takeout 등의 플러그인을 개발하였습니다.
            <ul>
              <li>플러그인의 중복된 코드를 개선하였습니다.</li>
              <li>
                데이터 이관 작업을 통해 서로 다른 페이지의 싱크를 맞추는 작업을
                하였습니다.
              </li>
            </ul>
          </li>
          <li>
            React 프로젝트를 Next.js로 리팩터링하였습니다.
            <ul>
              <li>커스텀 서버를 개발하였습니다.</li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default OAP;
