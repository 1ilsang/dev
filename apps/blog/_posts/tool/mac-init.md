---
title: '웹 개발자를 위한 Mac 개발 도구 추천 리스트'
description: '유용한 맥 앱에서 VSCode 및 크롬 익스텐션까지'
tags: ['mac', 'settings', 'extensions']
coverImage: 'https://github.com/1ilsang/dev/assets/23524849/dbe32093-4f4b-4f4b-aa2c-a2b8574d85a0'
date: '2023-12-24T03:54:08.256Z'
ogImage:
  url: 'https://github.com/1ilsang/dev/assets/23524849/dbe32093-4f4b-4f4b-aa2c-a2b8574d85a0'
---

<img class="cover" alt="cover" src="https://github.com/1ilsang/dev/assets/23524849/dbe32093-4f4b-4f4b-aa2c-a2b8574d85a0" />

최근 기기 변경을 하면서 맥 세팅을 처음부터 할 일이 있었다. 그때 꽤 고생한 기억이 있어 이번 기회에 유용했던 것들을 한번 정리해 보려고 한다.

리스트를 만들고 나니 꽤나 많아서 조금 당황했지만 설정해 놓으면 패시브적으로 동작하는 것들 위주기 때문에 다 외우고 있지 않아도 된다.

추천 리스트는 3가지로 분류되어 있다.

1. 맥 앱
2. VSCode 익스텐션
3. 크롬 익스텐션

웹 개발자의 가장 보편적인 환경이라 생각하고 필자도 위와 같이 작업하고 있기 때문에 크게 3가지로 분류했다. 직접 사용하면서 유용했던 것들을 모아놓았기 때문에 안정성 문제는 없을 것으로 생각된다.

## 모아보기

