import type { Project } from '../../models';
import { ProjectName } from '../../models';

import ExternalLink from '~/shared/components/ExternalLink';

export const LPC: Project = {
  name: ProjectName.LPC,
  tags: ['Vite', 'pnpm', 'React-Query'],
  startDate: 1709218800000,
  endDate: 1721638800000,
  summary: '사내 Headless CMS 개발',
  body: (
    <>
      <li>
        전체 페이지 성능 개선
        <ul>
          <li>
            API 로직 개선, Lazy Loading, Suspense, preload 등 최적화 작업 진행
          </li>
          <li>Speed Index 약 14% 단축</li>
          <li>Total Blocking Time 약 72% 단축</li>
          <li>Cumulative Layout Shift 약 95% 감소</li>
        </ul>
      </li>
      <li className="section">
        Webpack {'->'} Vite 마이그레이션 진행
        <ul>
          <li>빌드 성능 향상</li>
          <li>HMR 개선</li>
          <li>모노레포 워크스페이스 import 개선</li>
        </ul>
      </li>
      <li className="section">
        CircleCi 적용 및 Cypress Task 분할 작업 진행
        <ul>
          <li>테스트 시간 16분 {'->'} 5분 단축 성공</li>
        </ul>
      </li>
    </>
  ),
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
    url: '/assets/about/uvp.webp',
    alt: 'UVP cover',
  },
  summary: '사내 다양한 서비스에서 사용되는 웹 동영상 라이브러리 메인테이닝',
  body: (
    <>
      <li>
        v1: 런타임 {'->'} 컴파일 타임 코드 리팩터링
        <ul>
          <li>레거시 프로젝트 최신화 작업 주도적 진행</li>
          <li>
            TypeScript 및 선언적 컴포넌트 적용
            <ul>
              <li>런타임 이전에 코드 구성을 이해할 수 있도록 개선</li>
            </ul>
          </li>
          <li>이벤트 흐름 정리. 컴포넌트 동작의 시각화 및 디버깅 과정 향상</li>
        </ul>
      </li>
      <li className="section">
        v2: 배포 안정화 및 DX 향상
        <ul>
          <li>
            jsx-dom {'->'} Preact 마이그레이션 및 Zustand, Cypress, Jest 도입
          </li>
          <li>
            TSDoc 및 Storybook 적용
            <ul>
              <li>IDE 단계에서부터 데모 페이지까지 고려한 문서 작성</li>
              <li>
                관련 발표:&nbsp;
                <ExternalLink
                  href="https://engineering.linecorp.com/ko/blog/ui-component-library-for-developers-with-typescript-storybook"
                  label="개발자를 위한 친절한 UI 컴포넌트 라이브러리 만들기"
                />
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li className="section">
        v3: 라이브러리 확장성
        <ul>
          <li>
            Yarn monorepo, Turborepo 적용
            <ul>
              <li>플러그인 개발이 용이하도록 Repository 전체 아키텍처 변경</li>
              <li>
                관련 내용:&nbsp;
                <ExternalLink
                  href="https://engineering.linecorp.com/ko/blog/monorepo-with-turborepo"
                  label="Turborepo로 모노레포 개발 경험 향상하기"
                />
              </li>
            </ul>
          </li>
          <li>
            플러그인 구조 개발
            <ul>
              <li>플러그인 템플릿 및 라이프사이클 설계</li>
              <li>서로 다른 서비스 니즈를 만족시킬 수 있는 유연한 개발 달성</li>
            </ul>
          </li>
          <li>
            성능 향상
            <ul>
              <li>
                Webpack4 {'->'} Vite 마이그레이션
                <ul>
                  <li>빌드 시간 약 72% 감소</li>
                </ul>
              </li>
              <li>모노레포 워크스페이스 import 개선</li>
            </ul>
          </li>
        </ul>
      </li>
    </>
  ),
};

