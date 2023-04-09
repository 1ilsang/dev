---
title: "TypeScript 5.0 살펴보기"
description: "5버전은 무엇이 달라졌을까?"
tags: ["typescript", "decorator", "const", "extends"]
coverImage: "https://devblogs.microsoft.com/typescript/wp-content/uploads/sites/11/2023/03/5-0-feature-image-square-bounds-1.png"
date: "2023-04-09T07:24:41.017Z"
ogImage:
  url: "https://devblogs.microsoft.com/typescript/wp-content/uploads/sites/11/2023/03/5-0-feature-image-square-bounds-1.png"
---

<img width="1000" src="https://devblogs.microsoft.com/typescript/wp-content/uploads/sites/11/2023/03/5-0-feature-image-square-bounds-1.png" alt="typescript">

3월 초 TypeScript v5가 공식 릴리즈 되었다. 이 포스트에서는 5버전의 기능들을 하나씩 확인해보고 정리해 보고자 한다.

목차는 아래와 같이 구성되어 있다.

- [All enums Are Union enums](#all-enums-are-union-enums)
- [마무리](#마무리)
- [참고](#참고)

## <a name="all-enums-are-union-enums"></a>All enums Are Union enums

```ts
// enum Color는 Red | Orange | Yellow | Green | Blue | Violet의 union 타입이다.
enum Color {
  Red,
  Orange,
  Yellow,
  Green,
  Blue,
  Violet,
}

// enum 멤버는 참조할 수 있는 자체 유형이 있으므로 값처럼 사용될 수 있다.
type PrimaryColor = Color.Red | Color.Green | Color.Blue;
```

모든 enum은 union된 enum이다. 타입스크립트 2.0에서 enum 리터럴 타입이 도입되면서 리터럴 타입은 각 enum 멤버에 고유한 타입을 부여하게 된다.

각 enum 멤버에 고유한 타입을 부여할 때 발생하는 한 가지 문제는 해당 타입이 멤버의 실제 값과 연관되어 있다는 점이다.

예를 들어 아래와 같이 enum 멤버가 함수 호출로 초기화될 수 있는 경우와 같이 가능하다.

```ts
enum E {
  three = 3,
  four = 4,
}
function takeValue(num: E) {}

// v4.9.5 =====================================
const a: E = 55; // It works!
const b: E.three = 4444; // It works!
takeValue(6); // It works!

// Error! Enum type 'Color' has members with initializers that are not literals.(2535)

// v5.0.3 =====================================
const a: E = 55; // Error! Type '55' is not assignable to type 'E'.(2322)
const b: E.three = 4444; // Error! Type '4444' is not assignable to type 'E.three'.(2322)
takeValue(6); // Error! Argument of type '6' is not assignable to parameter of type 'E'.(2345)

// It works!
```

## 마무리

다양한 편의성들이 추가된 것이 좋다.

## 참고

- <https://devblogs.microsoft.com/typescript/announcing-typescript-5-0>
- <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html>
- <https://www.typescriptlang.org/play>
