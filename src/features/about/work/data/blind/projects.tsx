import { Project, ProjectName } from '../../models';

export const Bleet: Project = {
  name: ProjectName.Bleet,
  tags: ['Node.js', 'MySQL', 'Swagger', 'Firebase'],
  url: 'https://www.teambleet.com',
  startDate: 1588258800000,
  endDate: 1596726000000,
  img: {
    url: 'https://github.com/1ilsang/dev/assets/23524849/bf6d917d-9d2a-4142-a0ee-4933cb321428',
    alt: 'Bleet cover',
  },
  summary: `직장인 소개팅 어플 서버 개발`,
  body: (
    <>
      <li>메인 서버 개발자로 주도적 작업. 시스템 및 DB 설계 진행</li>
      <li>블라인드 인증을 통한 가입 및 포인트 처리 등 전반적인 API 작업</li>
      <li>Firebase 채팅 개발</li>
      <li>
        Swagger 및 문서화 도입. API 사용이 편리하도록 제공
        <ul>
          <li>클라이언트 팀에서 좋은 평가를 받은 프로젝트</li>
        </ul>
      </li>
    </>
  ),
};

export const MyBiskit: Project = {
  name: ProjectName.MyBiskit,
  tags: ['Nuxt2', 'MySQL', 'AWS', 'Puppeteer'],
  startDate: 1572534000000,
  endDate: 1588172400000,
  img: {
    url: 'https://github.com/1ilsang/dev/assets/23524849/1d4a2e43-72ba-4b3e-b4c7-f236e8574c28',
    alt: 'Mybiskit cover',
  },
  summary: `직장인 온라인 취미클래스 서비스 개발`,
  body: (
    <>
      <li>매주 프로모션 페이지 개발(Vue)</li>
      <li>
        쿠폰, 결제 API 개선/개발
        <ul>
          <li>테스트 코드로 리팩터링 과정의 사이드 이펙트 최소화하고자 노력</li>
          <li>트랜잭션 적용 및 결제 플로우 간소화 작업 진행</li>
          <li>에러 정리 및 로깅 개선</li>
        </ul>
      </li>
      <li className="section">
        지표 분석용 크롤러 개발
        <ul>
          <li>Puppeteer로 추출한 데이터 가공 파이프라인 개발(AWS)</li>
          <li>데이터 시각화 페이지 개발</li>
          <li>
            사내 엔지니어링 세미나 &quot;주니어의 반란&quot; 주최, 개발 여정
            공유
          </li>
        </ul>
      </li>
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
    url: 'https://github.com/1ilsang/dev/assets/23524849/bf1ace03-ab4a-48c5-9053-c1fe1dd6fc76',
    alt: 'Blind cover',
  },
  summary: `직장인 익명 앱 API 및 어드민 페이지 개발`,
  body: (
    <>
      <li>
        블라인드 서버 API 개발
        <ul>
          <li>신고하기 및 패널티 API 개선</li>
          <li>TypeScript 적용 건의 및 세미나 진행</li>
        </ul>
      </li>
      <li>어드민 페이지 개선 작업 진행(PHP)</li>
    </>
  ),
};