export const VLC: Project = {
  name: ProjectName.VLC,
  tags: ['React18', 'RTL', 'React-Query', 'WebSocket', 'Chart.js', 'Jotai'],
  url: 'https://oa-live.line.biz/',
  startDate: 1686495600000,
  endDate: 1709218800000,
  img: {
    url: '/assets/about/voom-live-cms.webp',
    alt: 'VOOM Live CMS cover',
  },
  summary: `VOOM Live 방송 CMS 페이지 개발`,
  body: (
    <>
      <li>아래 Official Account Live CMS와 동일. 호스트 유저만 다른 서비스</li>
      <li>서비스 아키텍처 설계 및 일정 산출</li>
      <li>조금씩 미묘하게 다른 스펙을 위한 컴포넌트 추상화 작업 진행</li>
    </>
  ),
};

export const OAL: Project = {
  name: ProjectName.OAL,
  tags: [
    'React18',
    'RTL',
    'React-Query',
    'WebSocket',
    'MSW',
    'Chart.js',
    'Jotai',
  ],
  url: 'https://oa-live.line.biz/',
  startDate: 1659279600000,
  endDate: 1709218800000,
  img: {
    url: '/assets/about/oa-live-cms.webp',
    alt: 'OA Live CMS cover',
  },
  summary: 'LINE Official Account Live 방송 CMS 페이지 개발',
  body: (
    <>
      <li>
        초기 설계부터 릴리즈까지 진행. 컴포넌트 아키텍처 설계 및 라이브러리 선정
      </li>
      <li>
        라인 패밀리 서비스에서 사용될 수 있도록 확장성있는 컴포넌트 모듈 개발
      </li>
      <li>
        MSW 적용. 방송 상태에 따른 다양한 시나리오 테스트 할 수 있도록 개발
      </li>
      <li>React-Query v4 {'->'} v5 작업 진행</li>
      <li>방송 페이지 실시간 채팅 WebSocket 개발</li>
      <li>시각화 페이지 개발. 데이터 가공 최적화 작업 진행</li>
    </>
  ),
};

export const LDS_CALENDAR: Project = {
  name: ProjectName.LDS_CALENDAR,
  tags: ['React18', 'Vite', 'Jotai'],
  startDate: 1680274800000,
  endDate: 1688137200000,
  img: {
    url: '/assets/about/lds-calendar.webp',
    alt: 'LDS Calendar',
  },
  summary: `LINE 디자인 시스템이 적용된 React 캘린더 컴포넌트 라이브러리 개발`,
  body: (
    <>
      <li>
        사내 공용 캘린더 라이브러리의 부재로 자발적 개발
        <ul>
          <li>배포 이후 긍정적인 평가를 받으며 6개 이상의 서비스에서 사용</li>
        </ul>
      </li>
      <li className="section">
        다양한 서비스에서 사용될 수 있도록 높은 추상화를 목표로 개발
        <ul>
          <li>다국어 및 Timezone 설정 가능</li>
          <li>모달, 멀티 캘린더, 범위, 시간 등 다양한 옵션 제공</li>
          <li>웹 접근성 적용</li>
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
    url: '/assets/about/line-place.webp',
    alt: 'LINE Place cover',
    width: 250,
  },
  summary: `위치 기반 음식점 추천 및 검색 서비스 개발`,
  body: (
    <>
      <li>
        Home, Profile 페이지 개발
        <ul>
          <li>위치 기반 API Flow 정리 및 개발</li>
          <li>Swiper 버벅임 성능 개선</li>
        </ul>
      </li>
      <li className="section">
        Koa 커스텀 서버 개발
        <ul>
          <li>nGrinder 활용, Stress test 진행 후 서버 가용량 산출</li>
          <li>빌드/배포 개발 환경 세팅</li>
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
    url: '/assets/about/line-account.webp',
    alt: 'Official Account cover',
    width: 250,
  },
  summary: `라인 공식 계정 페이지 개발`,
  body: (
    <>
      <li>
        플러그인 공통화 작업 진행
        <ul>
          <li>중복 코드 개선</li>
          <li>일관된 타입 모델 적용</li>
        </ul>
      </li>
      <li>React {'->'} Next.js 리팩터링 진행</li>
      <li>커스텀 서버 개발</li>
      <li>데이터 이관 작업 진행</li>
    </>
  ),
};
