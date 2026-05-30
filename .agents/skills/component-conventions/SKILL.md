---
name: component-conventions
description: >-
  React 컴포넌트 작성 규칙. GA(logger.ts), 접근성, Jest 테스트, 폴더/배럴 구조를
  안내합니다. src/features 하위 UI·컨테이너 추가·리팩터 시 적용합니다.
paths:
  - 'src/features/**/*.tsx'
  - 'src/features/**/*.ts'
---

# Component Conventions

## Description

`src/features` 하위 React 컴포넌트를 추가·수정할 때 GA, 접근성, 테스트, 폴더 구조를
프로젝트 컨벤션에 맞게 작성합니다.

## 컴포넌트 폴더 구조

### 현재 (과도기 — 공존 중)

레거시와 신규 패턴이 혼재합니다. **새 코드는 Target 기준**으로 작성하고, 수정 시
가능하면 Target으로 점진 이전합니다.

| 패턴              | 예시                                                               | 상태                          |
| ----------------- | ------------------------------------------------------------------ | ----------------------------- |
| **Legacy**        | `toc/Container.tsx` → `TocContainer`                               | `Container.tsx` 단독          |
| **Transitional**  | `PostNavigationContainer/PostNavigationContainer.tsx` + `index.ts` | 폴더명 = 컴포넌트명 + 배럴    |
| **Target**        | `HashTag/HashTag.tsx` + `index.ts`                                 | 서브컴포넌트 분리 + 얇은 배럴 |
| **Target (목표)** | `FeatureName/index.tsx`                                            | **배럴이 public entry**       |

### Target 디렉터리 레이아웃 (목표)

```
src/features/{feature}/{ComponentName}/
├── index.tsx              # public entry (메인 컴포넌트 export)
├── models.ts              # 타입·상수 (선택)
├── utils.ts               # 순수 함수·비즈니스 로직 (선택)
├── SubComponent.tsx         # UI 조각
├── useSomething.tsx         # 클라이언트 훅 (선택)
└── *.spec.tsx               # 테스트 (컴포넌트와 co-locate)
```

### 배럴 파일 규칙

**현재 (transitional):**

```ts
// index.ts
export * from './PostNavigationContainer';
export * from './models';
export * from './utils';
```

**목표 (migration 후):**

```tsx
// index.tsx — 메인 컴포넌트를 직접 export하거나 re-export
export { PostNavigationContainer } from './PostNavigationContainer';
export type { PostNavigation } from './models';
export { getPostNavigation } from './utils';
```

또는 메인 로직을 `index.tsx`에 두고 서브 파일만 import.

**import 경로 (소비자):**

```tsx
import { PostNavigationContainer } from '~/post/PostNavigationContainer';
// 항상 폴더 경로 — 내부 파일명(Container.tsx 등)은 노출하지 않음
```

### Server / Client 분리

- **기본**: Server Component ( `'use client'` 없음 )
- **`'use client'`** — hooks, `onClick`, GA, browser API, Jotai 등 필요할 때만
- GA·이벤트가 필요한 leaf 컴포넌트만 client로 두고, 조합 컨테이너는 server 유지

### 네이밍

| 종류                 | 규칙                | 예                                        |
| -------------------- | ------------------- | ----------------------------------------- |
| 폴더                 | PascalCase, 기능명  | `PostNavigationContainer`                 |
| 페이지/영역 컨테이너 | `*Container` suffix | `TocContainer`, `PostNavigationContainer` |
| UI 조각              | 역할명              | `PrevNext`, `RelatedPostItem`             |
| 훅                   | `use` prefix        | `useToc`, `useProgress`                   |
| 순수 로직            | `utils.ts`          | `getPostNavigation`                       |
| 타입                 | `models.ts`         | `PostNavigation`, `RelatedPostKind`       |

---

## Google Analytics

**모든 GA 로직은 `src/features/shared/helpers/logger.ts`에만 둡니다.**

### 패턴

```tsx
'use client';

import { ga, trackPostNavigation } from '~/shared/helpers/logger';

// 범용 이벤트
ga('tagClick', { type: 'tag', value: tagName });

// 도메인 헬퍼 (복잡한 포맷)
trackPostNavigation('similar', fromSlug, toSlug, rank);
```

### 새 이벤트 추가 체크리스트

1. `GaActionType` union에 타입 추가 + JSDoc (어디서 쓰는지)
2. 반복 포맷이면 `trackXxx()` 헬퍼 함수 추가
3. `logger.spec.tsx`에 헬퍼 테스트
4. 컴포넌트 spec에서 `jest.mock('@next/third-parties/google')` 또는 `jest.mock('~/shared/helpers/logger')`
5. `onClick` / `useEffect` 등 **사용자 행동·노출 시점**에만 호출 — render마다 호출 금지

### 기존 이벤트 참고

| actionType                               | 사용처                                                              |
| ---------------------------------------- | ------------------------------------------------------------------- |
| `linkClick`                              | `ExternalLink`                                                      |
| `tagClick`                               | `HashTag`                                                           |
| `tocClick`                               | `useToc`                                                            |
| `postNavigation`                         | `PrevNext`, `RelatedPostItem` (`prev`/`next`/`similar`/`discovery`) |
| `sponsorClick`                           | `SponsorContainer`                                                  |
| `postReadComplete`, `scrollMilestone`, … | `usePostAnalytics`                                                  |

---

## 접근성 (a11y)

[eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) + Testing Library role 쿼리로 검증합니다.

### 랜드마크

