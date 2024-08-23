---
title: '[Next.js] Google AdSense 광고 적용 및 이해하기'
description: '구글 광고 적용기'
url: 'google-adsense'
tags: ['google', 'ad', 'ads', 'adsense', 'nextjs']
coverImage: '/images/posts/google-adsense/cover.webp'
date: '2024-08-22T07:26:38.617Z'
ogImage:
  url: '/images/posts/google-adsense/cover.webp'
---

![cover](/images/posts/google-adsense/cover.webp 'cover')

[Google AdSense](https://adsense.google.com/intl/ko_kr/start/)를 적용한 내용을 정리해 보려고 한다.

## Index

- [Index](#index)
- [AdSense 적용 결과](#adsense-적용-결과)
- [Google Ads, AdSense 차이](#google-ads-adsense-차이)
- [AdSense 설정하기](#adsense-설정하기)
  - [사이트 등록](#사이트-등록)
  - [광고 컴포넌트 적용](#광고-컴포넌트-적용)
  - [사이트 소유권 확인](#사이트-소유권-확인)
  - [광고 컴포넌트 영역 설정](#광고-컴포넌트-영역-설정)
    - [사이트 기준](#사이트-기준)
    - [광고 단위 기준](#광고-단위-기준)
  - [지급 정보 설정](#지급-정보-설정)
- [수익 구조](#수익-구조)
- [마무리](#마무리)

## AdSense 적용 결과

<div class="img-horizon-wrap">

<img alt="ad-bottom-mobile" src="/images/posts/google-adsense/ad-bottom-mobile.webp" />
<img alt="ad-left-rail-desktop" src="/images/posts/google-adsense/ad-left-rail-desktop.webp" />

</div>

모바일 화면에서는 바텀 앵커 영역, 데스크탑 화면에서는 좌측 레일 부분에 광고를 실었다(현재는 제거).

광고 컴포넌트 영역은 구글이 자동으로 설정하게 할 수도 있고 직접 특정 영역만 설정할 수 있다.

이 부분들은 아래에서 자세히 다루겠다.

## Google Ads, AdSense 차이

맨 처음 광고를 달고자 마음먹으면 곧바로 광고 도메인과 관련된 다양한 키워드에 혼란을 느끼게 된다.

구글 공식 문서에 따른 [Google AdSense와 Ads의 차이점](https://support.google.com/adsense/answer/76231)은 광고 게시자인지 광고주인지에 따라 다르게 선택할 수 있는 플랫폼임을 알려주고 있다.

우리는 광고 게시자에 해당하기 때문에 AdSense를 적용해야 한다.

## AdSense 설정하기

### 사이트 등록

![site register](/images/posts/google-adsense/site-register.webp 'l')

맨 처음 해야 할 일은 [AdSense에 광고를 실을 사이트를 등록](https://www.google.com/adsense)하는 것이다.

<u>사이트 등록 후 광고 스크립트 한줄만 사이트에 추가하면 사실상의 모든 과정이 끝난다(!).</u>

하지만 구글 애드센스를 적용하기 위해선 사이트 심사를 통과해야 한다. 심사 기간은 최대 2주 정도가 소요되며 사이트의 컨텐츠가 갖추어지지 않으면 거절될 수 있다.

관련 내용을 살펴보니 [설정된 페이지가 주기적으로 조회되지 않으면 심사가 최대 6주까지도 소요](https://support.google.com/adsense/thread/206913501/%EC%82%AC%EC%9D%B4%ED%8A%B8%EC%9D%98-%EA%B4%91%EA%B3%A0%EA%B2%8C%EC%9E%AC-%EC%8B%AC%EC%82%AC-%EA%B8%B0%EA%B0%84?hl=ko)된다고 한다.

하지만 큰 문제가 없다면 하루 내로 심사가 통과되는 듯하며 이 블로그 또한 하루 내에 심사가 통과되었다.

사이트 등록을 했다면 광고 스크립트를 적용해 보자.

### 광고 컴포넌트 적용

![ad script register](/images/posts/google-adsense/ad-script-register.webp)

사이트 심사 및 소유주 확인을 위해 원하는 확인 방법을 선택해 적용하면 된다.

여기 UI가 이상한데, <u>3개 중 하나를 적용하는 게 아니다.</u>

`애드센스 코드 스니펫` 혹은 `메타 태그`로 사이트 심사를 받고 `Ads.txt`로 소유주 확인을 해야 한다.

죽, 애드센스 코드 스니펫 혹은 메타 태그 + `Ads.txt` 2가지를 적용해야 한다.

`Ads.txt`는 아래 [사이트 소유권 확인](#사이트-소유권-확인)에서 다루겠다. 지금은 넘어가도 된다.

나는 애드센스 코드 스니펫을 적용했다.

```tsx {10}
import Script from 'next/script';

export const GoogleAdSense: FunctionComponent = () => {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${PID}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
};
```

`production`에서만 적용되어야 하므로 분기 처리하고 애드센스 코드를 그대로 심어준다. Script strategy 및 자세한 내용은 [여기](https://nextjs.org/docs/pages/building-your-application/optimizing/scripts)를 참고.

```tsx {5} title="app/layout.tsx"
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <GoogleAdSense />
    </html>
  );
}
```

그 후 앱의 최상단 레이아웃에 컴포넌트를 추가해 주면 끝난다.

이제 사이트 심사가 통과될 때까지 기다리면 된다.

### 사이트 소유권 확인

![ads text](/images/posts/google-adsense/ads-text.webp)

심사를 무사히 통과했다면 소유권을 인증해야 한다. `ads.txt`를 설정하라고 알려준다.

```txt title="public/ads.txt"
google.com, pub-ID, DIRECT, HASH_CODE
```

`public/ads.txt`를 생성하고 `ads.txt` 스니펫을 추가한다.

이후 구글봇이 돌면서 추가내역을 확인하게 된다.

### 광고 컴포넌트 영역 설정

이제 가장 중요한 광고 컴포넌트 영역을 설정해야 한다.

<div class="flex">

![auto](/images/posts/google-adsense/ad-example.webp 'l')

![direct](/images/posts/google-adsense/direct-ad.webp)

</div>

> (좌) 사이트 기준 자동 삽입 / (우) 광고 단위 기준 직접 설정

홈의 광고 탭으로 들어오면 컴포넌트 설정을 할 수 있다. 광고 컴포넌트는 `사이트 기준` 자동 삽입 혹은 직접 `광고 단위 기준`으로 추가할 수 있다.

- 사이트 기준
  - AdSense 스크립트가 자동으로 페이지 내부에 광고를 삽입
- 광고 단위 기준
  - 광고 크기 및 위치를 직접 설정

#### 사이트 기준

![ad-exclusive-area](/images/posts/google-adsense/ad-exclusive-area.webp)

사이트 기준으로 할 경우 오버레이, 인페이지 등에서 광고 추가 여부를 UI로 확인/선택할 수 있다.

광고가 기재되길 원하지 않는다면 영역을 제외하거나 페이지 자체를 추가할 수 있다.

#### 광고 단위 기준

![ad-target](/images/posts/google-adsense/ad-target.webp 'l')

원하는 광고 단위를 선택후 만들면 자동으로 HTML이 생성된다.

```tsx
declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export const GoogleAdSenseComponent = () => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      class="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="PID"
      data-ad-slot="SLOT_KEY"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};
```

이제 원하는 위치에 컴포넌트를 배치하면 된다.

### 지급 정보 설정

가장 중요한 지급 정보(계좌, SWIFT 코드 등)는 $100 이상 되어야 입력할 수 있다(-\_-).

따라서 주기적으로 광고 실적을 확인해볼 필요성이 있다.

## 수익 구조

![profit structure](/images/posts/google-adsense/profit-structure.webp 'l')

[애드센스 작동 원리](https://support.google.com/adsense/answer/6242051?hl=ko)에 따르면 우리가 설정한 광고 컴포넌트에 입찰가가 가장 높은 광고를 기준으로 게재된다고 한다.

이때 수익 배분은 [사용 중인 제품](https://support.google.com/adsense/answer/180195?hl=ko)에 따라 달라지는데 콘텐츠 광고는 게시자가 68%의 수익 지분을 가진다.

## 마무리

이로써 AdSense 사용법을 간단하게 살펴봤다. 사용성이 좋기 때문에 특별히 어려운 부분은 없었다.

이후 사이드 프로젝트에 꼭 적용해 보길 기원하면서 글을 마무리해본다.
