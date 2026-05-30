---
name: create-post
description: 새 블로그 포스트 생성. MDX frontmatter, 태그 클러스터 가이드(PostNavigation 추천 연동), 커스텀 컴포넌트, 카테고리 구조를 안내합니다.
---

# Create New Blog Post

## Description

새로운 블로그 포스트를 생성합니다. `_posts` 디렉토리 하위에 카테고리/슬러그 폴더를 만들고 `docs.mdx` 파일을 생성합니다.

## Context

### 프로젝트 구조

- `_posts/` — 블로그 포스트 원본 (MDX + 이미지 에셋)
- 각 포스트는 `_posts/{category}/{slug}/docs.mdx` 경로에 위치
- 이미지는 같은 폴더에 `.webp` 형식으로 저장
- `scripts/pre-scripts.ts`가 빌드 시 이미지를 `public/posts/{slug}/`로 복사

### 카테고리

카테고리는 추가/삭제될 수 있습니다. 현재 목록은 아래 파일들에서 확인하세요:

- **UI 표시 목록**: `src/features/posts/constants.ts` (`CATEGORY_LIST`)
- **폴더 매핑**: `scripts/new-post.ts` (`categoryMap`)
- **타입 정의**: `src/features/posts/models.ts` (`FileCategory`)

새 카테고리 추가 시 위 세 곳을 모두 업데이트해야 합니다.

### 현재 카테고리 → 폴더 매핑 (변경될 수 있음)

| UI 카테고리 | FileCategory | 폴더 경로                                                                |
| ----------- | ------------ | ------------------------------------------------------------------------ |
| JavaScript  | js           | `_posts/js/`                                                             |
| Rust        | rust         | `_posts/rust/`                                                           |
| Activity    | activity     | `_posts/activity/`                                                       |
| Book        | book         | `_posts/book/`                                                           |
| Retrospect  | retrospect   | `_posts/retrospect/{year}/`                                              |
| Tool        | tool         | `_posts/tool/`                                                           |
| Algorithm   | algorithm    | `_posts/algorithm/leetcode/{difficulty}/` 또는 `_posts/algorithm/goorm/` |

### docs.mdx frontmatter 스키마

```yaml
---
title: '포스트 제목'
description: '한 줄 설명'
tags: ['typescript', 'frontend', 'javascript']
coverImage: 'cover.webp'
date: 'ISO 8601 형식 (예: 2025-01-05T12:24:37.667Z)'
updatedAt?: 'ISO 8601 형식 (수정 시에만)'
---
```

### tags

태그는 `/tags/{tag}` 페이지와 **포스트 하단 "이런 글도 읽어보세요"** 추천(`PostNavigationContainer`)에 사용됩니다.

추천은 **총 4개** — **유사 글 2개** + **다른 주제 탐색 2개**로 구성됩니다.

| 구분          | 개수 | 선정 기준                                                                                |
| ------------- | ---- | ---------------------------------------------------------------------------------------- |
| **similar**   | 2    | **주제 태그** 교집합 우선 → 허브 태그 → category → 날짜 → slug                           |
| **discovery** | 2    | 현재 글과 거리 최대 → **서로 다른 category·주제** 우선 (A≠B) → slug 해시로 결정론적 선택 |

허브 태그(`frontend`, `javascript` 등)만 겹치는 글은 유사도가 낮게 계산되므로, **주제 태그 1개**(`vite`, `eslint`, `react` 등)를 반드시 넣어야 같은 클러스터끼리 묶입니다.

#### 원칙

- **3~5개** — 너무 많으면 태그 점수가 희석됩니다.
- **소문자 kebab-case** — `book-review`, `remote-work`
- **클러스터 공통 태그를 반드시 포함** — 아래 표의 허브 태그로 관련 글을 묶습니다.
- **한글·이벤트명·고유명사 태그 지양** — `junction2023`, `일의격` 대신 `developer`, `career` 등 의미 태그 사용
- **주제 태그 1개 + 허브 태그 2~3개** — 예: Vite 글 → `vite` + `devtools` + `frontend` + `javascript`

#### 허브 태그 (블로그 주제: 프론트엔드 · Node.js · 기술 · 개발자)

