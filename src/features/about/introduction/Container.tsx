import Link from 'next/link';
import { FunctionComponent } from 'react';

import ExternalLink from '~/shared/components/ExternalLink';

const IntroductionContainer: FunctionComponent = () => {
  return (
    <section className="about-introduction">
      <div className="description">
        <p>
          어느덧 5년 차 프런트엔드 개발자가 되었습니다.
          <br />
          <Link className="highlighter" href={'/posts/book/quality-of-job'}>
            "일의 격"
          </Link>
          을 읽고 저는 일을 어떻게 대하는 사람인지, 어떠한 동료가 되고 싶은지
          고민해 봤습니다.
        </p>
        <ul>
          <li>저는 즐겁게 일하고 싶습니다.</li>
          <li>저는 기술적 책임을 질 수 있는 동료가 되고 싶습니다.</li>
        </ul>
        <p>
          웃으면서 일하고 싶습니다. 농담을 즐기고 어떻게 하면 동료를 웃길 수
          있을지 늘 탐구합니다. 또한 영향력 있는 동료가 되고 싶습니다. 성장
          자극을 줄 수 있는 동료이고 싶습니다. 맡은 부분에 대한 기술적 책임을
          지려고 노력합니다. 기술에 대한 탐구욕이 강하며 공유할 거리가 생기면
          어떤 웃긴 제목으로 발표할지 고민하며 입꼬리가 절로 올라갑니다.
        </p>
        <p>
          Smilegate에서 프런트엔드 인턴을 시작으로 TeamBlind에서 풀스택으로
          일했으며 현재 LINE+에서 4년 가까이 프런트엔드 개발자로 즐겁게 일하고
          있습니다. 퇴근 후에는{' '}
          <ExternalLink label="MDN" href="https://github.com/mdn" /> 한국팀의
          Organizer로 활동하고 있습니다.
        </p>
      </div>
    </section>
  );
};

export default IntroductionContainer;
