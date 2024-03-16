---
title: '우아한 타입스크립트 with 리액트 리뷰'
description: '주니어 FE를 위한 온보딩 책'
tags: ['book', 'review', 'typescript', 'react']
coverImage: 'https://github.com/1ilsang/dev/assets/23524849/3e0ae612-003f-43e9-a6b0-d481697fc280'
date: '2023-11-24T12:37:42.554Z'
ogImage:
  url: 'https://github.com/1ilsang/dev/assets/23524849/3e0ae612-003f-43e9-a6b0-d481697fc280'
---

![cover](https://github.com/1ilsang/dev/assets/23524849/3e0ae612-003f-43e9-a6b0-d481697fc280 'cover')

"우아한 타입스크립트 with 리액트"의 리뷰를 해보려고 한다.

## 선택하게 된 계기

두 가지 캐치프라이즈가 나를 이끌었다고 생각한다.

1. 배달의민족 개발 사례로 살펴보는
2. 주니어 개발자를 위한 온보딩 가이드

기술 스택이 동일하다 하여도 회사별로 사용 방식이 상당히 상이하다고 느낄 때가 많았기 때문에 이렇게 간접적으로나마 문화나 기술 적용 방식을 체험해 볼 수 있는 서적을 선호한다.

또한 주니어 개발자를 위한 온보딩 가이드를 내걸었으므로 어떻게 신입이 회사의 일원으로 빠르게 흡수될 수 있을지 고민한 흔적이 있을 것이라 기대해 선택하게 되었다.

## 간단한 요약

이 책은 앞에서 타입스크립트를 다루고 뒷부분은 리액트를 활용한 여러 기법이나 패턴에 관해 설명한다.

앞쪽 타입은 신입이 보기에 조금 어려운 타입 좁히기까지 잘 다루고 있다. `extends`와 `infer`를 통한 타입 추론이 익숙하지 않다면 읽어보기를 추천하고 싶다.

물론 타입스크립트나 리액트를 깊이 있게 공부하려고 이 책을 선택한다면 조금 부족할 수 있다고 생각한다(애초에 주니어 온보딩 책이다).

온보딩 책인 만큼 API, 리렌더링, 훅스, State 등을 다양한 예제와 패턴을 통해 소개하는데 내용이 좋으므로 사수가 없는 환경에서 개발하는 분들이라면 읽기를 추천하고 싶다.

## 인상 깊었던 부분

책을 읽으면서 좋았던 예제나 포인트들을 가볍게 소개하고자 한다.

### 타 언어의 타입 시스템과 비교

2장에서 타 언어의 타입 시스템을 거론하며 타입스크립트의 타입 철학을 엿볼 수 있게 해준다. 나는 이 부분이 좋았다.

- 타입스크립트는 다른 명목적으로 구체화한 타입 시스템(Java, C++)과 다르게 <u>구조로 타입을 구분</u>한다.
- 타입스크립트는 타입 시스템을 집합으로 이해하면 된다. 타입은 값의 집합으로 생각할 수 있다.

```tsx
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
class Developer {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
function greet(p: Person) {
  console.log(p.name);
}
const developer = new Developer('zig', 20);

// Person 타입을 받지만 Developer 타입 값을 넣어도 무관하다.
// 구조적 서브 타입이기 때문에 에러를 발생시키지 않는다.
// 서로 다른 두 타입 간의 호환성은 오직 타입 내부의 구조에 의해 결정된다.
greet(developer); // OK
```

- 타입스크립트가 위와 같은 구조적 타이핑을 채택한 이유는 자바스크립트를 모델링한 언어이기 때문이다.
- 자바스크립트는 덕 타이핑(duck typing)을 기반으로 만들어졌다. 덕타입은 매개변수가 올바르게 주어진다면 그 값이 어떻게 만들어졌는지 신경 쓰지 않고 허용한다.

### 타입에 대한 고찰

```ts
type IdType = string | number;
type Numeric = number | boolean;
// 교차 타입은 두 타입을 모두 만족하는 경우에만 유지된다.
type Universal = IdType & Numeric; // number

// 따라서 두 타입을 만족하지 못하는 경우 never가 된다.
type DeliveryTip = {
  tip: number;
}
type Filter = {
  tip: string;
} & DeliveryTip;
const filter: Filter = { tip: ... } // Type '...' is not assignable to type 'never'.
```

타입스크립트의 특징(집합적 특징과 구조적 타이핑 등)은 교차 타입에서 혼란을 야기할 수 있다. 이 부분에 대한 내용을 명확하게 설명하고 있다.

### 개발팀과의 인터뷰

![woowa-story](https://github.com/1ilsang/dev/assets/23524849/7e43ccaf-306d-48f0-b0aa-48151564e8ee)

중간중간 배민 개발팀들이 참조 출연해 해당 타입/기술을 쓰는지, 어떻게 생각하는지 인터뷰하는 것들이 있는데 실무에서 어떻게 생각하는지 생생하게 볼 수 있어서 흥미로웠다.

자연스럽게 나 또한 질문에 대한 답을 해보곤 하면서 더 몰입할 수 있었다.

### 친절한 설명

```ts
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]-?: Type[Property]; // - 는 오타가 아니다.
};

// 우아한 타입스크립트 https://www.youtube.com/whatch?v=ViS8DLd6o-E
// 제너릭 T 타입이 K로 추론되는 Promise<K>라면 K를 반환하고 아니라면 any를 반환한다.
// 이를 통해 Promise 반환 타입을 좁혀서 추론할 수 있다.
type UnpackPromise<T> = T extends Promise<infer K>[] ? K : any;
```

타입스크립트의 문법 중에는 처음에 이해하기 어려운 것들이 있는데, 하나하나 과정을 풀어서 설명해 준다.

### 실용적인 예제

특정 개념을 설명하고 활용하는 방법을 실무 코드를 기준으로 알려주기 때문에 상당히 실용적인 예제들로 채워져있다.

```ts
const BottomSheetMap = {
  RECENT_CONTACTS: RecentContactsBottomSheet,
  CARD_SELECT: CardSelectBottomSheet,
};
type BOTTOM_SHEET_ID = keyof typeof BottomSheetMap;
type BottomSheetStore = {
  // BOTTOM_SHEET_ID(BottomSheetMap 객체의 key 값)의 property 값을 변환한다.
  [index in BOTTOM_SHEET_ID as `${index}_BOTTOM_SHEET_ID`]: {
    // ...
  };
};
const store: BottomSheetStore = {
  RECENT_CONTACTS_BOTTOM_SHEET_ID: { ... }, // key 값이 index로 가져온 값으로 변환된다.
  CARD_SELECT_BOTTOM_SHEET_ID: { ... },
};
```

바텀 시트별 스토어를 선언하면서 키값을 특정하게 강제하고 있다.

```ts
type ProductPrice = 100 | 200 | 300;
const getProductName = (productPrice: ProductPrice): string => {
  if (productPrice === 100) return '배민 상품권 100원';
  if (productPrice === 200) return '배민 상품권 200원';
  else {
    // exhaustiveCheck를 안 해주면 300원에 대한 코드가 없어도 에러가 발생하지 않음.
    // 조건별 완벽한 타입 검증을 위해 사용하는 패턴
    exhaustiveCheck(productPrice); // Argument of type 'number' is not assignable to parameter of type 'never'.
    return '배민 상품권';
  }
};
// param 값이 never 타입이므로 해당 함수가 호출되기 전에 타입 가드가 다 되어 있어야 한다.
const exhaustiveCheck = (param: never) => {
  throw new Error(`type error!`);
};
```

Exhaustiveness Checking 패턴을 통해 이후 타입이 추가되어도 무결성을 지킬 수 있게 된다.

이 외에도 컴파일 과정에 대한 설명이나 Axios 가이드 및 훅에서 유의할 점 등 여러 꿀팁들이 있다.

## 맺으며

배민의 공유 문화는 본받을만하다고 생각한다.

기술업계 특성상 비판적인 시선이 기본적으로 있기 때문에 외부 공개를 꺼릴 수도 있었겠지만, 기술에 대한 공유를 두려워하지 않고 책으로 펴낸 것에 리스펙하게 된다.

여러 예제가 실제 코딩에 도움이 되기 때문에 추천하고 싶은 책이다.
