import { Project, ProjectName } from '../../models';

import ExternalLink from '~/shared/components/ExternalLink';

export const LPC: Project = {
  name: ProjectName.LPC,
  tags: ['Vite', 'pnpm', 'React-Query'],
  startDate: 1709218800000,
  summary: 'LandPress Content 개발',
  body: <></>,
};

export const UVP: Project = {
  name: ProjectName.UVP,
  tags: [
    'HTMLVideo',
    'Preact10',
    'Zustand',
    'Turborepo',
    'Storybook',
    'Cypress',
    'Webpack',
  ],
  startDate: 1604156400000,
  endDate: 1709218800000,
  img: {
    url: 'https://github.com/1ilsang/dev/assets/23524849/3f7d451c-f3b9-4244-be36-b32d800512d2',
    alt: 'UVP cover',
  },
  summary: `UVP는 사내의 다양한 서비스에서 사용되는 웹 동영상 컴포넌트 라이브러리로 서로 다른 디바이스 및 브라우저에서 스트리밍 및 아카이브 영상의 통일된 스펙과 디자인의 유지를 목표로 합니다.`,
  body: (
    <>
      v0 - v3 메인테이너 활동
      <li className="section">
        v1: 런타임 {'->'} 컴파일 타임 코드 리팩터링
        <ul>
          <li>레거시 프로젝트를 인수인계 받아 최신화 작업을 주도적으로 진행</li>
          <li>
            TypeScript 적용 및 선언적 컴포넌트화를 통해 런타임 이전에 코드
            구성을 이해할 수 있도록 개발
          </li>
          <li>이벤트의 흐름을 정리하여 동작의 시각화 및 디버깅 과정을 향상</li>
        </ul>
      </li>
      <li className="section">
        v2: 친절한 라이브러리를 목표로 개발 진행. 배포 안정화 및 친절한 문서화를
        목표로 개발
        <ul>
          <li>
            jsx-dom에서 preact로 마이그레이션 및 zustand, jest, cypress,
            storybook을 도입
          </li>
          <li>ESM 및 완전한 키보드 제어를 지원(웹 접근성)</li>
          <li>테스트 코드로 라이브러리의 안정성 향상</li>
          <li>tsdoc 및 storybook으로 문서화를 진행해 DX 향상 성취</li>
          <li>
            관련 발표:&nbsp;
            <ExternalLink
              href="https://engineering.linecorp.com/ko/blog/ui-component-library-for-developers-with-typescript-storybook"
              label="개발자를 위한 친절한 UI 컴포넌트 라이브러리 만들기"
            />
          </li>
        </ul>
      </li>
      <li className="section">
        v3: 확장성을 목표로 개발
        <ul>
          <li>
            yarn monorepo, turborepo를 통해 플러그인 개발이 용이하도록 레포를
            변경
          </li>
          <li>
            단일 컴포넌트 라이브러리 구조에서 플러그인을 주입 받을수 있는 구조로
            변경
            <ul>
              <li>
                VideoCore 영역과 UI 영역, 추가 기능(HLS, IMA, Thumbnail 등)으로
                영역을 분리하여 목적에 맞게 플러그인을 조합해 적용 할 수 있게 됨
              </li>
              <li>
                번들 크기 및 배포 사이드 이펙트 영향도 감소의 효과와 더불어
                라이브러리의 확장성(추가 기능의 유연성) 성취
              </li>
              <li>
                라인의 다양한 서비스 니즈를 만족시키고 보다 안정적인 기능 추가를
                이어갈 수 있게 됨
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
    </>
  ),
};

export const VLC: Project = {
  name: ProjectName.VLC,
  tags: [
    'React18',
    'React-Testing-Library',
    'React-Query',
    'WebSocket',
    'Chart.js',
  ],
  url: 'https://oa-live.line.biz/',
  startDate: 1686495600000,
  endDate: 1709218800000,
  img: {
    url: 'https://github.com/1ilsang/dev/assets/23524849/6163e57c-ed7f-4dea-ac0f-0c8303c83454',
    alt: 'VOOM Live CMS cover',
  },
  summary: `VOOM LIVE CMS는 VOOM 유저들이 라이브 방송을 세팅할 수 있는 CMS 페이지입니다.`,
  body: (
    <>
      <li>
        방송 디테일 페이지 개발
        <ul>
          <li>실시간 채팅을 위한 WebSocket 개발</li>
        </ul>
      </li>
      <li>
        시각화 페이지 개발
        <ul>
          <li>Chart.js를 활용해 통계 차트 및 테이블 영역 개발</li>
        </ul>
      </li>
    </>
  ),
};

