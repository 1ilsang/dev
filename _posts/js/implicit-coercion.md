---
title: '알랑말랑 암묵적 형변환 말랑말랑 이해하기'
description: '자바스크립트의 형변환은 어떻게 일어나는가?'
tags: ['javascript', 'type', 'implicit-coercion']
coverImage: 'https://user-images.githubusercontent.com/23524849/233845072-aa409fb1-2182-47e7-92ea-94b740bde30c.png'
date: '2023-04-22T08:02:20.684Z'
ogImage:
  url: 'https://user-images.githubusercontent.com/23524849/233845072-aa409fb1-2182-47e7-92ea-94b740bde30c.png'
---

```js
{} == []  // ERROR
[] == {}  // false
[] == ''  // true
[] == []  // false
"[object Object]" == {}  // true
[45] == 45  // true
[45] == '45'  // true
4 * []  // 0
[] + {}  // "[object Object]"
{} + []  // 0
0 == '\n'  // true
1 + 2 + '3'  // 33
NaN == NaN  // false
undefined == null // true

```

![cover](https://user-images.githubusercontent.com/23524849/233840877-eb7e5d64-4d5a-48b8-a960-6c16f99dff41.png 'cover')

### TL;DR!

1. 위 예시의 결과값이 도출되는 과정을 이해한다.
2. 암묵적 형변환을 유도하지 말라
3. 암묵적 형변환을 유도하지 마시오

> **타입스크립트를 사용하면 되지 않나요?**

### 들어가기 전에

![primitive-type](https://user-images.githubusercontent.com/23524849/233840925-4bed99f9-37cb-48cf-af23-b5c00ffc31f1.png 'l')

> [이미지 주소](https://velog.io/@imjkim49/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%8D%B0%EC%9D%B4%ED%84%B0-%ED%83%80%EC%9E%85-%EC%A0%95%EB%A6%AC)

자바스크립트는 6가지 원시 타입과 `Object` 라는 객체 타입, **총 7가지 타입** 이 존재한다.

> ES2020에서 원시 타입에 bigint 타입이 추가되었기 때문에 이제는 총 8가지 타입이 존재하게 되었다.

기본적으로 암묵적 형변환은 모두 "원시 타입(**문자열, 숫자, 불리언**)"을 기준으로 하게 된다. 원시타입이 객체타입으로 암묵적 형변환이 되는 케이스는 존재하지 않는다.

### 암묵적 형변환은 언제 일어나나요?

```js
// 표현식이 모두 문자열 타입이여야 하는 컨텍스트
const a = '10' + 2; // "102"
const b = `1 * 10 = ${1 * 10}`; // "1 * 10 = 10"

// 표현식이 모두 숫자 타입이여야 하는 컨텍스트
5 * '10'; // 50

// 표현식이 불리언 타입이여야 하는 컨텍스트
!0; // true
if (1) {
}
1 == []; // false
```

**자바스크립트 엔진은 표현식을 평가할 때 문맥, 즉 컨텍스트(Context)에 고려하여 암묵적 타입 변환을 실행한다.**

> [https://poiemaweb.com/js-type-coercion#2-암묵적-타입-변환](https://poiemaweb.com/js-type-coercion#2-암묵적-타입-변환)

- 산술 연산자(+-\*/)의 경우 `+` 는 문자열이 우선순위가 더 높으며 나머지 연산은 숫자가 더 우선순위가 높다.
- 동치 연산자(==)의 경우 피연산자간의 관계에 따라 정의가 다르다.

### 동치연산자 한짤로 보기

![example](https://user-images.githubusercontent.com/23524849/233842467-9581968c-00a0-47f4-a305-76b3bfdae97f.png 'l')

> 출처: [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Equality_comparisons_and_sameness)

동치 연산의 관계를 보면 `Object` 타입의 경우 `ToPrimitive` 라는 값이 있다.

이 함수가 암묵적 형변환의 핵심이며, 이 함수를 이해하면 타입 변환의 과정을 이해할 수 있다.

## `ToPrimitive` 는 동치연산 뿐만 아니라 원시값과 비교가 필요한 모든 순간에 동작한다

![to-primitive](https://user-images.githubusercontent.com/23524849/233842491-1d19517e-6efc-4fc5-9efd-b55233a40929.png)

`Symbol.toPrimitive`: A method that converts an object to a corresponding primitive value. Called by the ToPrimitive abstract operation.

> [ECMA2020](https://262.ecma-international.org/11.0/)

설명과 같이 객체의 원시 타입의 값을 반환하는 `Symbol.toPrimitive` 메서드는 `ToPrimitive` **추상 명령** 에서 사용된다.

```js
function toPrimitive(input, PreferredType) {
  // PreferredType은 호출자가 기대하는 타입
  if (typeof input === 'object' || typeof input === 'function') {
    let hint =
      PreferredType === undefined
        ? 'default'
        : typeof PreferredType === 'string'
          ? 'string'
          : 'number';
    let exoticToPrim = input[Symbol.toPrimitive];
    if (exoticToPrim !== undefined) {
      let result = exoticToPrim.apply(input, [hint]);
      if (!(typeof input === 'object' || typeof input === 'function'))
        return result;
      throw new TypeError();
    }
    if (hint === 'default') hint = 'number';
    return OrdinaryToPrimitive(input, hint);
  }
  return input;
}
```

> [코드 출처](https://blog.naver.com/sbshw1/221236403574)

input 이 객체이며 toPrimitive 추상 명령이 해당 객체 내에 없다면(`input[Symbol.toPrimitive]`) `OrdinaryToPrimitive` 를 호출하고 있다.

`input[Symbol.toPrimitive]` 이 메서드는 객체 프로퍼티로 개발자가 직접 넣은 케이스이므로 여기서는 넘어가겠다.

`hint` 는 어떤 원시 타입을 부를지에 대한 정의로써, **기본 타입이 넘버 타입인 것을 인지**하고 넘어가자.

```js
function OrdinaryToPrimitive (O, hint) {
  if ( typeof O === "object" || typeof O === "function" ) {
    if( typeof hint === "string" && ( hint === "string" || hint === "number" ) ) {
      let methodNames = hint === "string" ? [ "toString", "valueOf" ] : [ "valueOf", "toString" ];
      for( name of methodNames ) {
        let method = O[name];
        if( typeof method === "function" ) {
          let result = method.apply(O);
          if( typeof result !== "object" && typeof result !== "function" ) return result;
        }
    }
  }
 throw new TypeError();
}
```

> [코드 출처](https://blog.naver.com/sbshw1/221236403574)

`hint` 가 `string` 이면 `[toString, valueOf]` 이며 `number` 이면 `[valueOf, toString]` 순서로 우선권을 가지는 것을 볼 수 있다.

여기서 _우선권_ 이라는 단어를 사용하였는데, 그 이유는 `for` 문을 통해 `apply` 하는 순서가 달라지기 때문이다.

원시 타입을 찾았다면(`if( typeof result !== "object" && typeof result !== "function" )`) 결과를 반환하고 아니면 **무시된다** 이는 굉장히 중요한데, 아래에서 예시로 다루겠다.

- 따라서, **타입간 비교에서 암묵적 형변환들은 모두 원시타입으로 변환하기 위한 과정 속에서 일어난다.**

### 예제로 정리하기

```js
1. 4 * []  // 0
2. 4 + []  // "4"
3. [] + {}  // "[object Object]"
4. [45] == 45  // true
5. {} == []  // ERROR
6. 0 == '\n'  // true
```

```js
// CASE 1.
1. 4 * []
// +를 제외한 산술 연산의 경우 숫자타입이 최상위 우선순위이므로 암묵적 형변환은 Number == ToPrimitive([]) 으로 될 것이다.
2. 4 * Object([])  // 4 * []
// Symbol.toPrimitive 정의를 해주지 않았으므로 default hint 는 number 로 설정된다.
3. 4 * Object([]).valueOf()  // 4 * []
// Default hint 가 number 이므로 [valueOf, toString] 순으로 원시 값을 가져올 것이다.
4. 4 * Object([]).valueOf().toString()  // 4 * ""
// 하지만 valueOf 는 this 반환으로 객체([])를 반환해 원시타입이 아니게 되므로 무시된다. 따라서 후순위의 toString 함수가 실행된다.
5. 4 * Number(Object([]).valueOf().toString()) // 4 * 0
// 숫자 * 문자열 연산에서 숫자가 우선순위가 높으므로 Number 타입으로 형변환이 된다.
6. 0
// 그 결과 4 * 0 이 되어 0이 최종 리턴된다.
```

```js
// CASE 2.
1. 4 + []
2. 4 + Object([]).valueOf().toString() // ""
// CASE1 예시의 4번까지와 동일하다.
3. String(4) + Object([]).valueOf().toString() // "4"
// + 연산자에서는 숫자보다 문자가 우선순위를 가지므로 숫자가 String 으로 변환되었다.
4. "4"
```

```js
// CASE 3.
1. [] + {}
2. Object([]) + Object({})
3. Object([]).valueOf() + Object({}).valueOf()  // [] + {}
// 모두 객체자신을 반환하므로 toString 연산까지 진행하게 된다.
4. Object([]).valueOf().toString() + Object({}).valueOf().toString()  // "" + "[object Object]"
// 객체의 toString 은 prototype 상속으로 최종 this 결과값을 반환해 object Object 가 나타난다.
// Object.prototype.toString.call(undefined) 호출시 "[object Undefined]" 가 나오는 것 처럼.
5. "[object Object]"
```

```js
// CASE 4.
1. [45] == 45
2. Object([45]) == 45
3. Object([45]).valueOf() == 45 // [45] == 45
4. Object([45]).valueOf().toString() == 45 // "45" == 45
5. Number(Object([45]).valueOf().toString()) == 45 // 45 == 45
6. true
```

```js
// CASE 5.
1. {} == []
// {} 중괄호는 "객체"로 인식되는 것이 아닌 "블록 스코프"로 인식되어 사라져버린다!
2. == []
3. // Uncaught SyntaxError: Unexpected token '=='
```

```js
// CASE 6.
1. 0 == '\n'
2. 0 == ""
3. 0 == Number('')
4. 0 == 0
5. true
```

### 한발 더 나아가기

1. `hint` 는 언제 `default` 값을 벗어나게 될까?
   - `<`, `>` 혹은 `-`, `*` 와 같이 명확한 숫자 비교에선 `number` 가 된다.(`+` 는 문자열도 포함되므로 제외된다)
2. `Date` 객체를 제외한 모든 내장 객체는 `default` 와 `number` 를 동일하게 처리하므로 `number` 로 이해하는게 편하다.
   - 일반 객체는 [Symbol.prototype[@@toPrimitive]](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Symbol/@@toPrimitive)를 사용하는 반면 Date 객체는 [Date.prototype[@@toPrimitive]](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/@@toPrimitive)를 사용한다.
3. `boolean` 타입의 `hint` 는 존재하지 않는다. 모든 객체는 `true` 로 평가되므로 `string`, `number` 만 처리하면 된다.
4. `[Symbol.toPrimitive]` 를 커스텀 할 수 있는가?
   - 가능하다.

```js
const user = {
  name: '1ilsang',
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == 'string' ? `{name: "${this.name}"}` : this.money;
  },
};

// 데모:
alert(user); // hint: string -> {name: "1ilsang"}
alert([user] == '{name: "1ilsang"}'); // hint: string -> {name: "1ilsang"} == {name: "1ilsang"}; true;
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> default는 number가 기본타입이므로 1000 + 500 -> 1500
alert('3' - user); // hint: number -> '3' - 1000 -> 3 - 1000 -> -997
alert(user > 10); // hint: number -> 1000 > 10; true
alert(user + new Date()); // hint: default -> 1000 + 'Sat Apr 22 2023 17:02:00 GMT+0900 (한국 표준시)' -> '1000Sat Apr 22 2023 17:02:00 GMT+0900 (한국 표준시)'
```

5. `NaN` 은 모든 경우에서 같지 않다.
   - `NaN == NaN // false`

### 결론

1. 타입간 비교에서 암묵적 형변환들은 모두 원시 타입으로 변환하기 위한 과정 속에서 `ToPrimitive` 추상 명령을 통해 일어난다.
2. `==` 연산자와 `===` 연산자의 차이는 무엇인가?
   - "타입까지 비교 여부" 라고하면 애매하다. "암묵적 형변환을 허용하는가"의 차이가 더 명확한 워딩이다.
3. 타입스크립트와 `===` 연산자를 사용하자.

### Ref

- 모던 자바스크립트 Deep-dive: 7장 연산자 추상 연산
- [ECMA2020](https://262.ecma-international.org/11.0/#sec-toprimitive)
- [동치 연산 관계](https://developer.mozilla.org/ko/docs/Web/JavaScript/Equality_comparisons_and_sameness)
- [추상 명령 코드](https://blog.naver.com/sbshw1/221236403574)
- [객체를 원시형으로 변환하기](https://ko.javascript.info/object-toprimitive)
- ["[object Object]"](https://medium.com/%EC%98%A4%EB%8A%98%EC%9D%98-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%97%90%EC%84%9C-object-object-%EA%B0%80-%EB%8C%80%EC%B2%B4-%EB%AD%98%EA%B9%8C-fe55b754e709)