| 태그          | 용도                                 |
| ------------- | ------------------------------------ |
| `frontend`    | FE 기술 글 공통 허브                 |
| `javascript`  | JS/TS/React/Node/알고리즘 연결       |
| `typescript`  | TypeScript 타입·버전 글              |
| `react`       | React 훅·상태관리                    |
| `nextjs`      | Next.js 실무 글                      |
| `nodejs`      | Node.js 내부·생태계·npm              |
| `devtools`    | 빌드·린트·모노레포·번들러            |
| `testing`     | 테스트·E2E·스냅샷                    |
| `developer`   | 커리어·회고·활동·보안 등 개발자 관점 |
| `open-source` | MDN·오픈소스 기여                    |
| `algorithm`   | 알고리즘 공통                        |
| `leetcode`    | LeetCode 풀이                        |
| `goorm`       | 구름톤 챌린지 풀이                   |
| `book-review` | 책 리뷰                              |
| `career`      | 커리어·밋업·해커톤                   |
| `retrospect`  | 연간/분기 회고                       |
| `remote-work` | 리모트 워크 후기                     |
| `rust`        | Rust 학습·N-API                      |

#### 카테고리별 태그 가이드

| 카테고리            | 필수/권장 태그                                           | 예시                                                                                     |
| ------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **JavaScript** (js) | 주제 1개 + `frontend` + `javascript`                     | TS 글: `typescript`, `frontend`, `javascript`                                            |
|                     | React 글                                                 | `react`, `frontend`, `javascript`                                                        |
|                     | Next.js 글                                               | `nextjs`, `react`, `frontend`                                                            |
|                     | Node.js 글                                               | `nodejs`, `javascript`, `frontend`                                                       |
|                     | DevTools 글                                              | `{도구명}`, `devtools`, `frontend`, `javascript`                                         |
|                     | 테스트 글                                                | `testing`, `playwright`, `frontend`, `devtools`                                          |
| **Algorithm**       | `algorithm` + `leetcode` 또는 `goorm` + `javascript`     | JS 객체 주제 LeetCode: `frontend` 추가                                                   |
| **Book**            | `book-review` + 주제 태그                                | FE 책: `react`/`typescript`, `frontend` / 커리어 책: `developer`, `career`               |
| **Activity**        | OSS: `open-source`, `frontend`, `developer` (+ `mdn` 등) | 커리어: `developer`, `career`, `frontend` / 리모트: `developer`, `career`, `remote-work` |
| **Retrospect**      | `developer`, `career`, `retrospect`                      |                                                                                          |
| **Tool**            | `devtools`, `developer`, `frontend`                      |                                                                                          |
| **Rust**            | `rust`, `developer`, `javascript`                        | N-API 연계 시 `nodejs` 추가                                                              |

#### 클러스터 예시 (추천 글이 서로 연결되는 그룹)

- **TypeScript**: `typescript5`, `object-type`, `typescript-subtyping`, `woowa-type-review` → `typescript`, `frontend`, `javascript`
- **React**: `use-transition`, `micro-state-management-review`, `woowa-type-review` → `react`, `frontend`
- **Node.js**: `nodejs-architecture-dive`, `n-api`, `is-supply-chain-attack` → `nodejs`, `javascript`
- **DevTools**: `vite-dev-server`, `turborepo`, `storybook7`, `prettier3`, `visual-regression-test` → `devtools`, `frontend`
- **Open Source**: `mdn-ko-organizer`, `mdn-contributing-translations`, `2024-woowa-ignite` → `open-source`, `mdn`, `frontend`, `developer`

#### tags 작성 체크리스트

1. 이 글이 속하는 **클러스터**를 정한다 (TS / React / Node / DevTools / OSS / Algorithm / Career 등).
2. 클러스터 **허브 태그 2~3개**를 넣는다.
3. **주제 태그 1개**를 넣는다 (`vite`, `eslint`, `use-transition` 등 — kebab-case).
4. 기존 포스트와 태그를 겹치게 해 **추천 연결**이 자연스러운지 확인한다.
5. 5개를 초과하지 않는다.

### cspell (맞춤법)

`pnpm lint:cspell`은 `cspell.json` 설정을 따릅니다.

| 범위 | 설정 파일 | 용도 |
| ---- | --------- | ---- |
| **블로그 공통** (`src/`, `scripts/`, `.agents/`) | 루트 `cspell.json` → `words` | 프로젝트 전역 허용 단어 |
| **포스트 전용** | `_posts/{category}/{slug}/cspell.json` | 해당 `docs.mdx`에만 허용할 고유명·외래어 |

포스트별 설정은 루트 `cspell.posts.json`의 `import`로 묶입니다. 새 포스트 생성 시 `cspell.json`과 `cspell.posts.json` 등록은 `pnpm np`(`scripts/new-post.ts`)가 자동 처리합니다.

```json
// _posts/{category}/{slug}/cspell.json
{
  "overrides": [
    {
      "filename": "docs.mdx",
      "words": ["고유명", "외래어"]
    }
  ]
}
```