export const OAL: Project = {
  name: ProjectName.OAL,
  tags: [
    'React18',
    'React-Testing-Library',
    'React-Query',
    'WebSocket',
    'MSW',
    'Chart.js',
  ],
  url: 'https://oa-live.line.biz/',
  startDate: 1659279600000,
  endDate: 1709218800000,
  img: {
    url: 'https://github.com/1ilsang/dev/assets/23524849/5c98930a-5501-432e-8d2e-e1c6ee1743f6',
    alt: 'OA Live CMS cover',
  },
  summary:
    'OA LIVE CMS는 Official Account 유저들이 라이브 방송을 세팅 할 수 있는 CMS 페이지입니다.',
  body: (
    <>
      <li>
        방송 디테일 페이지 개발
        <ul>
          <li>실시간 채팅을 위한 WebSocket 개발</li>
        </ul>
      </li>
      <li>
        시각화 페이지 개발
        <ul>
          <li>Chart.js를 활용해 통계 차트 및 테이블 영역 개발</li>
        </ul>
      </li>
    </>
  ),
};

export const LDS_CALENDAR: Project = {
  name: ProjectName.LDS_CALENDAR,
  tags: ['React18', 'Vite'],
  startDate: 1680274800000,
  endDate: 1688137200000,
  img: {
    url: 'https://github.com/1ilsang/dev/assets/23524849/fe644134-f6a7-4029-8d6c-e1fa00ce327e',
    alt: 'LDS Calendar',
  },
  summary: `LDS Calendar는 라인 디자인 시스템을 적용한 리액트 캘린더 컴포넌트 라이브러리입니다.`,
  body: (
    <>
      <span>
        사내 공용 캘린더 라이브러리의 부재로 자발적으로 시작한 프로젝트
      </span>
      <li>
        다양한 서비스에서 사용될 수 있도록 높은 추상화를 목표로 개발
        <ul>
          <li>다국어 및 Timezone 설정 가능</li>
          <li>
            모달, 멀티 캘린더, 범위, 시간 등 다양한 옵션을 제공, 유연한 캘린더가
            될 수 있도록 개발
          </li>
        </ul>
      </li>
    </>
  ),
};

export const PLACE: Project = {
  name: ProjectName.PLACE,
  tags: ['Next12', 'Redux', 'Redux-Saga', 'Swiper'],
  url: 'https://www.youtube.com/watch?v=-hmsdx_qoiA',
  startDate: 1601478000000,
  endDate: 1617980400000,
  img: {
    url: 'https://github.com/1ilsang/dev/assets/23524849/ad5e8f2d-9226-4290-823c-1742521e0aa0',
    alt: 'LINE Place cover',
    width: 250,
  },
  summary: `LINE PLACE는 유저의 위치 기반으로 음식점 추천 및 검색 할 수 있는 서비스입니다.`,
  body: (
    <>
      <li>
        Home 화면 개발
        <ul>
          <li>위치 기반 API Flow 정리</li>
        </ul>
      </li>
      <li>Profile/Settings 개발</li>
      <li>
        Koa 커스텀 서버 개발
        <ul>
          <li>nGrinder를 활용 Stress test 진행후 서버 가용량 산출</li>
        </ul>
      </li>
    </>
  ),
};

export const OAP: Project = {
  name: ProjectName.OAP,
  tags: ['Next12'],
  url: 'https://creative.line.me/blog/91',
  startDate: 1597071600000,
  endDate: 1625929200000,
  img: {
    url: 'https://github.com/1ilsang/dev/assets/23524849/7c2ad355-607a-4692-9a95-be44e45f144d',
    alt: '"Official Account cover"',
    width: 250,
  },
  summary: `Official Account Profile 페이지는 공식 계정을 운영하는 비즈니스 오너의 정보를 보다 쉽게 찾을 수 있도록 도와주는 페이지입니다.`,
  body: (
    <>
      <li>
        Traffic, Nearby, Takeout 등의 플러그인 개발
        <ul>
          <li>플러그인의 중복된 코드를 개선</li>
          <li>
            데이터 이관 작업을 통해 서로 다른 페이지의 싱크 맞추는 작업 진행
          </li>
        </ul>
      </li>
      <li>
        React {'->'} Next.js 리팩터링 진행
        <ul>
          <li>커스텀 서버 개발</li>
        </ul>
      </li>
    </>
  ),
};
