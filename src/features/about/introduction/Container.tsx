import type { FunctionComponent } from 'react';

import { CompanyName } from '../work/models';

import ExternalLink from '~/shared/components/ExternalLink';

const IntroductionContainer: FunctionComponent = () => {
  return (
    <section className="about-introduction">
      <div className="description">
        <div className="p">
          어느덧 5년 차 프런트엔드 개발자가 되었습니다.
          <br />
          <ExternalLink
            classNames="underline-highlight-fade"
            href="/posts/quality-of-job-review"
            label={'"일의 격"'}
            disableDefaultCSSTransition
          />
          을 읽고 저는 일을 어떻게 대하는 사람인지, 어떠한 동료가 되고 싶은지
          고민해 봤습니다.
        </div>
        <ul>
          <li>저는 즐겁게 일하고 싶습니다.</li>
          <li>저는 기술적 책임을 질 수 있는 동료가 되고 싶습니다.</li>
        </ul>
        <div className="p">
          웃으면서 일하고 싶습니다. 농담을 즐기고 어떻게 하면 동료를 웃길 수
          있을지 늘 탐구하고 있습니다.
          <br />
          영향력 있는 동료가 되고 싶습니다. 성장 자극을 줄 수 있는 동료이고
          싶습니다. 맡은 부분에 대한 기술적 책임을 지려고 노력합니다.
        </div>
        <div className="p">
          <b>
            <a href={`#${CompanyName.Smilegate}`}>Smilegate</a>
          </b>
          에서 프런트엔드 인턴을 시작으로{' '}
          <b>
            <a href={`#${CompanyName.Blind}`}>TeamBlind</a>
          </b>
          에서 풀스택으로 일했으며 이후{' '}
          <b>
            <a href={`#${CompanyName.LINE}`}>LINE+</a>
          </b>
          에서 4년간 프런트엔드 개발자로 전문성을 쌓았습니다. 이제{' '}
          <b>
            <a href={`#${CompanyName.WoowaBros}`}>우아한형제들</a>
          </b>
          에서 또 다른 커리어를 쌓고자 하고 있습니다. 또한{' '}
          <ExternalLink
            classNames="underline-highlight-fade"
            label="MDN 한국팀의 Organizer로 활동"
            href="posts/mdn-ko-organizer"
            disableDefaultCSSTransition
          />
          하고 있습니다.
        </div>
      </div>
    </section>
  );
};

export default IntroductionContainer;
