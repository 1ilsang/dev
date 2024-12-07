import type { Project } from '../../models';
import { ProjectName } from '../../models';
import { Paragraph, Section, Sentence } from '../../shared/Body';

export const CommerceAdminPlatform: Project = {
  name: ProjectName.CommerceAdminPlatform,
  tags: ['Vite', 'React18', 'pnpm'],
  startDate: 1724112000000,
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