```tsx
// ✅ nav — aria-label
<nav aria-label="글 이동">...</nav>

// ✅ section — 제목과 연결 (aria-label + h2 중복 금지)
<section aria-labelledby="related-posts-heading">
  <h2 id="related-posts-heading">이런 글도 읽어보세요</h2>
</section>

// ✅ aside — TOC
<aside aria-label="목차">...</aside>
```

### 링크

- 목적이 명확한 **visible text** 또는 `aria-label`
- prev/next: `aria-label={`이전 글: ${title}`}` (화면 텍스트와 중복 OK — SR에 일관된 이름)
- 카드형 링크: `aria-describedby`로 설명 분리 (제목만 link name, 설명은 describedby)

### 이미지

- 장식용(인접 텍스트와 중복): `alt=""`
- 정보 전달: 의미 있는 `alt`
- `width` / `height` / `loading="lazy"` 명시 (CLS·성능)

### 제목 계층

- 페이지 `h1` → 섹션 `h2` → 항목 `h3` (건너뛰기 금지)
- 리스트 카드 제목은 `h3` (섹션 `h2` 하위)

### 테스트에서 a11y 검증

```tsx
expect(screen.getByRole('navigation', { name: '글 이동' })).toBeVisible();
expect(
  screen.getByRole('region', { name: '이런 글도 읽어보세요' }),
).toBeVisible();
expect(link).toHaveAttribute(
  'aria-describedby',
  'related-post-slug-description',
);
expect(screen.getByRole('presentation')).toHaveAttribute('alt', '');
```

`getByLabelText`보다 **role + accessible name** 우선.

---

## 테스트 (Jest)

### 파일 위치·이름

- 컴포넌트와 **같은 폴더**에 `{Name}.spec.tsx`
- 순수 함수: `utils.spec.ts` (co-locate)

### 구조

```tsx
describe('rendering', () => { ... });
describe('event', () => { ... });   // 클릭·GA·라우터
```

### Mock 패턴

```tsx
jest.mock('next/navigation', () => ({ useRouter: jest.fn() }));
jest.mock('@next/third-parties/google', () => ({ sendGAEvent: jest.fn() }));
```

### 커버리지

- 새 feature 폴더: **80% 이상** 목표
- `utils.ts` 순수 로직: 분기·tie-break까지 unit test
- UI: render + role 쿼리 + userEvent + GA mock 호출

### E2E와의 관계

- Jest: 단위·접근 role·GA 호출
- Playwright DOM/screen snapshot: 통합 회귀 — **결정론적 UI** 유지 (랜덤 금지)
- `NEXT_PUBLIC_E2E`로 E2E 시 숨기는 UI(`Footer` 등) 패턴 참고 — 내비게이션은 숨기지 않음

---

## cspell (맞춤법)

`pnpm lint:cspell` — 설정은 루트 `cspell.json`, 포스트별 import는 `cspell.posts.json`.

| 범위 | 파일 |
| ---- | ---- |
| `src/` 공통 단어 | `cspell.json` → `words` |
| 특정 포스트만 | `_posts/.../cspell.json` → `overrides` + `filename: "docs.mdx"` |

새 포스트는 `scripts/new-post.ts`가 `cspell.json`과 `cspell.posts.json` 등록을 처리합니다. 포스트 작성 가이드는 `create-post` skill의 `### cspell` 참고.

---

## Instructions

새 컴포넌트·리팩터 시:

1. **폴더** — Target 레이아웃 준수. transitional이면 `index.ts` 배럴 + 내부 파일 분리
2. **타입/로직** — `models.ts`, `utils.ts`로 UI와 분리
3. **Client** — `'use client'` 최소화
4. **GA** — `logger.ts`만 수정, 컴포넌트는 `ga`/`trackXxx` 호출
5. **a11y** — landmark, heading, link name, img alt, `aria-labelledby` / `aria-describedby`
6. **테스트** — spec co-locate, role 쿼리, GA·이벤트 mock, utils 80%+
7. **import** — `~/feature/ComponentName` (배럴만 public)
8. **cspell** — `src/` 공통 단어는 루트 `cspell.json`, 포스트 전용은 해당 폴더 `cspell.json`

### Container → index.tsx 마이그레이션 (점진)

1. `FeatureName/FeatureName.tsx` 내용을 `index.tsx`로 옮기거나 re-export
2. `index.ts` → `index.tsx` (또는 `index.ts`가 `index.tsx` re-export)
3. `Container.tsx` 삭제, import 경로는 폴더명 유지
4. spec·snapshot 경로 업데이트

---

## 레퍼런스 구현

| 관심사              | 참고 파일                                                  |
| ------------------- | ---------------------------------------------------------- |
| GA + client         | `HashTag/HashTag.tsx`, `ExternalLink/ExternalLink.tsx`     |
| GA 헬퍼             | `shared/helpers/logger.ts`                                 |
| a11y nav/section    | `PostNavigationContainer/PrevNext.tsx`, `RelatedPosts.tsx` |
| a11y + describedby  | `PostNavigationContainer/RelatedPostItem.tsx`              |
| 배럴 (target)       | `shared/components/HashTag/index.ts`                       |
| 배럴 (transitional) | `PostNavigationContainer/index.ts`                         |
| Legacy Container    | `post/toc/Container.tsx`                                   |
| utils + spec        | `PostNavigationContainer/utils.ts`, `utils.spec.ts`        |
| 훅 + analytics      | `shared/components/nav/usePostAnalytics.tsx`               |
