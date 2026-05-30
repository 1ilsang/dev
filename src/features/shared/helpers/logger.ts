import { sendGAEvent } from '@next/third-parties/google';

export const infoLog = (message: string) => {
  console.info(`\x1b[36m ✓ ${message} \x1b[0m`);
};

export type GaActionType =
  /** 외부 링크 클릭 (ExternalLink 컴포넌트) */
  | 'linkClick'
  /** 포스트 목록 카테고리 필터 클릭 */
  | 'categoryClick'
  /** 포스트 TOC 항목 클릭 */
  | 'tocClick'
  /** 스폰서 링크 클릭 */
  | 'sponsorClick'
  /** 홈 페이지 내 링크 클릭 */
  | 'homeClick'
  /** 태그 해시태그 클릭 */
  | 'tagClick'
  /** 코드 블록 복사 버튼 클릭 */
  | 'codeCopy'
  /** 포스트 스크롤 80% 이상 도달 (완독) */
  | 'postReadComplete'
  /** 포스트 15초 이상 체류 */
  | 'postEngaged'
  /** 포스트 간 네비게이션 */
  | 'postNavigation'
  /** About 페이지 진입 */
  | 'aboutVisit'
  /** About WORK EXPERIENCE 전체 토글 */
  | 'aboutToggleAll'
  /** About 개별 회사 아코디언 토글 */
  | 'aboutCompanyToggle'
  /** About 개별 프로젝트 아코디언 토글 */
  | 'aboutProjectToggle'
  /** 포스트 인쇄 */
  | 'printPost'
  /** 1~7일 내 재방문 */
  | 'returnVisit'
  /** 세션 내 2개 이상 포스트 조회 */
  | 'sessionDepth'
  /** 스크롤 25/50/75% 마일스톤 도달 */
  | 'scrollMilestone'
  /** 코드 블록 5초 이상 뷰포트 노출 */
  | 'codeBlockView'
  /** 이미지 확대 모달 열기 */
  | 'imageZoom'
  /** 헤딩 앵커 링크 클릭 (공유 의도) */
  | 'headingAnchorClick'
  /** 완독 후 이탈 시 총 읽기 시간 기록 */
  | 'readingTime'
  /** 텍스트 복사 (인용/공유 의도) */
  | 'textCopy'
  /** 유입 경로 타입 (search/social/referral/direct) */
  | 'referrerType'
  /** 스크롤 역방향 이동 (재독 의도) */
  | 'scrollReversal';

type ValueKey = 'type' | 'value';
export const ga = (
  actionType: GaActionType,
  value: Record<ValueKey, string>,
) => {
  sendGAEvent('event', actionType, value);
};

type PostNavigationKind = 'prev' | 'next' | 'related' | 'similar' | 'discovery';

export const trackPostNavigation = (
  kind: PostNavigationKind,
  fromSlug: string,
  toSlug: string,
  rank?: number,
) => {
  const rankSuffix = rank !== undefined ? `#${rank}` : '';
  ga('postNavigation', {
    type: kind,
    value: `${fromSlug}>${toSlug}${rankSuffix}`,
  });
};
