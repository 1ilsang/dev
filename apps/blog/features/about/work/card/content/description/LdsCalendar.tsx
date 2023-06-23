import { FunctionComponent } from "react";

import DynamicImage from "~/shared/components/DynamicImage";

const LdsCalendar: FunctionComponent = () => {
  return (
    <>
      <DynamicImage
        className="image"
        src="https://github.com/1ilsang/dev/assets/23524849/fe644134-f6a7-4029-8d6c-e1fa00ce327e"
        alt="LDS Calendar"
      />
      <div className="text">
        <p className="summary">
          LDS Calendar는 라인 디자인 시스템을 적용한 리액트{" "}
          <b>캘린더 컴포넌트 라이브러리</b>입니다.
        </p>
        <ul className="main">
          <span>
            OA LIVE CMS 개발 과정에서 방송 세팅에 필요한 캘린더를 개발하던중
            공통화되면 좋겠다싶어 자발적으로 시작한 프로젝트입니다.
          </span>
          <li>
            다양한 서비스에서 사용될 수 있도록 높은 추상화를 목표로
            개발하였습니다.
            <ul>
              <li>다국어 및 Timezone 설정을 할 수 있습니다.</li>
              <li>
                모달, 멀티 캘린더, 범위, 시간 등 다양한 옵션을 제공하여 유연한
                캘린더가 될 수 있도록 하였습니다.
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default LdsCalendar;
