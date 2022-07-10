---
title: "Renovate 간단하게 살펴보기"
description: "패키지 매니징을 자동화 해보자"
tags: ["renovate", "packageManager", "bot", "dependency"]
coverImage: "https://user-images.githubusercontent.com/23524849/178150130-709cea99-255c-45a9-8d55-15e8d8a54e87.png"
date: "2022-07-02T05:01:36.129Z"
ogImage:
  url: "https://user-images.githubusercontent.com/23524849/178150130-709cea99-255c-45a9-8d55-15e8d8a54e87.png"
---

<img width="500" src="https://user-images.githubusercontent.com/23524849/178150130-709cea99-255c-45a9-8d55-15e8d8a54e87.png" alt="renovate">

이번에는 디펜던시를 자동으로 최신화 해주는 [Renovate](https://www.mend.io/free-developer-tools/renovate/)에 대해 다뤄보겠습니다.

## Index

- INTRO
- Renovate란?
- Renovate의 장점
- 적용 방법
- 마무리

## INTRO

<img width="1200" alt="image" src="https://user-images.githubusercontent.com/23524849/178150154-105e9a1f-c766-489f-9c54-895b3ffafa2e.png">

리포지터리에서 위와 같은 노티를 많이 보셨을텐데요, 혹여나 **_critical severity_**가 존재한다면 마음 한켠이 굉장히 불안해지기 시작합니다. "그날이 왔구나" 생각하며 일정을 산정해 버전업 계획을 세우게 됩니다.

오래된 버전을 올리는것은 굉장히 고통스러운 작업을 동반합니다.

노티로 알려주는 패키지는 "종속성"에 포함되는 패키지도 있습니다. 따라서 복잡하게 얽힌 관계를 한땀한땀 쫓아가며 올려야 하는 패키지들을 수색하는 과정이 필요합니다.

의존성이 커지기 전에 조금씩 버전을 올렸다면 이런 문제는 없지 않았을까 생각했었는데요, Renovate를 통해 어느정도 도움을 받을수 있다고 생각해 공유드리려고 합니다.

## Renovate란?

<img width="853" alt="image" src="https://user-images.githubusercontent.com/23524849/178150238-904bb1aa-6afd-4001-b721-9e8fe79152e9.png ">

[Renovate](https://www.mend.io/free-developer-tools/renovate/)는 자동으로 디펜던시를 업데이트 해주는 봇입니다.

리포지터리의 패키지 관리자 파일을 확인하고 업데이트가 필요한 종속성을 발견하면 Pull Request 를 자동으로 해줍니다.

## Renovate의 장점

- [MIT license](https://github.com/renovatebot/renovate/blob/main/license) / [오픈소스](https://github.com/renovatebot)
- [간단한 봇 설치](https://github.com/apps/renovate) 및 유지보수가 필요하지 않다
  - 리포지터리의 디펜던시에 renovate가 추가되지 않는다는 큰 장점이 있다(레포와 완전히 별개로 동작).
- 풍부한 json 봇 동작 설정
- PR 자동 생성 + 릴리즈 노트
- monorepo 지원

Renovate를 적용하면 PR이 생성됩니다.

PR을 확인해보면 아래와 같은 특징을 찾아보실 수 있습니다.

1. 캐럿 -> PIN 버전으로 변경되었습니다.
   - 버전을 특정하고 이후의 버전은 새로운 PR로 생성됩니다.
2. 릴리즈 노트를 제공합니다.
   - 현재 버전과 타겟 버전 사이의 추가 내역 제공해주기 때문에 로그를 명시적으로 확인할 수 있습니다.
3. Compare Source를 제공합니다.
   - 라이브러리 코드의 어디가 바뀌었는지 정확히 알 수 있습니다.
4. PR이므로 DroneCI 및 actions와 조합해 2중 검증을 할 수 있습니다.

그 외에도 main 브랜치에 다른 브랜치가 merge되어 rebase가 필요할 경우 토글 버튼만으로 처리할수 있습니다.

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
      // automerge시 comment를 설정할 수 있습니다.
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

또한 JSON 설정을 통해 auto merge, label, semver 범위 지정, [PR 스케줄 설정](https://docs.renovatebot.com/configuration-options/#schedule), **최대 PR 개수 설정(기본 10개)** 등의 옵션을 설정할수 있습니다.

- [공식문서 보기](https://docs.renovatebot.com/configuration-options/)

## 적용 방법

TBD

## 마무리

<img width="516" alt="image" src="https://user-images.githubusercontent.com/23524849/178150102-0f406661-fc1e-44c5-9c20-532734d14f8a.png">

그동안 디펜던시는 "기간 잡아서 한방에 처리하자"로 남겨두고 있었습니다.

그렇기 때문에 정말 특정한 이슈가 없는 이상 버전 올릴 생각을 잘 하지 않게 되었고, 그 결과 수많은 Breaking change를 만나며 고생했던 기억이 있습니다. 무엇보다 "**사용하고 있는 라이브러리의 최신 근황**"에 대해 궁금해 하지 않았던 점도 한몫 했습니다.

이제, Renovate가 제공해주는 지속되는 PR을 통해 놓치지 않고 새로운 버전을 쫓아갈 수 있을거라 생각하고 있습니다. 또한 changeLog 및 sourceCompare를 통해 각 라이브러리의 근황도 자연스럽게 알게 될거라 기대하고 있습니다.

그럼 이만!
