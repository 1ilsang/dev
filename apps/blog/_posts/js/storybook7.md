---
title: "Storybook 7.0 살펴보기"
description: "7버전은 무엇이 달라졌을까?"
tags: ["storybook", "decorator", "const", "extends"]
coverImage: "https://github.com/1ilsang/dev/assets/23524849/c251c31e-1775-4cf9-9131-7cab72cde00e"
date: "2023-08-13T10:17:57.922Z"
ogImage:
  url: "https://github.com/1ilsang/dev/assets/23524849/c251c31e-1775-4cf9-9131-7cab72cde00e"
---

<img width="1000" src="https://github.com/1ilsang/dev/assets/23524849/c251c31e-1775-4cf9-9131-7cab72cde00e" alt="typescript">

4월 초 Storybook v7이 공식 릴리즈 되었다. 이 포스트에서는 [스토리북 블로그에 작성된](https://storybook.js.org/blog/storybook-7-0/) 7버전의 기능들을 확인해보고 정리해 보고자 한다.

## TL;DR!

- 사전 번들 제공으로 DX 향상
- Webpack4 -> Webpack5
- CSF(Component Story Format) v3 업데이트로 인한 스토리 Props 직관성 향상
- MDX v2 지원
- Vite, NextJS, SvelteKit 지원
- 컴포넌트 테스트 지원 향상

## 사전 번들 제공

Storybook v7의 주요 기능중 가장 마음에 드는 부분은 사전 번들 제공이다.

기존에 v6을 사용할 때에는 Storybook도 번들링되기 때문에 번들 시간이 상당히 길었다. 하지만 이번 업데이트로 번들링된 파일이 제공되므로 Storybook의 번들 시간이 없어졌고 연계된 에드온 또한 런타임 부담 없이 더 안정적으로 사용할수 있게 되었다.

또한 Webpack또한 v4에서 v5로 업데이트 되었기 때문에 번들 속도는 더욱 빨라졌다.

<img width="700" alt="compare-speed" src="https://github.com/1ilsang/dev/assets/23524849/260e2d5a-9a95-4334-a5fe-68885fc35df0" />

> 20초 걸리던 매니저 빌드 타임이 사전 번들 덕분에 1초대로 줄었으며 프리뷰 영역도 2초 정도 단축되었다. wow

## CSF v3

Component Story Format(CSF)도 상당부분 변경되었다. 컴포넌트 형식에 맞춰 통일화된 규격을 제공한다.

1. stories 파일의 `default export`가 변경되었다. 이제 스토리 메타데이터를 정의하는 객체를 리턴한다.
2. stories 정의 방식이 변경되었다. 스토리는 스토리 메타데이터 객체 내부에 정의되어야 한다.
3. stories 템플릿을 제공한다. 템플릿으로 스토리를 정의할수 있기 때문에 재사용성이 향상되었다.
4. stories 이름을 정의하는 방식이 변경되었다. id, title 값이 메타데이터 객체로 들어오게 되었다.

```js
// v6 {id}.stories.tsx
export const Pair = Template.bind({});
Pair.argTypes = {
  type: {
    options: ["mobile", "pc"],
    control: { type: "radio" },
    defaultValue: "mobile",
  },
  slot: {
    options: ["header", "toolbar left", "toolbar right", "more"],
    control: { type: "radio" },
    defaultValue: "header",
  },
};
Pair.args = {
  /* ... */
};
Pair.parameter = {
  /* ... */
};
Pair.action = clickPair("toolbar");

// v7 {id}.stories.tsx
export default {
  title: "Buttons/color",
  argTypes: {
    type: {
      options: ["mobile", "pc"],
      control: { type: "radio" },
    },
    slot: {
      options: ["header", "toolbar left", "toolbar right", "more"],
      control: { type: "radio" },
    },
  },
};
export const Pair = {
  name: "Pair",
  action: clickPair("toolbar"),
  render: Template,
  args: {
    type: "mobile",
    slot: "header",
  },
  parameter: {
    /* ... */
  },
};
```

## MDX v2

![MDX](https://storybookblog.ghost.io/content/images/size/w1600/2023/04/Tom-SB7-Docs.001.png)

```jsx
// v6 guide.stories.mdx
<Meta title="Component/Title/Guide" />
<Story id="component-title--red-title" />

// v7 guide.mdx
import TitleGuide, {RedTitle} from "./Component/TitleGuide";
<Meta of={TitleGuide} />
<Story of={RedTitle} />

// ./Component/TitleGuide.stories.mdx
export const RedTitle = { /* ... */ };
export default {
  title:'Component/Title/Guide',
};
```

v7이 되면서 MDX1에서 MDX2로 업데이트 되었다.

기존에는 mdx 파일과 스토리 파일을 ID 스트링으로 연결했었다. v7 부터는 조금 더 코드 친화적으로 컴포넌트와 문서를 이어줄수 있게 되었다.

MDX2는 내장 jsx 및 플러그인을 지원하기 때문에 동적인 문서를 만들기에 더욱 좋아졌다.

확장자에 변화도 생겼다. `{name}.stories.mdx`와 같이 닷(.)으로 이어진 확장자는 인식하지 못한다. `{name}.mdx`로 파일명 수정이 필요하다.

```jsx
|   name   |       type       |    description     |
| :------: | :--------------: | :----------------: |
| videoRef | HTMLVideoElement |   video element    |
|  event   |    MouseEvent    | click event object |
```

기본적으로 MDX는 [GitHub-flavored markdown(GFM)](https://github.github.com/gfm/)이 꺼져있으므로 위와 같은 테이블 마크다운이 깨질수 있다.

이는 [remarkGfm을 설치하여 수정](https://storybook.js.org/docs/react/writing-docs/mdx#lack-of-github-flavored-markdown-gfm)하여야 한다.

## 그 외

![support](https://github.com/1ilsang/dev/assets/23524849/6c81a754-b986-439f-8e72-514c723c853d)

설정 수정 없이 Vite, NextJS, SvelteKit을 지원한다.

본인은 Webpack에서 Vite로 마이그레이션을 고려하고 있었는데 이번 버전이 좋은 기회가 될꺼라 기대하고 있다.

![test-coverage](https://storybookblog.ghost.io/content/images/2023/04/Untitled-copy.png)

스토리북은 이전부터 테스팅 도구로써의 포지션을 견고히 하고자 하는데, 이번 버전에서도 상당부분 업데이트가 되어 있다.

v7에는 코드 커버리지 기능이 추가되었다. 테스트 코드의 누락을 조금 더 쉽게 찾을수 있게 되었다.

![test](https://storybookblog.ghost.io/content/images/2023/04/Capture-2023-04-04-214354.png)

```tsx
const meta: Meta<typeof SignupForm> = {
  title: "SignupForm",
  component: SignupForm,
};
export default meta;
type Story = StoryObj<typeof SignupForm>;

export const Submitted: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Enter email and password", async () => {
      await userEvent.type(canvas.getByTestId("email"), "hi@example.com");
      await userEvent.type(canvas.getByTestId("password"), "supersecret");
    });

    await step("Submit form", async () => {
      await userEvent.click(canvas.getByRole("button"));
    });
  },
};
```

기존의 `play` 함수에서 추가된 `step`을 활용해 컴포넌트 테스트의 그룹화가 가능해졌다.

테스트 그룹을 통해 해당 테스트를 사람이 이해하기 편해졌다.

## 마무리

Storybook v7은 전반적으로 Developer Experience 향상이 눈에 보이므로 스토리북을 지속적으로 사용할 계획이라면 업데이트 하는것이 좋아보인다.

1. 빨라진 빌드 시간
2. 개발자 친화적으로 변화한 CSF, MDX
3. 테스트 그룹화 지원으로 그룹 단위 테스트가 가능해졌다.

## 참고

- <https://storybook.js.org/blog/storybook-7-0/>
- <https://storybook.js.org/blog/storybook-7-docs/>
