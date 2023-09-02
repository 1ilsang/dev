import { FunctionComponent, useLayoutEffect, useState } from 'react';

import DynamicImage from '~/shared/components/DynamicImage';
import ExternalLink from '~/shared/components/ExternalLink';

const UVP: FunctionComponent = () => {
  const MAX_DESKTOP = 1399;
  const MAX_TABLET = 1023;
  const MAX_MOBILE = 767;
  const [backgroundHeight, setBackgroundHeight] = useState(400);

  useLayoutEffect(() => {
    const calcHeight = (() => {
      if (typeof window === 'undefined') return 400;
      const { innerWidth } = window;

      if (innerWidth <= MAX_MOBILE) return 185;
      else if (innerWidth <= MAX_TABLET) return 385;
      else if (innerWidth <= MAX_DESKTOP) return 425;
      else return 400;
    })();
    setBackgroundHeight(calcHeight);
    setTimeout(() => {
      setBackgroundHeight(undefined);
    }, 1000);
  }, []);

  return (
    <>
      <DynamicImage
        className="image"
        src="https://github.com/1ilsang/dev/assets/23524849/3f7d451c-f3b9-4244-be36-b32d800512d2"
        height={backgroundHeight}
        alt="UVP cover"
      />
      <div className="text">
        <p className="summary">
          UVP는 사내의 다양한 서비스에서 사용되는&nbsp;
          <b>웹 동영상 컴포넌트 라이브러리</b>로 서로 다른 디바이스 및
          브라우저에서 스트리밍 및 아카이브 영상의 통일된 스펙과 디자인의 유지를
          목표로 합니다.
        </p>
        <ul className="main gap">
          UVP의 메인테이너로 참여해 v0부터 v3까지 주도적으로 개발하였습니다.
          <li>
            v1: 런타임 이전에 코드 동작을 이해하고 유지보수의 용이를 목표로
            개발하였습니다.
            <ul>
              <li>
                레거시 프로젝트를 인수인계 받아 최신화 작업을 주도적으로
                진행했습니다.
              </li>
              <li>
                TypeScript 적용 및 선언적 컴포넌트화를 통해 런타임 이전에 코드
                구성을 이해할 수 있도록 하였습니다.
              </li>
              <li>
                이벤트의 흐름을 정리하여 동작의 시각화 및 디버깅 과정을
                향상시켰습니다.
              </li>
            </ul>
          </li>
          <li>
            v2: 친절한 라이브러리를 목표로 개발하였습니다. 배포 안정화 및 친절한
            문서화를 목표로 하였습니다.
            <ul>
              <li>
                jsx-dom에서 preact로 마이그레이션 및 zustand, jest, cypress,
                storybook을 도입했습니다.
              </li>
              <li>ESM 및 완전한 키보드 제어를 지원(웹 접근성)하였습니다.</li>
              <li>테스트 코드로 라이브러리의 안정성을 높였습니다.</li>
              <li>
                tsdoc 및 storybook으로 문서화를 진행해 DX 향상을 이루었습니다.
              </li>
              <li>
                관련 발표:&nbsp;
                <ExternalLink
                  href="https://engineering.linecorp.com/ko/blog/ui-component-library-for-developers-with-typescript-storybook"
                  label="개발자를 위한 친절한 UI 컴포넌트 라이브러리 만들기"
                />
              </li>
            </ul>
          </li>
          <li>
            v3: 확장성을 목표로 개발하였습니다.
            <ul>
              <li>
                yarn monorepo, turborepo를 통해 플러그인 개발이 용이하도록
                레포를 변경했습니다.
              </li>
              <li>
                단일 컴포넌트 라이브러리 구조에서 플러그인을 주입 받을수 있는
                구조로 변경했습니다.
                <ul>
                  <li>
                    VideoCore 영역과 UI 영역, 추가 기능(HLS, IMA, Thumbnail
                    등)으로 영역을 분리하여 목적에 맞게 플러그인을 조합해 적용
                    할 수 있게 되었습니다.
                  </li>
                  <li>
                    번들 크기 및 배포 사이드 이펙트 영향도 감소의 효과와 더불어
                    라이브러리의 확장성(추가 기능의 유연성)을 크게 늘렸습니다.
                  </li>
                  <li>
                    라인의 다양한 서비스 니즈를 만족시키고 보다 안정적인 기능
                    추가를 이어갈 수 있었습니다.
                  </li>
                </ul>
              </li>
              <li>
                관련 내용:&nbsp;
                <ExternalLink
                  href="https://engineering.linecorp.com/ko/blog/monorepo-with-turborepo"
                  label="Turborepo로 모노레포 개발 경험 향상하기"
                />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UVP;
