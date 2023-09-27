---
title: 'Renovate 간단하게 살펴보기'
description: '패키지 매니징을 자동화 해보자'
tags: ['renovate', 'packageManager', 'bot', 'dependency']
coverImage: 'https://user-images.githubusercontent.com/23524849/178150130-709cea99-255c-45a9-8d55-15e8d8a54e87.png'
date: '2022-07-02T05:01:36.129Z'
ogImage:
  url: 'https://user-images.githubusercontent.com/23524849/178150130-709cea99-255c-45a9-8d55-15e8d8a54e87.png'
---

<img class="cover" alt="cover" src="https://user-images.githubusercontent.com/23524849/178150130-709cea99-255c-45a9-8d55-15e8d8a54e87.png" />

이번에는 디펜던시를 자동으로 최신화 해주는 [Renovate](https://www.mend.io/free-developer-tools/renovate/)를 소개해보고자 한다.

## Index

- INTRO
- Renovate란?
- Renovate의 장점
- 적용 방법
- 마무리

## INTRO

<img width="1200" alt="image" src="https://user-images.githubusercontent.com/23524849/178150154-105e9a1f-c766-489f-9c54-895b3ffafa2e.png" />

리포지터리에서 위와 같은 노티를 봤을수도 있다. 혹여나 **_critical severity_**가 존재한다면 마음 한켠이 굉장히 불안해지기 시작한다. "그날이 왔구나" 생각하며 일정을 산정해 버전업 계획을 세우게 된다.

오래된 버전을 올리는것은 굉장히 고통스러운 작업을 동반한다.

노티로 알려주는 패키지에는 "종속성"에 포함되는 패키지도 있기 때문에 복잡하게 얽힌 의존 관계를 한땀한땀 쫓아가며 올려야 하는 패키지들을 수색하는 과정이 필요하다.

<img width="542" alt="image" src="https://user-images.githubusercontent.com/23524849/178151026-e9899fcb-e86d-427d-82c7-1e73efcb56fa.png">

만약 `minimist` 라는 라이브러리의 버전을 올려야 한다고 할 경우, 이 라이브러리를 종속성으로 가지고 있는 "실제로 설치된" 라이브러리를 `yarn.lock`과 같은 락파일에서 디펜던시 그래프를 찾아 올라가야 한다.

위의 예에서는 `detective` 패키지가 종속성을 가지고 있다. 하지만 `detective는` 설치한 적이 없기 때문에 `package.json`에 없다. 따라서 `detective` 라이브러리를 종속하고 있는 또 다른 라이브러리를 찾아 올라가야 한다.

이는 굉장히 고통스러운 과정이다.

의존성이 커지기 전에 조금씩 버전을 올렸다면 이런 문제는 없지 않았을까 생각하게 된다. Renovate를 통해 이 문제를 해결해 보자.

> 깃헙의 공식 툴인 [dependabot 과의 차이점](https://www.libhunt.com/compare-renovate-vs-dependabot-core)도 향후 작성해볼 예정이다. [레딧에서 다양한 의견](https://www.reddit.com/r/reactjs/comments/us666i/how_do_you_keep_up_with_npm_package_updates/)을 볼 수 있다.

## Renovate란?

<img width="853" alt="image" src="https://user-images.githubusercontent.com/23524849/178150238-904bb1aa-6afd-4001-b721-9e8fe79152e9.png ">

[Renovate](https://www.mend.io/free-developer-tools/renovate/)는 자동으로 디펜던시를 업데이트 해주는 봇이다.

리포지터리의 패키지 관리자 파일을 확인하고 업데이트가 필요한 종속성을 발견하면 Pull Request 를 자동으로 해준다.

## Renovate의 장점

- [MIT license](https://github.com/renovatebot/renovate/blob/main/license) / [오픈소스](https://github.com/renovatebot)
- [간단한 봇 설치](https://github.com/apps/renovate) 및 유지보수가 필요하지 않다.
  - 리포지터리의 디펜던시에 renovate가 추가되지 않는다는 큰 장점이 있다(레포와 완전히 별개로 동작).
- 풍부한 json 봇 동작 설정.
- PR 자동 생성 + 릴리즈 노트.
- monorepo 지원.

<img width="936" alt="image" src="https://user-images.githubusercontent.com/23524849/178150834-e7f7c450-8c20-40fa-b7d4-e6f95ba39e5b.png">

Renovate를 적용하면 [PR](https://github.com/1ilsang/dev/pull/5)이 생성된다.

PR을 확인해보면 아래와 같은 특징을 찾아볼 수 있다.

1. 캐럿 -> PIN 버전으로 변경되었다.
   - 버전을 특정하고 이후의 버전은 새로운 PR로 생성된다.
2. 릴리즈 노트를 제공한다.
   - 현재 버전과 타겟 버전 사이의 추가 내역을 제공해주기 때문에 로그를 명시적으로 확인할 수 있다.
3. Compare Source를 제공합니다.
   - 라이브러리 코드의 어디가 바뀌었는지 정확히 알 수 있다.
   - 덤으로 메인테이너의 코드 리뷰나 discussion도 눈팅할수 있다.
4. PR이므로 DroneCI 및 actions와 조합해 2중 검증을 할 수 있다.

그 외에도 main 브랜치에 다른 브랜치가 merge되어 rebase가 필요할 경우 토글 버튼만으로 처리할수 있다.

```json
{
  "extends": ["config:base"],
  // PR의 기본 라벨 설정
  "labels": ["renovate", "translate"],
  "packageRules": [
    {
      // 타입패키지들은 major업데이트가 아닌 이상 자동 merge
      "packagePatterns": ["^@types/"],
      "automerge": true,
      // automerge시 comment를 설정할 수 있다.
      "automergeType": "pr-comment",
      "automergeComment": "types: auto merge",
      "major": {
        "automerge": false
      }
    },
    {
      // lint 관련 패키지들은 하나의 PR로 생성하도록 설정
      "groupName": "lints",
      "matchPackagePatterns": ["^eslint", "^prettier", "^markdownlint"],
      "labels": ["lint"]
    }
  ]
}
```

또한 JSON 설정을 통해 auto merge, label, semver 범위 지정, [PR 스케줄 설정](https://docs.renovatebot.com/configuration-options/#schedule), **최대 PR 개수 설정(기본 10개)** 등의 옵션을 설정할수 있다.

- [공식문서 보기](https://docs.renovatebot.com/configuration-options/)

## 적용 방법

적용방법은 상당히 간단하다. 봇을 설치해주면 사실상 끝이다.

1. Renovate app을 설치한다.

[Renovate app](https://github.com/apps/renovate) 봇을 설치한다.

<img width="561" alt="image" src="https://user-images.githubusercontent.com/23524849/178151852-a2ff9737-7a8d-4b96-b3cb-2a78252183cf.png">

그후 설치 페이지로 진입해서 봇을 추가할 리포지터리를 선택한다.

2. Renovate PR을 merge 한다.

앱을 레포에 등록하면 [자동으로 PR이 생성](https://github.com/1ilsang/dev/pull/2)된다. 해당 PR을 머지한다.

3. PR 확인 및 renovate.json 설정

이제 앞에서 본것과 같이 업데이트가 필요한 라이브러리의 PR이 자동으로 생성된다. 기본 값은 10개이기 때문에 renovate.json 값을 수정해 원하는 방식으로 조정할 수 있다.

## 마무리

<img width="516" alt="image" src="https://user-images.githubusercontent.com/23524849/178150102-0f406661-fc1e-44c5-9c20-532734d14f8a.png">

그동안 디펜던시는 "기간 잡아서 한방에 처리하자"로 남겨두고 있었다.

그렇기 때문에 정말 특정한 이슈가 없는 이상 버전 올릴 생각을 잘 하지 않게 되었고, 그 결과 수많은 Breaking change를 만나며 고생했던 기억이 있다.

무엇보다 "**사용하고 있는 라이브러리의 최신 근황**"에 대해 궁금해 하지 않았던 점도 한몫 했다.

이제, Renovate가 제공해주는 지속되는 PR을 통해 놓치지 않고 새로운 버전을 쫓아갈 수 있을거라 생각하고 있다. 또한 changeLog 및 sourceCompare를 통해 각 라이브러리의 근황도 자연스럽게 알게 될거라 기대하고 있다.

그럼 이만!
