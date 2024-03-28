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
  summary: `Bleet은 블라인드 기반 회사인증을 통한 직장인 소개팅 어플입니다.`,
  body: (
    <>
      <span>
        메인 서버 개발자로 Node.js를 활용해 API를 개발. Beta 오픈까지 작업
      </span>
      <li>
        블라인드 인증을 통한 가입 및 포인트 처리 등 전반적인 API 작업 주도적으로
        진행
      </li>
      <li>Firebase를 통한 채팅 기능 개발</li>
      <li>Swagger 및 문서화를 통해 클라이언트 호출이 용이하도록 함</li>
    </>
  ),
};

export const MyBiskit: Project = {
  name: ProjectName.MyBiskit,
  tags: ['Nuxt2', 'MySQL'],
  startDate: 1572534000000,
  endDate: 1588172400000,
  img: {
    url: 'https://github.com/1ilsang/dev/assets/23524849/1d4a2e43-72ba-4b3e-b4c7-f236e8574c28',
    alt: 'Mybiskit cover',
  },
  summary: `마이비스킷은 직장인을 위한 온라인 취미클래스 플랫폼입니다. 정규 및 원데이 클래스를 다양한 쿠폰과 정기 결제로 수강할 수 있습니다.`,
  body: (
    <>
      <span>Nuxt.js로 페이지 및 서버 개발</span>
      <li>다양한 프로모션 페이지 및 상세 페이지 개발</li>
      <li>
        쿠폰 및 결제 API 개선/개발
        <ul>
          <li>
            테스트 코드를 적용해 리팩토링 과정의 사이드 이펙트를 간소화 하고자
            노력
          </li>
          <li>트랜잭션 적용 및 결제 플로우 간소화 작업 진행</li>
        </ul>
      </li>
      <li>
        지표 분석용 크롤러 개발
        <ul>
          <li>
            Puppeteer를 활용해 추출한 데이터를 JSON으로 가공후 S3에 저장. 차트
            페이지 제공
          </li>
          <li>
            사내 엔지니어링 세미나 &quot;주니어의 반란&quot;을 주최, 개발 여정
            공유
          </li>
        </ul>
      </li>
    </>
  ),
};

export const Blind: Project = {
  name: ProjectName.Blind,
  tags: ['Node.js', 'PHP', 'Docker', 'MySQL', 'Redis'],
  startDate: 1564930800000,
  endDate: 1577631600000,
  url: 'https://www.teamblind.com/',
  img: {
    url: 'https://github.com/1ilsang/dev/assets/23524849/bf1ace03-ab4a-48c5-9053-c1fe1dd6fc76',
    alt: 'Blind cover',
  },
  summary: `Blind는 전 세계 기업의 지속 가능한 기업 문화를 위한 직장인 익명 플랫폼입니다.`,
  body: (
    <>
      <span>블라인드 어드민 및 서버 API를 개발</span>
      <li>어드민 페이지 개선 작업 진행</li>
      <li>신고하기 및 패널티 등의 API를 개선</li>
    </>
  ),
};
