---
title: 'TypeScript 5.0 살펴보기'
description: '5버전은 무엇이 달라졌을까?'
tags: ['typescript', 'decorator', 'const', 'extends']
coverImage: 'https://devblogs.microsoft.com/typescript/wp-content/uploads/sites/11/2023/03/5-0-feature-image-square-bounds-1.png'
date: '2023-04-09T07:24:41.017Z'
ogImage:
  url: 'https://devblogs.microsoft.com/typescript/wp-content/uploads/sites/11/2023/03/5-0-feature-image-square-bounds-1.png'
---

<img class="cover" alt="cover" src="https://devblogs.microsoft.com/typescript/wp-content/uploads/sites/11/2023/03/5-0-feature-image-square-bounds-1.png" />

3월 초 TypeScript v5가 공식 릴리즈 되었다. 이 포스트에서는 [MS 블로그에 작성된](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0) 5버전의 기능들을 확인해보고 정리해 보고자 한다.

목차는 아래와 같이 구성되어 있다.

- [Decorators](#decorators)
  - [실험적 레거시 데코레이터와의 차이점](#실험적-레거시-데코레이터와의-차이점)
- [const Type Parameters](#const-type-parameters)
- [Supporting Multiple Configuration Files in extends](#supporting-multiple-configuration-files-in-extends)
- [All enums Are Union enums](#all-enums-are-union-enums)
- [--moduleResolution bundler](#--moduleresolution-bundler)
- [Support for export type \*](#support-for-export-type-)
- [@overload Support in JSDoc](#overload-support-in-jsdoc)
- [Speed, Memory, and Package Size Optimizations](#speed-memory-and-package-size-optimizations)
- [Breaking Changes and Deprecations](#breaking-changes-and-deprecations)
  - [Runtime Requirements](#runtime-requirements)
  - [lib.d.ts Changes](#libdts-changes)
  - [API Breaking Changes](#api-breaking-changes)
  - [Forbidden Implicit Coercions in Relational Operators](#forbidden-implicit-coercions-in-relational-operators)
  - [Enum Overhaul](#enum-overhaul)
- [마무리](#마무리)
- [참고](#참고)

## <a name="decorators"></a>Decorators

[Decorators](https://github.com/tc39/proposal-decorators)는 현재(2023/04)기준 [Stage 3단계](https://tc39.es/process-document/)(4단계가 표준 추가)인 ECMAScript 공식 스펙이다. ES2024의 유력한 기능 중 하나이다.

```ts
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}

const p = new Person('Ron');
p.greet(); // Hello, my name is Ron.
```

위와 같은 간단한 Person 클래스의 greet 함수를 디버깅 하기 위해 함수 내부 시작과 끝에 `console.log`를 추가할 경우 데코레이터를 사용하면 편리하게 작업할수 있다.

```ts
function loggedMethod(headMessage = 'LOG:') {
  return function actualDecorator(
    originalMethod: any, // 데코레이터를 사용한 함수
    context: ClassMethodDecoratorContext, // 데코레이터를 사용하는 컨텍스트 객체의 데이터 및 함수가 있다(private, static 여부, 메서드 이름 등).
  ) {
    const methodName = String(context.name);

    function replacementMethod(this: any, ...args: any[]) {
      console.log(`${headMessage} Entering method '${methodName}'.`);
      const result = originalMethod.call(this, ...args); // 데코레이터를 사용하는 함수가 여기서 실행된다.
      console.log(`${headMessage} Exiting method '${methodName}'.`);
      return result; // 데코레이터 체이닝을 위해 존재한다.
    }

    return replacementMethod;
  };
}

class Person {
  // ...
  @loggedMethod('[Name]')
  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}

const p = new Person('Ron');
p.greet();
/**
 * [Name] Entering method 'greet'.
 * Hello, my name is Ron.
 * [Name] Exiting method 'greet'.
 **/
```

이로써 모든 함수에 `@loggedMethod`만 추가하면 쉽게 정해진 로그 메서드를 사용할수 있다.

이 외에도 컨택스트 객체에는 `addInitializer`라는 유용한 함수가 있다. 이는 생성자의 시작 부분(또는 정적 클래스 자체의 초기화)에 연결할 수 있다.

자바스크립트를 사용하면서 this가 다시 바인딩 되지 않도록 아래와 같은 코딩 스타일을 자주 사용한다.

```ts
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
    // 오직 CASE 1. 에만 사용되는 줄
    this.greet = this.greet.bind(this);
  }

  // CASE 1.
  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
  // CASE 2.
  // greet: () => {
  //   console.log(`Hello, my name is ${this.name}.`);
  // }
  // CASE 3. 생성자에서 this.greet.bind(this)를 하지 않은 경우
  // greet() {
  //   console.log(`Hello, my name is ${this.name}.`);
  // }
}

const greet = new Person('Ron').greet;
greet(); // CASE 1,2 는 정상적으로 동작하지만 3은 this가 글로벌로 바뀌기 때문에 name이 undefined 에러가 발생한다.
```

이를 데코레이터로 사용하면 일관된 로직을 추가/변경해 적용할수 있게 된다.

```ts
function bound(originalMethod: any, context: ClassMethodDecoratorContext) {
  const methodName = String(context.name);
  if (context.private) {
    // private 함수는 bind 하지 않는다는 예제
    throw new Error(
      `'bound' cannot decorate private properties like ${methodName}.`,
    );
  }
  context.addInitializer(function (this: any) {
    // 생성자에서 this를 바인드 하게 된다.
    this[methodName] = this[methodName].bind(this);
  });
}

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  // It Same: @bound @loggedMethod('[Name]') greet() { ... }
  @bound
  @loggedMethod('[Name]')
  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}
const greet = new Person('Ron').greet;
greet(); // It works!
/**
 * [Name] Entering method 'greet'.
 * Hello, my name is Ron.
 * [Name] Exiting method 'greet'.
 **/
```

여기서 유의할 점은 데코레이터는 '역순'으로 실행된다는 점이다. 위 예를 보면, `@loggedMethod`가 `greet` 메서드를 꾸미고, `@bound`가 `@loggedMethod`의 결과를 꾸미게 된다. 데코레이터가 사이드 이펙트를 가지거나 보장된 순서를 원할 경우 유의해야 한다.

### 실험적 레거시 데코레이터와의 차이점

기존에 타입스크립트는 실험적 데코레이터를 지원하고 있었으며 `--experimentalDecorators` 옵션으로 활성화 할수 있었다.

실험적 데코레이터와 v5 데코레이터(ECMA)의 차이는 매개변수에 데코레이터를 지정하거나, `--emitDecoratorMetadata`와 호환되지 않는 등이 있다. 앞으로 데코레이터의 제안에 해당 내용들을 추가해 간격을 좁혀나갈 예정이다.

```ts
// allowed
@register
export default class Foo {
  // ...
}

// also allowed
export default
@register
class Bar {
  // ...
}

// error - before *and* after is not allowed
@before
@after
export class Bar {
  // ...
}
```

데코레이터를 `export` 앞에 놓을 수 있게 되면서 다양하게 선언이 가능해졌지만, 양옆으로 놓을수는 없다.

데코레이터의 타입을 보장하기 위해서는 상당히 복잡한 타입정의가 될수 있다. 이는 가독성과 상충관계가 있기 때문에 단순하게 유지하라고 조언한다. 데코레이터의 메커니즘에 대해 자세한 내용은 [이 글](https://2ality.com/2022/10/javascript-decorators.html)에 정리되어 있다.

## <a name="const-type-parameters"></a>const Type Parameters

```ts
type HasNames = { names: readonly string[] };
// 우리는 아래 함수를 통해 불변 문자열 배열 타입을 얻고자 한다.
function getNamesExactly<T extends HasNames>(arg: T): T['names'] {
  return arg.names;
}
// The type we wanted:
//    readonly ["Alice", "Bob", "Eve"]
// The type we got:
//    string[]
const names1 = getNamesExactly({ names: ['Alice', 'Bob', 'Eve'] });

// Correctly gets what we wanted:
//    readonly ["Alice", "Bob", "Eve"]
const names2 = getNamesExactly({ names: ['Alice', 'Bob', 'Eve'] } as const);
```

객체의 타입을 추론할때 타입스크립트는 일반적인 타입을 선택한다. 따라서 위의 예에서 `names`는 `string[]` 타입으로 추론된다.

readonly 타입을 반환하게 할 경우 기존까지는 `as const` [타입 어설션](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)으로 강제화 해주어야 했는데, 이는 상당히 번거롭다.

```ts
function getNamesExactly<const T extends HasNames>(arg: T): T['names'] {
  //                       ^^^^^
  return arg.names;
}
// Inferred type: readonly ["Alice", "Bob", "Eve"]
// Note: Didn't need to write 'as const' here
const names = getNamesExactly({ names: ['Alice', 'Bob', 'Eve'] });
```

이제 `const` 타입 파라미터를 사용해 `as const` 추론이 가능해졌다. 하지만 이는 함수 호출 내에 작성된 객체, 배열, 표현식에만 영향을 미치므로 주소값을 넘기는 인수로는 동작할수 없음을 알아두어야 한다.

```ts
const inputNames = ['Alice', 'Bob', 'Eve'];

// Inferred type: ["Alice", "Bob", "Eve"]
// readonly 내놔!!!
const names = getNamesExactly({ names: inputNames });
```

## <a name="supporting-multiple-configuration-files-in-extends"></a>Supporting Multiple Configuration Files in extends

```ts
// packages/front-end/src/tsconfig.json
{
  "extends": ["@tsconfig/strictest/tsconfig.json", "../../../tsconfig.base.json"],
  "compilerOptions": {
      "outDir": "../lib",
      // ...
  }
}
```

extends 필드에 배열로 여러개의 config 파일을 지원하게 되었다. 개인적으로 상당히 만족

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

모든 enum은 union된 enum이다. 타입스크립트가 처음 enum을 도입했을 때만 해도 enum은 상수 집합에 불과했다(number 타입). 하지만 타입스크립트 2.0에서 enum 리터럴 타입(고유한 값; 상수 10, 20 등이 타입이 됨)이 도입되면서 리터럴 타입은 각 enum 멤버에 고유한 타입을 부여하게 된다.

각 enum 멤버에 고유한 타입을 부여할 때 발생하는 한 가지 문제는 해당 타입이 멤버의 실제 값과 연관되어 있다는 점이다.

예를 들어 아래와 같이 enum 멤버가 함수 호출로 초기화될 수 있는 경우, 값을 계산할수 없으므로 초기화 이전까지는 에러가 발생한다. 또한 `enum E`의 예시와 같이 `const a:E`는 `3 | 4`의 타입이 아닌 number가 된다. 이는 리터럴 타입의 장점을 사용하지 못하고 기존 상수 집합을 사용하고 있다는 뜻이 된다.

이제 타입스크립트 5버전 부터는 각 멤버에 대해 고유한 타입을 생성하여 enum 멤버를 union enum으로 사용할수 있게 되었다. **즉, enum의 모든 멤버를 좁혀서 그 멤버를 타입으로 참조할 수 있게 되었다**.

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

enum Color {
  random = Math.random(),
  two = 2,
}
// Error! Enum type 'Color' has members with initializers that are not literals.(2535)
const c: Color.random = 5;

// v5.0.3 =====================================
const a: E = 55; // Error! Type '55' is not assignable to type 'E'.(2322)
const b: E.three = 4444; // Error! Type '4444' is not assignable to type 'E.three'.(2322)
takeValue(6); // Error! Argument of type '6' is not assignable to parameter of type 'E'.(2345)

enum Color {
  random = Math.random(),
  two = 2,
}
// It works!
const c: Color.random = 5; // number
```

## <a name="--moduleresolution-bundler"></a>--moduleResolution bundler

```json
{
  "compilerOptions": {
    "target": "esnext",
    "moduleResolution": "bundler"
  }
}
```

대부분의 최신 번들러는 Node.js에서 ECMAScript 모듈과 CommonJS 조회 규칙의 융합을 사용한다. 번들러의 작동 방식을 모델링하기 위해 타입스크립트는 이제 새로운 전략인 --moduleResolution 번들러를 도입한다.

하이브리드 조회 전략을 구현하는 Vite, esbuild, swc, Webpack, Parcel 등의 최신 번들러를 사용 중이라면 새로운 bundler옵션이 적합하다.

## <a name="support-for-export-type-"></a>Support for export type \*

```ts
// models/vehicles.ts
export class Spaceship {
  // ...
}

// It works!
// models/index.ts
export type * as vehicles from './vehicles';

// main.ts
import { vehicles } from './models';

function takeASpaceship(s: vehicles.Spaceship) {
  //  ok - `vehicles` only used in a type position
}

function makeASpaceship() {
  return new vehicles.Spaceship();
  //         ^^^^^^^^
  // 'vehicles' cannot be used as a value because it was exported using 'export type'.
}
```

타입스크립트에서 `export type *` 문법이 가능해졌다. 이를 통해 타입과 값의 분리가 더 명확해졌다.

## <a name="overload-support-in-jsdoc"></a>@overload Support in JSDoc

```ts
// 기존에는 이와 같이 함수를 계속해서 확장해 나가야 했다.
// Our overloads:
function printValue(str: string): void;
function printValue(num: number, maxFractionDigits?: number): void;

// 이제 아래와 같이 @overload 태그를 사용해 오버로드를 선언할 수 있다
/**
 * @overload
 * @param {string} value
 * @return {void}
 */
/**
 * @overload
 * @param {number} value
 * @param {number} [maximumFractionDigits]
 * @return {void}
 */
/**
 * @param {string | number} value
 * @param {number} [maximumFractionDigits]
 */
function printValue(value, maximumFractionDigits) { ... }

// all allowed
printValue("hello!");
printValue(123.45);
printValue(123.45, 2);

printValue("hello!", 123); // error!
```

기존에 코드로 표현해야 했던 부분을 jsdoc으로 나누어서 표현(example 등)할수 있기 때문에 DX의 향상에 기대가 된다.

## <a name="speed-memory-and-package-size-optimizations"></a>Speed, Memory, and Package Size Optimizations

<img width="518" alt="image" src="https://user-images.githubusercontent.com/23524849/231056743-21f6a556-ffc8-4ac8-8449-8036153b34c7.png">

![compare v5 to v4.9](https://devblogs.microsoft.com/typescript/wp-content/uploads/sites/11/2023/03/speed-5.0-stable-2.png)

![typescript npm package size](https://devblogs.microsoft.com/typescript/wp-content/uploads/sites/11/2023/03/size-5.0-stable-1.png)

지표에서도 눈에 띄일만큼 변경사항이 있으며 원문 블로그 자체에서도 대부분의 코드베이스에서 10~20% 정도 속도 향상을 느낄 수 있다고 자신하고 있기 때문에 모노레포에서 타입 참조 시간을 많이 줄일수 있을 것이라 기대하고 있다.

## <a name="breaking-changes-and-deprecations"></a>Breaking Changes and Deprecations

### Runtime Requirements

타입스크립트는 이제 ECMAScript 2018을 대상으로 한다. 최소 엔진은 12.20으로 설정되었다.

### lib.d.ts Changes

DOM의 유형이 생성되는 방식이 변경되어 기존 코드에 영향을 미칠 수 있다. 특히 특정 프로퍼티가 숫자에서 숫자 리터럴 타입으로 변환되었으며, 잘라내기, 복사, 붙여넣기 이벤트 처리를 위한 프로퍼티와 메서드가 인터페이스 전반으로 이동되었다.

### API Breaking Changes

TypeScript 5.0에서는 모듈로 전환하고, 불필요한 인터페이스를 제거했으며, 일부 정확성을 개선했다.

### Forbidden Implicit Coercions in Relational Operators

```ts
function func(ns: number | string) {
  return ns * 4; // Error, possible implicit coercion
}
function func(ns: number | string) {
  return ns > 4; // Now also an error. number | string 타입은 비교할수 없다(string은 비교 불가능).
}
```

TypeScript의 특정 연산은 암시적으로 문자열을 숫자로 강제 변환할 수 있는 코드를 작성할 경우 이미 경고한다. 5.0에서는 관계 연산자(<,>,<=,=>)에도 적용된다.

```ts
function func(ns: number | string) {
  return +ns > 4; // OK
}
```

`+` 연산자를 통해 명시적 형변환후 사용하는것은 가능하다.

### Enum Overhaul

```ts
enum SomeEvenDigit {
  Zero = 0,
  Two = 2,
  Four = 4,
}

// Now correctly an error
let m: SomeEvenDigit = 1;

// =====
enum Letters {
  A = 'a',
}
enum Numbers {
  one = 1,
  two = Letters.A, // enum의 참조가 있을 경우 number 타입으로 됨
}

// Now correctly an error
const t: number = Numbers.two;
const t2: string = Numbers.two; // 5.0 이전에는 여기서 에러가 발생함(-_-)
```

enum을 이해하는 개념 수를 줄이기 위해 위의 두 가지 오류가 추가되었다.

## 마무리

decorator 추가 및 enum 명시성 확장, multi extends, jsdoc 등 다양한 편의성이 추가되었기 때문에 기대되는 메이저 업데이트이다.

이 글에서 다루지 않은 더 자세한 내용은 아래의 원문에 자세하게 추가되어 있다.

## 참고

- <https://devblogs.microsoft.com/typescript/announcing-typescript-5-0>
- <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html>
- <https://ko.javascript.info/call-apply-decorators#ref-634>
- <https://2ality.com/2022/10/javascript-decorators.html>
