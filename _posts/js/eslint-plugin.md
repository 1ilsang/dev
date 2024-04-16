---
title: 'ESLint 플러그인 배포하기'
description: 'ESLint 플러그인 배포 방법 알아보기'
url: 'deploy-eslint-plugin'
tags: ['eslint', 'plugin', 'ast']
coverImage: 'https://github.com/1ilsang/dev/assets/23524849/d3c160f4-daef-49e0-ab36-39009eb277bc'
date: '2023-09-01T06:48:29.956Z'
ogImage:
  url: 'https://github.com/1ilsang/dev/assets/23524849/d3c160f4-daef-49e0-ab36-39009eb277bc'
---

![cover](https://github.com/1ilsang/dev/assets/23524849/485f661f-95f1-4ffe-81c9-651ea945f92e 'cover')

ESLint 플러그인 구조를 간단하게 분석하고 커스텀 플러그인을 만들어 배포해 보자.

## TL;DR!

1. ESLint에서 제공해 주는 generator를 사용해 프로젝트를 만든다.
2. 규칙을 만든다.
3. 배포한다.

## 기본 세팅

### 플러그인 구조 만들기

```sh
# yo는 yeoman의 줄임으로, 스케폴딩 지원 도구다.
npm install -g yo
# ESLint 특화 스케폴딩 인터페이스 CLI를 설치한다.
npm install -g generator-eslint
```

ESLint는 플러그인 구조의 통일을 위해 제너레이터를 제공해 주고 있다.

`yo`는 [yeoman](https://yeoman.io)의 줄임으로, 스케폴딩 지원 도구다. 프로젝트에 필요한 디렉토리 및 파일을 커맨드라인으로 생성해 준다.

[generator-eslint](https://www.npmjs.com/package/generator-eslint)는 yeoman을 활용해 프로젝트를 구조화할 때 ESLint를 기준으로 설치되도록 래핑 된 패키지이다. ESLint에서 관리/지원하고 있으므로 직접 yo로 구조를 설정하지 않아도 어려움 없이 one-line으로 ESLint 구조를 생성할 수 있게 된다.

매우 간편하므로 설치한다.

```sh
# 플러그인 디렉토리 생성
mkdir eslint-plugin-NAME
cd eslint-plugin-NAME # 디렉토리로 이동

# 전역으로 설치한 yo에서 스케폴딩된 generator-eslint를 실행한다.
yo eslint:plugin
? What is your name? GITHUB_NAME # package.json의 author에 추가된다.
? What is the plugin ID? NAME # 해당 Plugin의 실제 이름(배포 명)이 되므로 적절하게 작성한다.
? Type a short description of this plugin: PLUGIN_DESCRIPTION # package.json의 description에 나타난다.
? Does this plugin contain custom ESLint rules? Yes # 커스텀 룰을 추가할 것이므로 Yes.
? Does this plugin contain one or more processors? No # 우리는 eslint 기본 프로세서를 사용할 것이므로 No를 설정한다.

# 초기 세팅이 되었으므로 dependencies를 설치한다.
npm install
```

![default-architecture](https://github.com/1ilsang/dev/assets/23524849/2240acfd-bd8f-4378-9914-09f294f8b69f)

초기 구조 설정이 완료되면 위와 같이 폴더가 생성된다.

ESLint의 다양한 규칙은 `lib/rules`에 추가되어야 한다. 우리는 커스텀 규칙을 만들 것이므로 해당 디렉토리에 추가해 나가야 한다.

### 플러그인 Rule 구조 만들기

친절하게도 ESLint에서 커스텀 룰의 구조도 패키징 해주었기 때문에 `yo`를 통해 한 번 더 rule 구조를 만들어 준다.

```js
var myData = getData123(); // 함수에 숫자가 있으므로 우리의 ESLint 플러그인에서 에러를 발생시킬 것이다!
```

우리는 "**함수에 숫자가 있으면 안 된다**"는 룰을 만들어 보자.

```sh
# generator-eslint에 설정되어 있는 rule 옵션으로 yo를 통해 구조를 만든다.
yo eslint:rule
? What is your name? 1ilsang # rule 파일에 주석으로 author로 추가된다.
? Where will this rule be published? ESLint Plugin # core가 아닌 plugin 추가이므로 plugin으로 설정한다.
? What is the rule ID? no-function-name-number # rule 아이디에 해당한다. rule 파일명이 된다.
? Type a short description of this rule: The function name must not contain numbers. # rule 설명 추가. 주석으로 파일에 추가된다.
? Type a short example of the code that will fail: var myData = getData123(); # 에러 케이스를 설정한다. 함수에 숫자가 있으면 안되므로 에러상황이다.
   create docs/rules/no-function-name-number.md
   create lib/rules/no-function-name-number.js
   create tests/lib/rules/no-function-name-number.js

No change to package.json was detected. No package manager install will be executed.
```

![rule-architecture](https://github.com/1ilsang/dev/assets/23524849/0e38253f-1278-4aba-80ed-ff44b631b27f 's')

CLI를 다 작성하면 위와 같이 rules 폴더 밑에 추가된 것을 확인할 수 있다. 이제 우리는 해당 파일에서 규칙을 추가하면 된다.

## ESLint의 소스코드 파싱과 AST

규칙 추가에 앞서 ESLint의 동작 방식을 가볍게 살펴보자.

기본적으로 ESLint는 [Espree 파서](https://github.com/eslint/espree)를 사용해 소스코드를 정적 분석한 뒤 AST(Abstract Syntax Tree)를 생성한다.

우리는 파싱된 트리에서 구문을 분석해 커스텀 규칙에 위반하는지 확인하면 된다.

![ast-tree](https://github.com/1ilsang/dev/assets/23524849/2b0673b3-e325-4e39-96f4-6c8c96ea1632)

[astexplorer](https://astexplorer.net/) 사이트를 활용하면 파싱된 AST 트리를 눈으로 쉽게 볼 수 있다.

우리는 함수명을 분석해야 하므로 `getData123`에 집중한다. 해당 값은 `CallExpression > callee > name`에 존재한다는 것을 확인할 수 있다.

이제 우리의 커스텀 룰에 추가하면 된다!

## 규칙 추가

```js
// lib > rules > no-function-name-number.js
module.exports = {
  meta: {
    type: 'problem', // 이 규칙에 위반되는 값은 코드에 없어야 하므로 problem으로 설정한다.
    docs: {
      // 해당 규칙에 어긋날 경우 빨간줄 위에 뜨는 문구를 설정할 수 있다.
      description: 'The function name must not contain numbers.',
      recommended: true,
      url: 'https://1ilsang.dev/posts/deploy-eslint-plugin',
    },
    fixable: true, // 자동 수정을 추가할 예정으로 true로 한다.
    schema: [], // 규칙이 여러 옵션을 가지고 있다면 스키마로 분리해 표현할 수 있다.
  },

  create(context) {
    // 우리의 규칙을 위해 CallExpression > callee > name의 문자열이 숫자가 있는지 확인하면 된다.
    return {
      CallExpression(node) {
        const { callee } = node;

        // callee.name에 숫자가 포함되면
        if (/[0-9]/.test(callee.name)) {
          context.report({
            node,
            data: { wrongFunc: callee.name },
            // 에러 메시지를 띄운다. wrongFunc는 현재 함수의 토큰 값이다.
            message: `[{{wrongFunc}}()] 함수에 숫자..?`,
            // --fix 옵션으로 수정되게 할 수 있다. 숫자를 ''로 치환한다.
            fix: (fixer) =>
              fixer.replaceText(callee, callee.name.replaceAll(/[0-9]/g, '')),
          });
        }
      },
    };
  },
};
```

> 각 옵션에 대한 상세 정보는 [공식 문서](https://eslint.org/docs/latest/extend/custom-rules)를 읽어보길 추천한다.

## 테스트 추가

메타테그 및 규칙을 완성하면 테스트를 해보자.

```js
// tests > lib > rules > RULE_NAME.js
ruleTester.run('RULE_NAME', rule, {
  // 테스트를 통과하는 함수.
  valid: ['var data = getData();'],

  // 테스트를 통과하지 못하는 함수.
  invalid: [
    {
      code: 'var data = getData123();',
      errors: [
        {
          message: '[getData123()] 함수에 숫자..?',
          type: 'CallExpression',
        },
      ],
    },
  ],
});
```

## 배포하기

이제 마지막 단계인 배포를 해보자. npm 로그인이 되어있으면 큰 문제 없이 가능하다.

```json
// package.json
{
  "name": "eslint-plugin-ID",
  "version": "0.0.1"
}
```

ESLint 플러그인은 `eslint-plugin` prefix가 존재하므로 이름을 지켜준다.

배포는 버전을 기준으로 진행하게 되므로 코드 수정내역이 발생해 다시 배포한다면 `version`을 업데이트해 주어야 한다.

```sh
npm publish
```

해당 명령어로 배포하면 완료! 만약 `ENEEDAUTH` 에러가 발생한다면 `npm adduser`를 통해 로그인을 해주자.

## 사용하기

배포된 플러그인을 실제로 사용해 보자. `npm i -D eslint-plugin-PLUGIN_ID`으로 설치한다.

```json
// .eslintrc
{
  "plugins": ["PLUGIN_ID"],
  "rules": {
    "PLUGIN_ID/RULE": "error"
  }
}
```

`.eslintrc` 파일에 배포된 플러그인 아이디를 설정하고 rule을 지정한다.

![result](https://github.com/1ilsang/dev/assets/23524849/adfc66f0-0516-4a77-90dd-6c9a523d8192)

이제 IDE에서 함수에 숫자를 사용하면 에러가 노출되는 것을 확인할 수 있다.

`eslint --fix`를 실행하게 되면 `isNumber`로 함수명이 변경된다.

또한 에러 문구의 `eslint(plugin/rule)`의 링크를 클릭하면 `meta > docs > url` 값으로 리다이렉트 된다.

그럼 이만!

## Reference

- <https://eslint.org/docs/latest/extend/custom-rules>
