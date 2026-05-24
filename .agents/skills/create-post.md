---
name: create-post
description: 새 블로그 포스트 생성. MDX frontmatter, 커스텀 컴포넌트, 카테고리 구조를 안내합니다.
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
tags: ['tag1', 'tag2']
coverImage: 'cover.webp'
date: 'ISO 8601 형식 (예: 2025-01-05T12:24:37.667Z)'
updatedAt?: 'ISO 8601 형식 (수정 시에만)'
---
```

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
<Callout info>
정보성 내용을 여기에 작성합니다.
</Callout>

<Callout warning>
주의사항 내용
</Callout>

<Callout error>
에러/위험 내용
</Callout>
```

- `info` (파란색), `warning` (노란색), `error` (빨간색) 중 하나를 prop으로 전달
- `className` prop으로 추가 스타일 가능 (예: `className="mt-4"`)

## Instructions

1. 사용자에게 다음을 확인합니다:

   - 카테고리 (`src/features/posts/constants.ts`의 CATEGORY_LIST 참조)
   - 슬러그 (URL에 사용될 영문 kebab-case 이름)
   - 제목
   - 설명 (한 줄)
   - 태그 목록

2. 폴더를 생성합니다: `_posts/{category}/{slug}/`

3. `docs.mdx` 파일을 생성합니다:

   - frontmatter에 title, description, tags, coverImage, date 포함
   - date는 현재 시각의 ISO 8601 형식
   - coverImage는 `cover.webp`로 고정
   - 본문에 커버 이미지 마크다운과 기본 구조 포함

4. 커버 이미지 placeholder를 안내합니다 (사용자가 `cover.webp`를 직접 추가해야 함)

5. 또는 CLI로 빠르게 생성:

   ```bash
   pnpm new-post <category> <slug> "<title>" "<description>" [tags...]
   ```
