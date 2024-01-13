import { FunctionComponent } from 'react';

import DynamicImage from '~/shared/components/DynamicImage';

const Bleet: FunctionComponent = () => {
  return (
    <>
      <DynamicImage
        className="image"
        src="https://github.com/1ilsang/dev/assets/23524849/bf6d917d-9d2a-4142-a0ee-4933cb321428"
        alt="Bleet cover"
      />
      <div className="text">
        <p className="summary">
          Bleet은 블라인드 기반 회사인증을 통한 <b>직장인 소개팅 어플</b>입니다.
          전/현 직장 및 전 애인 회사까지 모두 차단되는 특징이 있습니다.
        </p>
        <ul className="main">
          <span>
            메인 서버 개발자로 Node.js를 활용해 API를 개발하였습니다. Beta
            오픈까지 작업하였습니다.
          </span>
          <li>
            블라인드 인증을 통한 가입 및 포인트 처리 등 전반적인 API 작업을
            주도적으로 진행하였습니다.
          </li>
          <li>Firebase를 통한 채팅 기능을 개발하였습니다.</li>
          <li>
            Swagger 및 문서화를 통해 클라이언트 호출이 용이하도록 하였습니다.
          </li>
        </ul>
      </div>
    </>
  );
};

export default Bleet;
