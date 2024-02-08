---
title: '블로그 리뉴얼'
description: '블로그를 리뉴얼하며 있었던 소소한 이야기들'
tags: ['blog', 'architecture', 'goal', 'daily']
coverImage: 'https://user-images.githubusercontent.com/23524849/178150336-2453c93a-3de0-4117-b9fc-15c9b8699305.png'
date: '2022-06-06T03:13:10.667Z'
ogImage:
  url: 'https://user-images.githubusercontent.com/23524849/178150336-2453c93a-3de0-4117-b9fc-15c9b8699305.png'
---

블로그를 리뉴얼하며 있었던 이야기들을 해보려고 한다.

FE개발을 하게된 이후부터 블로그를 직접 만들어야지 생각을 했었고, 이전에는 [hero-starer](https://gatsby-starter-hero-blog.greglobinski.com/) 템플릿을 활용해 블로그를 만들었었다.

그런데 막상 블로그를 만들어 보니 정작 중요한 로직은 라이브러리 혹은 템플릿 내부에 숨어있어 크게 공부에 도움이 되지 않았다. 거기에 Gatsby를 베이스로 하고 있기 때문에 Next.js를 자세히 보고 싶었던 나의 니즈와도 어울리지 않았었다. 그렇기 때문에 내부 동작도 잘 모르는 상태로 컴포넌트만 덕지덕지 붙여서 지저분한 상태로 유지되었고 끝내 관심이 떨어져 포스트도 거의 안쓰게 되었다.

따라서... 이번에는 **라이브러리를 최대한 많이 구현**해보고 원하는 스택으로 블로그를 작성해 보고자 했다.

## 기본 설계

![directory hierarchy](https://user-images.githubusercontent.com/23524849/178150300-d96e4a98-0a18-4354-8d78-5f57b722fa48.png)

[Next.js](https://nextjs.org/)와 [Turborepo](https://turborepo.org/)를 꾸준히 사용하고 싶었기 때문에 이 두가지를 기본으로 채택하고 시작했다. [Remix](https://remix.run/)로 시작할까 고민하다 Next부터 잘 알고 시작하자는 마음으로 Next.js를 선택하게 되었다.

라이브러리를 최대한 많이 구현해볼 예정이기 때문에 UI 컴포넌트 및 logger, util 함수에 해당하는 것들을 `packages` 폴더로 내렸다. 이를 통해 모노레포와 더 친해져 보고자 한다.

마크다운에 글을 쓰는것을 선호하기 때문에 `remark` 라이브러리를 사용했는데 천천히 구현체를 뜯어봐야겠다.

가장 어려웠던 부분은 CSS였던거 같다. 반응형을 지원하면서 각종 컴포넌트들의 배치를 하는게 생각외로 시간이 많이 들었다. [Tailwind](https://tailwindcss.com/)를 처음 사용해봤는데 매우 신세계였다. 지금은 CSS 연습겸 한땀한땀 다 만들고 있는데 SCSS로 이전해야겠다.

```js
const hello = () => console.log('world!');
console.log(hello());
```

마크다운의 `pre` 태그 영역을 CSS로 만드는게 좀 어려웠다. Syntax highlighter도 해주어야 하는데 갈길이 멀다ㅠ 여러 사이트의 예쁜 디자인을 참고하고 있는데 색의 조화가 너무 어렵다. 관련 책을 한번 읽어보고싶다.

꾸준히 블로그 디벨롭 하면서 글도 써나가야겠다. 설렌다!