- `filename: "docs.mdx"` — 같은 폴더의 `docs.mdx`에만 적용
- `words`만 넣으면 **전역** 허용이 되므로 반드시 `overrides` 사용
- 공통 단어는 루트 `cspell.json`의 `words`에 추가

### 본문 구조 컨벤션

1. 커버 이미지: `![cover](cover.webp 'cover')`
2. 도입부 (1~2문단)
3. 목차 (## Index 또는 ## 목차)
4. 본문 섹션들 (## 제목)
5. 마무리 섹션

### 이미지 사용법

- 일반: `![alt](filename.webp)`
- 사이즈 지정: `![alt](filename.webp 'cover')`, `![alt](filename.webp 'l')`, `![alt](filename.webp 's')`
- 옵션 조합: `![alt](filename.webp 'size=ss;fit=true;description=설명')`

### MDX 커스텀 컴포넌트 (MDXEmbedComponents)

MDX 본문에서 import 없이 바로 사용할 수 있는 컴포넌트들입니다.
소스: `src/features/shared/components/mdx/MDXEmbedComponents.tsx`

#### `<ImageHorizonWrap>`

가로 스크롤 이미지 갤러리. 같은 폴더의 이미지를 나열합니다.

```mdx
<ImageHorizonWrap list={['image1', 'image2', 'image3']} />
<ImageHorizonWrap list={[{ src: 'photo', ext: 'jpg' }, 'another']} />
```

- `list`: 파일명 배열 (확장자 생략 시 `.webp`)
- slug는 자동 주입됨 → `/posts/{slug}/{src}.{ext}` 경로로 렌더링

#### `<ExternalAnchor>`

외부 링크를 ⎋ 아이콘으로 표시합니다. 인라인에서 참조 링크로 사용합니다.

```mdx
텍스트 내용<ExternalAnchor href="https://example.com" />
내부 앵커도 가능<ExternalAnchor href="#섹션-제목" />
```

#### `<LeftTable>`

커스텀 테이블. 첫 번째 행이 헤더, 나머지가 본문입니다.

```mdx
<LeftTable
  rows={[
    [{ w: 'w-[30%]', content: '항목' }, '설명'],
    ['React', '프론트엔드 라이브러리'],
    ['Node.js', '서버 런타임'],
  ]}
/>
```

- 셀에 `\n`으로 줄바꿈, `[text](url)` 마크다운 링크 사용 가능
- `{ w: 'w-[30%]', content: '텍스트' }` 형태로 너비 지정 가능

#### `<Typography>`

중첩된 마크다운 태그를 무시하고 순수 텍스트로 렌더링합니다. span 태그와 함께 사용합니다.

```mdx
<Typography>
  <span className="text-red-600 font-bold">강조 텍스트</span>
  일반 텍스트가 이어집니다.
</Typography>
```

#### `<Callout>`

정보/경고/에러 박스를 표시합니다.

```mdx
<Callout info>정보성 내용을 여기에 작성합니다.</Callout>

<Callout warning>주의사항 내용</Callout>

<Callout error>에러/위험 내용</Callout>
```

- `info` (파란색), `warning` (노란색), `error` (빨간색) 중 하나를 prop으로 전달
- `className` prop으로 추가 스타일 가능 (예: `className="mt-4"`)

## Instructions

1. 사용자에게 다음을 확인합니다:

   - 카테고리 (`src/features/posts/constants.ts`의 CATEGORY_LIST 참조)
   - 슬러그 (URL에 사용될 영문 kebab-case 이름)
   - 제목
   - 설명 (한 줄)
   - 태그 목록 (**위 `### tags` 가이드**에 따라 3~5개, 허브 태그 + 주제 태그)

2. 폴더를 생성합니다: `_posts/{category}/{slug}/`

3. `docs.mdx`와 `cspell.json`을 생성합니다:

   - frontmatter에 title, description, tags, coverImage, date 포함
   - **tags**는 `### tags` 섹션의 클러스터·허브 태그 규칙을 따름
   - date는 현재 시각의 ISO 8601 형식
   - coverImage는 `cover.webp`로 고정
   - 본문에 커버 이미지 마크다운과 기본 구조 포함
   - **`cspell.json`** — `overrides[0].words`에 포스트 전용 오탐 단어 등록 (`### cspell` 참고)
   - **`cspell.posts.json`** — 새 포스트 `import` 경로 추가

4. 커버 이미지 placeholder를 안내합니다 (사용자가 `cover.webp`를 직접 추가해야 함)

5. 또는 CLI로 빠르게 생성:

   ```bash
   pnpm new-post <category> <slug> "<title>" "<description>" [tags...]
   ```
