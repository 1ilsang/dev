import ExternalLink from '~/shared/components/ExternalLink';
import type { Project } from '../../models';
import { ProjectName } from '../../models';
import { Paragraph, Section, Sentence } from '../../shared/Body';

export const CommerceAdminPlatform: Project = {
  name: ProjectName.CommerceAdminPlatform,
  tags: ['Vite', 'React18', 'pnpm'],
  startDate: 1724112000000,
  endDate: 1746025200000,
  summary: `서로 다른 커머스 서비스 내 주문/배송/셀러/상품 영역에서 일관된 사용자 경험을 제공할 수 있는 어드민 플랫폼 개발`,
  body: (
    <>
      <Section top>
        빌드 시스템 패키지 {'->'} 코드 쉐어링 전환
        <Paragraph>
          <Sentence value="빌드 시스템으로 구축되어 있는 모노레포 패키지를 코드 쉐어링으로 전환" />
          <Sentence value="HMR 개선(10s -> 1s). 빌드 과정으로 인한 풀 리로딩 문제 해결. 이로써 상태 유지 가능" />
          <Sentence value="폼 관리가 많은 어드민 특성상 상태 유지는 DX 향상에 중요한 요소" />
        </Paragraph>
      </Section>
      <Section>
        카탈로그, B마트, 커머스, 셀러 등 어드민 기능 개발
        <Paragraph>
          <Sentence value="속성 범위그룹 설정 개발" />
          <Sentence value="상품카테고리 실시간 추천 기능 개발" />
          <Sentence value="상품 일괄 변경 기능 개발" />
        </Paragraph>
      </Section>
    </>
  ),
};

export const CommerceInternalServer: Project = {
  name: ProjectName.CommerceInternalServer,
  tags: ['Nest11', 'MySQL', 'AWS', 'Docker'],
  startDate: 1739545200000,
  endDate: 1746025200000,
  summary: `커머스 내부 과제용 서버 개발`,
  body: (
    <>
      <Section top>Nest 서버 세팅 및 유지보수 진행</Section>
      <Section top>
        우아한책거리, 문구어드민 등 FE 주도 프로젝트를 위한 공용 서버 설계
      </Section>
    </>
  ),
};

export const WoowaBookstreet: Project = {
  name: ProjectName.WoowaBookstreet,
  tags: ['Vite', 'React18', 'pnpm'],
  startDate: 1744038000000,
  endDate: 1746025200000,
  summary: `사내 구성원들을 위한 도서 커뮤니티 플랫폼 개발`,
  img: {
    url: '/images/about/woowa-bookstreet.webp',
    alt: '우아한책거리',
  },
  body: (
    <>
      <Section top>
        <ExternalLink
          href="https://story.baemin.com/1020/"
          label="도서비 무제한 지원"
        />{' '}
        복지를 더 잘 활용하기 위해 주도적 사이드프로젝트 진행
        <Paragraph>
          <Sentence value="구매 내역 확인, 도서 리뷰, 랭킹, 슬랙 조회 등 기능 개발" />
          <Sentence value="워킹그룹으로 승격" />
        </Paragraph>
      </Section>
      <Section top>
        구성원들의 편의성을 크게 올려준 프로젝트로 좋은 평가를 받음
      </Section>
    </>
  ),
};

export const WoowaAtelier: Project = {
  name: ProjectName.WoowaAtelier,
  tags: ['Vite', 'React18', 'pnpm'],
  startDate: 1746025200000,
  summary: `사내 디자인시스템 - 우아한공방 개발`,
  img: {
    url: '/images/about/woowa-atelier.webp',
    alt: '우아한공방',
  },
  body: (
    <>
      <Section top>TBD</Section>
    </>
  ),
};
