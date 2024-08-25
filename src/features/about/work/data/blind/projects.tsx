import type { Project } from '../../models';
import { ProjectName } from '../../models';
import { Paragraph, Section, Sentence } from '../../shared/Body';

export const Bleet: Project = {
  name: ProjectName.Bleet,
  tags: ['Node.js', 'MySQL', 'Swagger', 'Firebase'],
  url: 'https://www.teambleet.com',
  startDate: 1588258800000,
  endDate: 1596726000000,
  img: {
    url: '/images/about/bleet.webp',
    alt: 'Bleet cover',
  },
  summary: `직장인 소개팅 어플 서버 개발`,
  body: (
    <>
      <Section top>
        메인 서버 개발자로 주도적 작업. 시스템 및 DB 설계 진행
      </Section>
      <Section top>
        블라인드 인증을 통한 가입 및 포인트 처리 등 전반적인 API 작업
      </Section>
      <Section top>Firebase 채팅 개발</Section>
      <Section top>
        Swagger 및 문서화 도입. API 사용이 편리하도록 제공
        <Paragraph>
          <Sentence value="클라이언트 팀에서 좋은 평가를 받은 프로젝트" />
        </Paragraph>
      </Section>
    </>
  ),
};

export const MyBiskit: Project = {
  name: ProjectName.MyBiskit,
  tags: ['Nuxt2', 'MySQL', 'AWS', 'Puppeteer'],
  startDate: 1572534000000,
  endDate: 1588172400000,
  img: {
    url: '/images/about/mybiskit.webp',
    alt: 'Mybiskit cover',
  },
  summary: `직장인 온라인 취미클래스 서비스 개발`,
  body: (
    <>
      <Section top>매주 프로모션 페이지 개발(Vue)</Section>
      <Section top>
        쿠폰, 결제 API 개선/개발
        <Paragraph>
          <Sentence value="테스트 코드로 리팩터링 과정의 사이드 이펙트 최소화하고자 노력" />
          <Sentence value="트랜잭션 적용 및 결제 플로우 간소화 작업 진행" />
          <Sentence value="에러 정리 및 로깅 개선" />
        </Paragraph>
      </Section>
      <Section>
        지표 분석용 크롤러 개발
        <Paragraph>
          <Sentence value="Puppeteer로 추출한 데이터 가공 파이프라인 개발(AWS)" />
          <Sentence value="데이터 시각화 페이지 개발" />
          <Sentence value='사내 엔지니어링 세미나 "주니어의 반란" 주최, 개발 여정 공유' />
        </Paragraph>
      </Section>
    </>
  ),
};

export const Blind: Project = {
  name: ProjectName.Blind,
  tags: ['Node.js', 'PHP', 'Docker', 'MySQL', 'Redis', 'AWS'],
  startDate: 1564930800000,
  endDate: 1577631600000,
  url: 'https://www.teamblind.com/',
  img: {
    url: '/images/about/blind.webp',
    alt: 'Blind cover',
  },
  summary: `직장인 익명 앱 API 및 어드민 페이지 개발`,
  body: (
    <>
      <Section top>
        블라인드 서버 API 개발
        <Paragraph>
          <Sentence value="신고하기 및 패널티 API 개선" />
          <Sentence value="TypeScript 적용 건의 및 세미나 진행" />
        </Paragraph>
      </Section>
      <Section top>어드민 페이지 개선 작업 진행(PHP)</Section>
    </>
  ),
};
