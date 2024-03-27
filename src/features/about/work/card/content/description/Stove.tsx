import { FunctionComponent } from 'react';

import ExternalLink from '~/shared/components/ExternalLink';

const Stove: FunctionComponent = () => {
  return (
    <div className="text">
      <p className="summary">유저 타임라인 개발</p>
      <ul className="main">
        <span>출시 예정 게임 유저 타임라인 개발</span>
        <li>방명록 CRUD 기능 개발</li>
        <li>댓글 / 신고하기 기능 개발</li>
        <li>
          재밌고 즐겁게 인턴생활 적응
          <ul>
            <li>
              <ExternalLink
                label="SDC 참여!"
                href="https://blog.naver.com/1ilsang/221313294314"
              />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Stove;
