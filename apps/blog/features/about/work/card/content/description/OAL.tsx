import { FunctionComponent } from "react";

import DynamicImage from "~/shared/components/DynamicImage";

const OAL: FunctionComponent = () => {
  return (
    <>
      <DynamicImage
        className="image"
        src="https://github.com/1ilsang/dev/assets/23524849/03e7736c-50de-439a-8b81-66e8d97bd6b4"
        alt="OA Live CMS cover"
      />
      <div className="text">
        <p className="summary">
          OA LIVE CMS는 <b>Official Account 유저들이 라이브 방송을 세팅</b>할 수
          있는 CMS 페이지입니다.
        </p>
        <ul className="main">
          <li>방송에 관련된 CRUD 페이지들을 개발하였습니다.</li>
          <li>
            방송 디테일 페이지를 개발하였습니다.
            <ul>
              <li>실시간 채팅을 위한 WebSocket 개발을 하였습니다.</li>
            </ul>
          </li>
          <li>
            시각화 페이지를 개발하였습니다.
            <ul>
              <li>차트 및 테이블 영역을 개발하였습니다.</li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default OAL;
