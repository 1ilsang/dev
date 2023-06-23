import { FunctionComponent } from "react";

import DynamicImage from "~/shared/components/DynamicImage";

const Blind: FunctionComponent = () => {
  return (
    <>
      <DynamicImage
        className="image"
        src="https://github.com/1ilsang/dev/assets/23524849/bf1ace03-ab4a-48c5-9053-c1fe1dd6fc76"
        alt="Blind cover"
      />
      <div className="text">
        <p className="summary">
          Blind는 전 세계 기업의 지속 가능한 기업 문화를 위한&nbsp;
          <b>직장인 익명 플랫폼</b>입니다.
        </p>
        <ul className="main">
          <span>블라인드 어드민 및 서버 API를 개발하였습니다.</span>
          <li>어드민 페이지 개선 작업을 진행했습니다.</li>
          <li>신고하기 및 패널티 등의 API를 개선하였습니다.</li>
        </ul>
      </div>
    </>
  );
};

export default Blind;
