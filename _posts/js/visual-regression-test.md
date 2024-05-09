---
title: '시각적 회귀 테스트 도입기'
description: 'playwright 소개와 트러블 슈팅'
url: 'visual-regression-test'
tags: ['test', 'visual-regression-test', 'playwright', 'snapshot']
coverImage: 'https://github.com/1ilsang/dev/assets/23524849/a6de7fcd-2666-44f5-931a-c440785dc0e5'
date: '2024-05-06T05:34:05.054Z'
ogImage:
  url: 'https://github.com/1ilsang/dev/assets/23524849/a6de7fcd-2666-44f5-931a-c440785dc0e5'
---

![cover](https://github.com/1ilsang/dev/assets/23524849/aa46489d-c054-41f4-bdc2-fe11c8bab49f 'cover')

> Image Source: [We're Building a Visual Regression Testing Library for React Native](https://commerce.nearform.com/blog/2022/react-native-owl/)

블로그에 항상 테스트를 도입해야겠다 생각하고 있었는데 이번에 적용하게 되어 도입 배경과 트러블 슈팅 과정을 포스트로 남겨보고자 한다.

## Index

- [TL;DR!](#tldr)
- [도입 배경](#도입-배경)
- [시각적 회귀 테스트란](#시각적-회귀-테스트란)
- [Playwright](#playwright)
  - [DOM Snapshot](#dom-snapshot)
  - [Screenshot](#screenshot)
- [Github Actions](#github-actions)
- [성능 개선](#성능-개선)
  - [테스트 방식](#테스트-방식)
  - [테스트 속도](#테스트-속도)
  - [CI/CD](#cicd)
- [트러블 슈팅](#트러블-슈팅)
  - [로컬 테스트를 포기해야 할까](#로컬-테스트를-포기해야-할까)
  - [Timezone](#timezone)
  - [테스트 분기](#테스트-분기)
  - [1px](#1px)
  - [Image load](#image-load)
- [마무리](#마무리)

## TL;DR!

Playwright 및 Github Actions로 시각적 회귀 테스트 및 CI/CD를 적용한다.

1. 시각적 회귀 테스트로 UI 변경 사항을 배포전에 알아차린다
2. 빠르게 실패하고 실패한 부분만 재실행하자
3. 로컬 테스트와 CI Test의 통합은 어렵다

## 도입 배경

![test pyramid](https://github.com/1ilsang/dev/assets/23524849/7b69e87b-280f-4b86-8a3c-bf7b76dfc1e8)

> Image Source: [사용자 인터페이스 테스트 통합 테스트 및 단위 테스트로 테스트 피라미드](https://kr.freepik.com/premium-vector/test-pyramid-with-user-interface-tests-integration-tests-and-unit-tests_50393283.htm)

이전부터 블로그에 테스트 코드가 없는 것이 꽤나 찝찝했기 때문에 어떤 방식/도구로 테스트를 적용할까 고민하고 있었다.

블로그의 특성상 <u>한번 배포된 콘텐츠는 크게 바뀔 일이 없기 때문</u>에 정적 UI 테스트를 도입하기에 적절하다고 생각했고 마침 꽤나 긴 연휴가 있었기 때문에 각 잡고 정적 UI 테스트를 도입하고자 마음먹게 되었다.

빌드된 결과물을 바탕으로 테스트할 예정이었기 때문에 아래의 두 가지 방식의 테스트를 고려했다.

1. DOM Snapshot
2. Screen Snapshot

먼저 DOM 스냅샷 비교를 통해 이후 작업에서 기존 DOM 구조를 변경하는지 확인한다. 하지만 DOM 스냅샷은 CSS의 변경 여부를 알아차리기 어렵다는 단점이 있다.

따라서 시각적 회귀 테스트인 Screen 스냅샷 비교로 정상적인 렌더링이 되었는지 확인한다.

## 시각적 회귀 테스트란

![failed visual regression test](https://github.com/1ilsang/dev/assets/23524849/b7a57bd0-6059-4c87-87b2-bd78d0ff01d7 'l')

> (좌) 차이가 생긴 렌더링 결과물. (우) 차이가 생긴 부분 히트맵

시각적 회귀 테스트(Visual Regression Test)는 코드 변경 전후의 렌더링 된 UI의 스크린샷을 비교하는 테스트이다.

위의 좌측 이미지를 확인해 보면 더 명확하게 알 수 있다. 모종의 이유로 하위 이미지 크기가 달라졌고 이에 따라 이후의 <u>시각적 구조가 변경</u> 되었다.

우측 이미지는 Diff 이미지로, 차이가 생긴 영역에 붉게 표시를 해놓았다.

이로써 우리는 컴포넌트가 실제로 어떻게 렌더링 되었는지 정확하게 알 수 있게 된다.

## Playwright

![playwright](https://github.com/1ilsang/dev/assets/23524849/006e72b3-5f73-4938-af76-3a4d9f39840c)

어떤 방식의 테스트를 할지 결정되었으니 자연스럽게 어떤 도구로 테스트를 작성할지 고민하게 되었다.

|        Aspect         |                          Playwright                          |                                   Cypress                                    |
| :-------------------: | :----------------------------------------------------------: | :--------------------------------------------------------------------------: |
|     Browser 지원      |                   Chrome, Firefox, Webkit                    |                          Chrome, Firefox, Electron                           |
|       병렬 실행       |                             무료                             |                                     유료                                     |
| 멀티탭(다중 브라우저) | [가능](https://playwright.dev/docs/pages#handling-new-pages) | [불가능](https://docs.cypress.io/guides/references/trade-offs#Multiple-tabs) |
|         성능          |          Headless Event-driven socket 방식으로 빠름          |                 실제 브라우저에서 실행하므로 상대적으로 느림                 |

> 더 자세한 내용은 [Cypress vs Playwright: A Detailed Comparison](https://www.lambdatest.com/blog/cypress-vs-playwright/) 참고

꾸준히 [Cypress](https://www.cypress.io/)를 사용해 왔지만 병렬 처리에 상당히 답답함을 느끼고 있었기 때문에 이번 기회에 [Playwright](https://playwright.dev/)에 도전하고자 결정했다.

물론 [Sorry-Cypress](https://sorry-cypress.dev/)로 병렬처리를 할 수 있지만 셀프 호스팅부터 신경 써야 하는 부분이 하나 더 생기기 때문에 기술부채가 싫은 나로서는 선택지에 해당되지 않았다.

![image (6)](https://github.com/1ilsang/dev/assets/23524849/32d1be8f-db0f-441b-af8d-bb79975ecdd1)

무엇보다 성능 부분에 차이가 있다. 테스트 결과를 하루종일 기다렸는데 심지어 실패했다? 한 줄 고치고 다시 하루종일 기다려야 한다.

정말 하기 싫어진다.

Playwright는 브라우저와 HTTP request 통신 대신 WebSocket으로 Dev tools에 바로 연결한다. 따라서 브라우저의 큰 메모리나 부가적인 리소스가 필요하지 않기 때문에 실제 브라우저와 통신하는 Cypress에 비해 가볍고 빠르다.

그렇다면 Playwright로 어떻게 기존의 목적, DOM snapshot과 Screen snapshot을 할 수 있는지 살펴보자.

### DOM Snapshot

```ts {6}
import { expect, test } from '@playwright/test';

test('should match DOM snapshot', async ({ page }) => {
  await page.goto('/about');
  const body = await page.locator('#__next').innerHTML();
  expect(body).toMatchSnapshot([`about.html`]);
});
```

나는 Next.js를 사용하고 있으므로 `__next` 하위의 DOM만 비교하고자 한다.

`innerHTML` 메서드를 통해 DOM 구조를 가져온 다음 playwright에서 제공하는 [toMatchSnapshot](https://playwright.dev/docs/api/class-snapshotassertions#snapshot-assertions-to-match-snapshot-2) 메서드로 DOM 스냅샷을 비교할 수 있다.

### Screenshot

```ts {5}
import { expect, test } from '@playwright/test';

test('should match Screenshot', async ({ page }) => {
  await page.goto('/about');
  await expect(page).toHaveScreenshot({ fullPage: true });
});
```

스크린샷 또한 playwright에서 제공하는 [toHaveScreenshot](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-2) 메서드로 쉽게 적용할 수 있다.

나는 전체 화면의 비교를 할 것이므로 `fullPage`를 설정했다.

### 시각적 회귀 테스트는 다양한 이유로 실패할 수 있다

1. 테스트가 실행되는 OS에 따라 화면이 달라지기 때문에 실패한다(이모지 등)
2. 동일한 OS라도 버전/브라우저에 따라 화면이 달라질 수 있다
3. 실행된 머신의 [타임존](https://namu.wiki/w/%EC%8B%9C%EA%B0%84%EB%8C%80/%EB%AA%A9%EB%A1%9D?from=%EC%8B%9C%EA%B0%84%EB%8C%80%2F%EA%B0%81%EA%B5%AD%EC%9D%98%20%EC%8B%9C%EA%B0%84%EB%8C%80)에 따라 Date 값이 달라져 실패할 수 있다
4. Image와 같은 Resource 로딩 시점에 따라 페이지가 달라질 수 있다
5. Animation 혹은 setTimeout과 같은 시간에 종속된 동작은 일관성을 보장할 수 없다
6. 눈에 큰 차이가 안 나더라도 실패할 수 있다(1px 차이로 실패 등)

위의 내용들은 일반적인 E2E 테스트에서도 발생할 수 있는 실패 케이스들이다. 일부 케이스는 밑의 [트러블 슈팅](#트러블-슈팅)에서 다루겠다.

이처럼 다양한 사이드 이펙트가 존재하기 때문에 동적인 컴포넌트가 많거나 화면이 자주 바뀐다면 도입 전에 [ROI](https://ko.wikipedia.org/wiki/%ED%88%AC%EC%9E%90%EC%9E%90%EB%B3%B8%EC%88%98%EC%9D%B5%EB%A5%A0)를 따져보는 것이 좋다.

기본적인 설정은 되었으므로 CI/CD를 구축하자.

## Github Actions

![github actions](https://github.com/1ilsang/dev/assets/23524849/a4a8ede8-b9ed-448a-9ed0-ec805ffe74de 'l')

> Image Source: [CI/CD with GitHub Actions: Step-by-Step Workflow](https://www.linkedin.com/pulse/cicd-github-actions-step-by-step-workflow-mysoly-v-o-f-vngqf/)

[Github Actions](https://docs.github.com/ko/actions)를 통해 [CI/CD](https://www.redhat.com/ko/topics/devops/what-is-ci-cd)를 간편하게 구축할 수 있다.

```yml title=".github/workflow/playwright.yml"
name: Playwright Tests
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npx playwright test
      # artifact에 playwright report를 업로드해 어디서 실패했는지 확인할 수 있다
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

![Actions result](https://github.com/1ilsang/dev/assets/23524849/215c1354-03af-4b70-aadb-df71b92013ac 'l')

## 성능 개선

위의 CI/CD는 3가지 문제가 있다.

1. 테스트 속도가 느리고 flow를 한눈에 확인하기 어렵다.
2. 캐싱이 전혀 되고 있지 않다.
3. 테스트가 실패하면 다시 처음부터 실행해야 한다.

이것을 개선해보고자 한다.

### 테스트 방식

![action log](https://github.com/1ilsang/dev/assets/23524849/ea06df55-1950-47ac-9a1a-841dd2b6abc2)

테스트의 어디까지 성공했는지, 어떤 테스트를 실행 중인지 등의 작업 상황을 보기 위해선 현재는 로그를 확인해야 한다.

이러한 <u>문제의 근본적인 이유는 특정 기능 단위의 테스트만 실행시키는 방법이 존재하지 않기 때문</u>이다.

```json title="package.json"
{
  // ...
  "e2e:others": "pnpm playwright test --grep-invert /@/",
  "e2e:dom": "pnpm playwright test --grep '@dom-snapshot'",
  "e2e:screen": "pnpm playwright test --grep '@screen-snapshot'"
}
```

따라서 playwright에서 제공하는 [grep](https://playwright.dev/docs/test-cli#reference) 명령어를 활용해 원하는 기능별로 테스트를 적용할 수 있다.

DOM 스냅샷은 `@dom-snapshot` 키워드를, Screen 스냅샷은 `@screen-snapshot` 키워드를 가지고 있어야 한다. 그 이외의 테스트는 `others`로 실행된다.

```ts title="e2e/about.spec.ts"
export enum MACRO_SUITE {
  DOM_SNAPSHOT = '@dom-snapshot',
  SCREEN_SNAPSHOT = '@screen-snapshot',
}

test.describe('about', () => {
  test(MACRO_SUITE.SCREEN_SNAPSHOT, async ({ page }) => {
    await screenshotFullPage({ page, url: `/about`, arg: [`about.png`] });
  });

  test(MACRO_SUITE.DOM_SNAPSHOT, async ({ page }) => {
    await gotoUrl({ page, url: '/about' });
    const body = await page.locator('#__next').innerHTML();
    expect(body).toMatchSnapshot([`about.html`]);
  });

  test('should redirect 404', async ({ page }) => {
    await gotoUrl({ page, url: '/something_wrong_path', timeout: 60_000 });
    await expect(page.getByText(/404 ERROR/)).toBeVisible();
  });
});
```

이제 우리는 dom, screen, others 세 가지 테스트 피처를 가지게 되었다. 이것은 후술할 CI/CD에서 큰 역할을 하게 된다.

### 테스트 속도

```ts {7}
test.describe(MACRO_SUITE.SCREEN_SNAPSHOT, () => {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];

    test(`${url}`, async ({ page }) => {
      await page.goto(`/posts/${url}`);
      await page.waitForTimeout(3000);
      await expect(page).toHaveScreenshot({ fullPage: true });
    });
  }
});
```

테스트 속도에는 많은 것들의 영향이 있겠지만 기본적으로 wait timeout이 가장 좋지 않다.

특히 위와 같이 반복문으로 작업을 하게 될 경우 N의 배수로 시간이 증가하게 된다.

이미지 로딩까지 3초의 텀을 두고자 한 위의 코드는 이미지가 빨리 로딩되었다면 불필요한 기다림이 발생하고 이미지가 3초보다 늦게 로딩되면 깨지는 불안정한 코드다.

```ts
// Image 로딩 wait
const locators = page.locator('//img');
await locators.evaluateAll((e) => e.map((i) => i.scrollIntoView()));
const promises = (await locators.all()).map((locator) =>
  locator.evaluate<any, HTMLImageElement>(
    (image) => image.complete || new Promise((f) => (image.onload = f)),
  ),
);
await Promise.all(promises);

// Font wait
await page.evaluate(() => document.fonts.ready);
```

이처럼 유동적인 사이드 이펙트는 이벤트로 처리하면 보다 안정적으로 처리할 수 있다.

### CI/CD

앞서 언급한 세 가지 문제

1. 테스트 속도가 느리고 flow를 한눈에 확인하기 어렵다.
2. 캐싱이 전혀 되고 있지 않다.
3. 테스트가 실패하면 다시 처음부터 실행해야 한다.

이것은 workflow와 actions를 적절하게 나눠주고 actions/cache를 활용하면 된다.

```yml title="workflows"
jobs:
  others:
    uses: './.github/workflows/e2e-reusable.yml'
    with:
      others: true

  dom-snapshot:
    uses: './.github/workflows/e2e-reusable.yml'
    with:
      dom-snapshot: true

  screen-snapshot:
    uses: './.github/workflows/e2e-reusable.yml'
    with:
      screen-snapshot: true
```

![workflow job](https://github.com/1ilsang/dev/assets/23524849/e4efbba0-43ea-4cd1-84cb-704f86c81fac)

앞에서 나눈 테스트 피처 단위로 workflows의 job을 나눠주고 [workflow_call](https://github.com/1ilsang/dev/blob/23af6919397a28a6a69881d4b376f4c77d0b3584/.github/workflows/e2e-reusable.yml#L5)을 적절하게 사용한다면 편리하고 가독성 좋은 Flow를 만들 수 있다.

![failed flow](https://github.com/1ilsang/dev/assets/23524849/8c2b620f-515a-42a5-8d64-340675f3b879 'l')

무엇보다 job을 나누게 되면 실패한 부분만 재실행할 수 있기 때문에 더욱 유연한 테스트를 할 수 있게 된다.

```yml title="actions"
# playwright 설치 캐시
- name: Cache Playwright Browsers for Playwright's Version
  uses: actions/cache@v4
  with:
    # https://playwright.dev/docs/browsers#managing-browser-binaries
    path: ~/Library/Caches/ms-playwright
    key: ${{ runner.os }}-playwright-${{ steps.playwright-version.outputs.PLAYWRIGHT_VERSION }}
  id: cache-playwright-browsers

- name: Setup Playwright
  shell: bash
  if: steps.cache-playwright-browsers.outputs.cache-hit != 'true'
  run: pnpm e2e:install

# pnpm 설치 캐시
- name: Setup pnpm cache
  uses: actions/cache@v4
  with:
    path: ${{ env.STORE_PATH }}
    key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
    restore-keys: |
      ${{ runner.os }}-pnpm-store-

# Next.js Build and Export 캐시
- name: Restore Next.js related caches
  uses: actions/cache@v4
  with:
    path: |
      ${{ github.workspace }}/.next
      ${{ github.workspace }}/out
    key: ${{ runner.os }}-nextjs-store-${{ hashFiles('**/pnpm-lock.yaml') }}-${{ hashFiles('**.[jt]s', '**.[jt]sx', '**.md') }}-${{ inputs.e2e == 'true' && 'e2e' || 'default' }}
    restore-keys: |
      ${{ runner.os }}-nextjs-store-${{ hashFiles('**/pnpm-lock.yaml') }}-
  id: cache-nextjs-build

- name: Build and Export [default]
  shell: bash
  if: steps.cache-nextjs-build.outputs.cache-hit != 'true'
  run: pnpm e2e:build
```

Job을 분리하면 불필요한 반복 빌드 작업이 발생하게 되는데 이를 캐싱을 통해 시간을 단축시킬 수 있다.

특히 잘 변경되지 않는 정적 블로그의 경우 `pnpm`, `.next`, `out`, `playwright`를 캐싱해 두면 전체 테스트 시간을 아낄 수 있게 된다.

![compare time](https://github.com/1ilsang/dev/assets/23524849/971e8417-96cc-492b-b429-c991989b2198 's')

이로써 절반이상 시간을 줄이고 실패에 더 유연한 CI 테스트를 할 수 있게 되었다.

[완성된 전체 코드](https://github.com/1ilsang/dev/tree/23af6919397a28a6a69881d4b376f4c77d0b3584)는 깃헙에서 확인할 수 있다. `.github` 및 `e2e`를 확인하면 된다.

## 트러블 슈팅

### 로컬 테스트를 포기해야 할까

팀 단위의 협업에선 로컬 머신 버전을 강제하기 어렵기 때문에 로컬 테스트와 CI 테스트의 동기화가 어렵다.

따라서 도커를 활용하든가 CI 테스트만 사용하든가 양자택일로 흐르게 된다.

하지만 지금 나의 플로우와 같이 1인 개발이라면 로컬과 CI 테스트를 어느 정도 맞춰줄 수 있다.

![Macos runner version](https://github.com/1ilsang/dev/assets/23524849/cd3eb08d-4dda-4f2a-992d-bdb6a552df27 'l')

> Runner [전체 목록 확인](https://github.com/actions/runner-images/tree/main?tab=readme-ov-file#available-images)

```yml
jobs:
  my-job:
    runs-on: macos-latest
```

Github에서 제공해주는 Actions Runner에 MacOS가 존재하기 때문에 로컬과 버전을 맞춰줄 수 있다.

완벽하다고 장담은 못하겠지만 현재까지는 로컬과 CI 테스트가 모두 동일하게 동작하며 통과하고 있다.

### Timezone

CI 테스트에서 가장 많이 실패하는 부분은 Timezone이다. 우리는 +9의 값을 가지고 있기 때문에 스냅샷 테스트에서 반드시 실패한다.

```yml
jobs:
  my-job:
    runs-on: macos-latest
    env:
      TZ: Asia/Seoul
```

깃헙 액션에서는 `env`로 타임존 값을 넘길수 있다. 이를 통해 편리하게 머신의 타임존을 변경할 수 있다.

playwright에서 어떤 브라우저를 선택하느냐에 따라 타임존 기준점이 조금 달라진다.

- 크롬의 경우 기본적으로 머신의 타임존을 따른다.
- Webkit은 config에 설정한 타임존을 따른다.

만약 playwright에서 webkit을 사용하고 있다면 아래와 같이 `playwright.config.ts`를 변경해야 한다.

```ts title="playwright.config.ts"
export default defineConfig({
  // ...
  use: {
    browserName: 'webkit',
    timezoneId: 'Asia/Seoul',
  },
});
```

### 테스트 분기

코드에 테스트로 인한 분기점이 생기는 것을 원하지 않지만 어쩔 수 없는 경우(혹은 편의로) 빌드를 나누어 코드에 적용할 수 있다.

```json title="package.json"
{
  "deploy-blog": "next build && next export",
  "e2e:build": "NEXT_PUBLIC_CI=true next build && next export"
}
```

e2e를 위한 빌드 스크립트를 만든 다음 환경변수를 주입해 코드에서 적용할 수 있다.

```tsx
useEffect(() => {
  if (process.env.NEXT_PUBLIC_CI) return;
```

### 1px

![1px bug](https://github.com/1ilsang/dev/assets/23524849/1a0e4366-15f4-418c-bf83-6851ce1ad507 'l')

크롬에서는 스크린샷이 1px 다른 경우가 있다([#18827](https://github.com/microsoft/playwright/issues/18827)).

이때는 clip으로 고정하거나 height를 강제하는 방법으로 처리할 수 있다.

### Image load

로드와 관련된 트러블 슈팅은 [테스트 속도](#테스트-속도)에서 다루었다.

## 마무리

시각적 회귀 테스트를 통해 심신의 안정을 많이 찾을 수 있었다.

이제 더욱 과감하게 리팩터링을 진행할 수 있게 되었다.

특히 playwright를 사용하며 경험이 좋았기 때문에 앞으로도 꾸준히 사용해 보고자 한다.

이 글을 쓰며 참고했던 혹은 유용했던 링크를 남기며 글을 마무리하려고 한다.

- [우아한형제들 디자인 시스템에 시각적 회귀 테스트 적용하기](https://techblog.woowahan.com/17081/)
- [UI 테스트를 위한 여정](https://tv.kakao.com/channel/3693125/cliplink/414129351)