- [Mac Apps](#mac-apps)
  - [Chrome](#chrome)
  - [Homebrew](#homebrew)
- [VSCode Extensions](#vscode-extensions)
- [Chrome Extensions](#chrome-extensions)

## Mac Apps

### Chrome

![chrome-cover](https://github.com/1ilsang/dev/assets/23524849/958e465c-dd1e-4693-ac79-67400c6441dc)

소개 문구에서부터 포스가 장난 아니다. 테스팅 환경 때문이라도 필요한 웹 브라우저 크롬이다.

글 말미에 정리된 [크롬 익스텐션 섹션](#chrome-extensions)을 통해 크롬이 얼마나 강력한지 후술하고자 한다.

- [만약 크롬이 실행 되지 않는다면](https://support.google.com/chrome/thread/64580550?hl=ko&msgid=68816629)

> [다운로드 링크](https://www.google.com/chrome)

### Homebrew

![homebrew](https://github.com/1ilsang/dev/assets/23524849/4135c0aa-fe1c-49db-aee1-a72b88cfeea6)

`homebrew`는 CLI로 편리하게 앱을 설치할 수 있게 해준다.

환경변수 및 패키지 폴더 구성 등을 자동으로 해주기 때문에 불쾌한 초기 설정을 벗어나게 해준다.

많은 프로젝트에서 homebrew를 통한 설치 가이드를 제공하고 있을 정도로 대중적이니 꼭 설치하자.

```sh
# 터미널 설치
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

> [다운로드 링크](https://brew.sh/)

### Oh Ny Zsh

![cmd-example](https://github.com/1ilsang/dev/assets/23524849/44e5939d-e8bd-40ec-90bb-fae3e106443d)

brew로 작업하다 보면 터미널이 참 못생겼다고 느낄 수 있다. 터미널을 위와 같이 원하는 정보가 노출되도록 설정할 수 있다.

내가 사용하고 있는 테마는 [bullet-train](https://github.com/caiogondim/bullet-train.zsh) 커스텀 테마이다. 해당 테마는 현재 시간 및 작업 소요 시간, 성공 여부, 깃 상태 등 다양한 정보를 노출시켜 주므로 선택하게 되었다.

```sh
# 터미널 설치
$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

> [다운로드 링크](https://ohmyz.sh/#install)

### Iterm2

![iterm2-example](https://github.com/1ilsang/dev/assets/23524849/7b6b295f-ec11-4da8-bade-c475009b5ca4)

기본 맥 터미널은 못생겼기 때문에 `iterm2`을 설치해 터미널을 더 예쁘게 커스텀 할 수 있다.

`zsh`이 터미널의 내용을 관리한다면 터미널 창 자체로 디자인을 제공해 주는 역할은 `iterm2`이다.

> 만약 커맨드라인에서 cmd + delete로 [한줄 삭제](https://stackoverflow.com/questions/15733312/iterm2-delete-line) 하고 싶다면
>
> 환경 설정 > Profiles > Keys > Natural Text Editing으로 설정 한다.

이 외에도 각 탭에서 창 기본 크기, 배경 설정 등 할 수 있다.

> [다운로드 링크](https://iterm2.com/)

### VSCode

![vscode-logo](https://github.com/1ilsang/dev/assets/23524849/6e0c8145-53ab-4d40-9f97-edaf9d54ba91)

VSCode에 너무 절여져 있어 다른 에디터는 이제 기억이 나지 않는다... 유용한 [익스텐션은 후술](#vscode-extensions)하겠다.

> [다운로드 링크](https://code.visualstudio.com/)

### NeoVim

만약 vi 환경을 좋아한다면 설치하면 좋다. 기본적으로 `vim`은 한글 입력시 문제가 많다(조합 중인 문자 소실 등).

`NeoVim`은 `vim`을 오픈소스화하여 기존의 문제들 해결하고 커뮤니티 자발적으로 다양한 플러그인을 개발/공유하고 있어 강력한 에디팅을 지원한다.

```sh
$ brew install neovim
# 기본 vi를 neovim으로 변경하고자 한다면 alias를 변경한다.
$ vi ~/.zshrc
$ alias vi="nvim"
```

> [다운로드 링크](https://neovim.io/)

### D2 Coding

폰트는 d2 코딩이 가장 편하다고 느껴서 늘 사용하고 있다.

모호할 수 있는 문자들이 `1ijIlO0tz아야저져쁆뼮뼯뗾` 기본적으로 잘 보인다(이 블로그 폰트도 D2coding이다).

#### iterm2에 d2coding을 기본 폰트로 적용하기

> Profiles > Text > Font > D2Coding
>
> [그림으로 보기](https://github.com/1ilsang/dev/assets/23524849/a3aff63a-d3d7-43aa-84c1-68b10d46dadd)

#### VSCode 기본 폰트로 적용하기

> Setting(cmd + ,) > Font Family > D2Coding을 제일 앞에 적어준다.
>
> [그림으로 보기](https://github.com/1ilsang/dev/assets/23524849/1eeb1e90-6a2c-4263-a8a4-f6a9ea860f98)

상당히 개발자 친화적인 폰트라 생각한다.

> [다운로드 링크](https://github.com/naver/d2codingfont)

### Node.js

"신"

> [다운로드 링크](https://nodejs.org/en)

### NVM

프로젝트를 여러개 만들다 보면 노드 버전이 상이한 경우가 종종 생긴다. 이때 노드 버전을 어떻게 처리할까?

답은 `nvm`을 통해 노드 버전을 프로젝트마다 변경하면 된다.

```sh
# Nvm 다운로드.
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# 터미널 실행시 자동으로 nvm을 사용하도록 설정.
$ vi ~/.zshrc
# 아래 내용을 zshrc 아무곳에 붙여넣는다.
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
# 쉘 반영
$ source ~/.zshrc
```

사용법은 아래와 같다.

```sh
# .nvmrc 파일이 존재하면 지정된 노드 버전으로 설정됨.
$ nvm use
# Node.js 20.10.0 버전 다운로드.
$ nvm install 20.10.0
# Node.js 20.10.0 버전 사용.
$ nvm use 20.10.0
```

> [가이드 링크](https://github.com/nvm-sh/nvm/blob/master/README.md)

### Docker

두 번째 "신"

> [다운로드 링크](https://www.docker.com/)

### Calculator Pro

<div class="img-horizon-wrap">
 <img alt="calculator pro example" src="https://github.com/1ilsang/dev/assets/23524849/c3087f57-54bd-40ce-9dc5-2fa66278711f" />
 <img alt="settings" src="https://github.com/1ilsang/dev/assets/23524849/a72af6a5-be29-469b-acc1-9b0baac2f328" />
</div>

맥 환경 특성상 전체화면 된 앱 위에 무엇을 겹치는 것이 불가능하다. 하지만 이 앱은 계산기를 전체화면 된 앱 위에 올려준다.

알고리즘 풀 때 진짜 꿀이다.

오른쪽 화면은 내가 쓰는 글로벌 숏컷이다. 껐다켰다하며 사용하기 편하다.

> [다운로드 링크](https://apps.apple.com/kr/app/calculator-pro-topbar-app/id576215086)

### GIPHY Capture

간단하게 움짤(gif)을 따야 할 때 유용하게 쓸 수 있다.

> [다운로드 링크](https://apps.apple.com/kr/app/giphy-capture-the-gif-maker/id668208984)

### DeepL

번역 퀄리티가 상당히 좋다. 또한 `cmd + c + c`로 빠르게 번역하기도 지원하기 때문에 숏컷 활용도 또한 뛰어나다.

이후 다룰 크롬 익스텐션과 함께 사용하면 찰떡이다.

> [다운로드 링크](https://www.deepl.com/ko/app/)
