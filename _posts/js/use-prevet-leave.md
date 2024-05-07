---
title: '페이지 이탈시 확인 컨펌창 만들기'
description: 'usePreventLeave를 알아보자'
url: 'use-prevent-leave'
tags: ['usePreventLeave', 'beforeunload', 'popstate', 'popup']
coverImage: 'https://github.com/1ilsang/dev/assets/23524849/bf2cd78f-1d32-4d08-9fc7-1eb326a35288'
date: '2023-03-12T06:14:32.600Z'
ogImage:
  url: 'https://github.com/1ilsang/dev/assets/23524849/bf2cd78f-1d32-4d08-9fc7-1eb326a35288'
---

유저가 페이지 이탈시 확인 컴펌을 받는 로직이 필요하게 되었고 이에 대한 고민을 공유해 보려고 한다.

페이지 이탈은 아래와 같은 세가지 방법이 있다고 생각한다.

1. 브라우저 닫기
2. 페이지 새로고침
3. 페이지 이동(e.g, 앞/뒤/URL직접입력 등)

나는 위의 세 가지 경우 모두를 확인하는 컨펌창을 만들어야 했다.

모든 경우 `beforeunload` 이벤트를 통해 막아줄수 있기 때문에 간편하게 작업할수 있을것이라 예상했으나, 실제로 작업해보니 3번 페이지 이동간에 이벤트가 발생하지 않아 애를 먹었다.

정확히는 **동일한 도메인에서 서브패스가 달라졌을때만 이벤트가 발생하지 않았다**(e.g., domain.com/dev -> domain.com/1ilsang). 작업하던 웹앱은 `react-router-dom`을 사용하는 SPA 였기에 해당 문제가 [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)와 연관되어 있다고 생각하고 서치를 시작했고, 예상대로 이벤트의 기대 동작과 실제 동작이 달라서 일어난 일이었다.

![flow-chart](https://github.com/1ilsang/dev/assets/23524849/3594b04d-a60f-4edb-9aad-1fbef82245b1 'l')

> [자세히 보기](https://developer.chrome.com/docs/web-platform/page-lifecycle-api?hl=ko)

`beforeunload` 이벤트는 '페이지'간 이동에서 발생하기 때문에 단일 페이지 환경인 SPA에서는 새로운 페이지를 로딩하지 않았기 때문에 당연하게도 이벤트가 발생하지 않는다.

참고로 beforeunload 이벤트가 언제 발생하는지는 위의 브라우저 라이프사이클 이미지를 확인하면 된다.

- f. 다른 페이지로 이동
- g. 활성화된 탭 끄기
- h. 비활성화된 탭 끄기

위 내용을 문장으로 한번 더 풀자면, beforeunload 이벤트는 브라우저 닫기(g,h), 페이지 이동(f), 새로고침(f - 새로 고침도 동일한 페이지로의 '이동'에 해당한다)시 발생하는 이벤트이다.

다만, **SPA의 경우 실제로 브라우저가 리렌더링 되는것이 아니므로 [라우터 이동시 beforeunload 이벤트가 발생하지 않는다](https://github.com/vercel/next.js/issues/2694#issuecomment-344533432).**

이 경우 때문에 SPA 환경에서 3번 페이지 이동을 막아주기 위해서는 History API를 직접 수정해 `popstate` 이벤트로 막아줄수 있다.

따라서 먼저 beforeunload 이벤트로 처리하는 방식을 작성한 다음, SPA 환경을 위한 popstate 처리를 써보려고 한다.

## beforeunload로 페이지 이탈 방지하기

![prevent](https://github.com/1ilsang/dev/assets/23524849/bf2cd78f-1d32-4d08-9fc7-1eb326a35288 's')

beforeunload 이벤트를 통해 페이지 이동을 감지할 경우 브라우저에서 기본 컨펌창을 제공해 주는데, 크롬 기준 컨펌창은 위의 이미지와 같다.

```tsx
const handleBeforeUnload = (event: Event) => {
  event.preventDefault();
  event.returnValue = false; // Chrome requires returnValue to be set.
};
window.addEventListener('beforeunload', handleBeforeUnload);
```

코드로 작성하면 위와 같다. 이동을 막아줄 path에서 beforeunload 이벤트를 수신하고, `event.preventDefault()`를 통해 이벤트의 진행을 막아준다. 이를 통해 페이지를 떠나기전 이벤트가 멈추게 된다.

이전에는 `returnValue`로 설정해준 값이 컨펌창에 노출되었지만, 노이즈가 너무 강해(님 진짜 진자 나갈거임? 아 나가지마셈..!! 등의 텍스트) 현재는 브라우저에서 기본 텍스트만 노출하도록 변경되었다.

크롬의 경우 `returnValue` 값이 필요하므로 추가해주어야 브라우저 컨펌창이 노출된다. 또한 크롬의 경우 [유저의 명시적 액션](https://developer.mozilla.org/en-US/docs/Web/Security/User_activation)이 있어야만 이벤트가 정상적으로 발생한다.

위의 내용은 MDN [beforeunload_event#compatibility_notes](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event#compatibility_notes)에서 자세하게 확인할수 있다.

![error](https://github.com/1ilsang/dev/assets/23524849/b95db747-a90d-4542-b2af-6a075fdd348a 'l')

beforeunload 이벤트로 작업하다보면 위와같은 에러를 만날수 있는데, 이는 앞서 말한 유저의 명시적 액션(e.g, mousedown)이 없었기 때문에 발생하는 에러이다.

이제 이 코드를 리액트로 옮겨보자.

```tsx
const usePreventLeave = (global = false) => {
  const handleBeforeUnload = (event: Event) => {
    event.preventDefault();
    event.returnValue = false; // Chrome requires returnValue to be set.
  };
  const onPreventLeave = () => {
    window.addEventListener('beforeunload', handleBeforeUnload);
  };
  const offPreventLeave = () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };

  // 만약 페이지 전체에 적용할 경우 global을 true로 입력해 window에 적용하면 된다.
  // 단일 요소(e.g., HTMLInputElement)에 별개로 적용할 경우 on/off PreventLeave 이벤트를 사용한다.
  useEffect(() => {
    if (!global) return;
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [global]);

  return {
    onPreventLeave,
    offPreventLeave,
  };
};

const MyApp: FunctionComponent = () => {
  // CASE 1. 페이지 자체에 이벤트 적용(글로벌 적용)
  // usePreventLeave(true);

  // CASE 2. 특정 요소가 변경될 경우 감지후 방지 이벤트 적용(e.g., form)
  const { onPreventLeave, offPreventLeave } = usePreventLeave();
  const [changed, setChanged] = useState(false);

  const handleInputChange = () => setChanged(true);
  const handleClearClick = () => setChanged(false);

  useEffect(() => {
    const fn = changed ? onPreventLeave : offPreventLeave;
    fn();
    return () => {
      offPreventLeave();
    };
  }, [changed]);

  return (
    <div>
      <input type="text" onChange={handleInputChange} />
      <button onClick={handleClearClick}>clear</button>
      <h1>{changed ? 'changed' : 'none'}</h1>
    </div>
  );
};
```

위의 `usePreventLeave` 훅에서는 두 가지 방식으로 `beforeunload` 이벤트를 사용하도록 제공하고 있다. 만약 global 값을 true로 넘겨줄 경우 전역에 beforeunload 이벤트를 설정해 컨펌창이 무조건 노출되도록 하지만(물론 앞서 이야기 했듯 유저의 인터랙션이 먼저 있어야 한다) 특정 분기(input 태그의 변화)에 맞춰 컨펌창을 띄우고 싶을 경우 `onPreventLeave` 메서드와 `offPreventLeave` 메서드를 적절하게 사용하여 이벤트를 바인딩 해줄수 있다.

## SPA에서 페이지 이탈 방지하기

기본적으로 SPA는 페이지간 이동이 일어나지 않기 때문에 우리는 history stack의 변경사항을 추적해야한다. 애석하게도 브라우저는 앞/뒤 이동일 때에만 `popstate` 이벤트가 발생하기 때문에 `pushState`로 URL을 변경할 경우 이벤트가 발생하지 않아 추적할수 없게 된다.

이 때문에 Remix-run에서 만든 [history 라이브러리](https://www.npmjs.com/package/history)를 사용해 세션 history를 추적해 처리하거나 `popstate` 이벤트 발생 및 라우터 이동이 있는 컴포넌트 클릭시 컨펌창을 노출하는 작업을 할 수 있다.

나는 후자의 길을 선택했는데, 추후 보게 되겠지만 이 경우 페이지에서 라우터 이동이 있는 모든 컴포넌트 클릭에 prevent를 설정해 주어야 하므로 조금 아쉽다.

```tsx
const usePreventLeave = (global = false) => {
  // 앞의 beforeunload 이벤트 코드는 생략하였다. beforeunload 이벤트 코드도 추가해 주어야 모든 상황에서 대처 가능해진다.
  const [prevent, setPrevent] = useState(false);

  useEffect(() => {
    if (!global) return;

    // 현재 페이지를 push하여 의도적으로 스택을 만든다. 이로써 뒤로가기시 현재 페이지가 다시 노출되며 팝업이 보이게 된다.
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [global]);

  // 특정 컴포넌트가 변경되었을 때에 이벤트를 적용하고 싶다면 beforeunload와 동일하게 처리해준다.
  const onPreventLeave = () => {
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopstate);
  };
  const offPreventLeave = () => {
    window.removeEventListener("popstate", handlePopstate);
  };

  // popstate 이벤트 발생시 팝업 노출을 위해 상태값을 변경한다.
  const handlePopstate = () => setPrevent(true);
  const handlePopupClose = () => {
    window.history.pushState(null, "", window.location.href);
    setPrevent(false);
  };
  const handlePopupLeave = (onLeave: () => void) => {
    setPrevent(false);
    onLeave();
  };
  // preventLeave 함수를 외부로 return하여 컨펌창을 의도적으로 띄울수 있도록 한다.
  const preventLeave = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setPrevent(true);
  };

  const PreventPopup: FunctionComponent<{ onLeave: () => void }> = ({
    onLeave,
  }) => (
    <>
      {/* popstate 이벤트에 따라 prevent 상태값이 변경되면 컨펌창이 노출된다 */}
      {prevent && (
        <div>
          <h1>페이지을 떠나시겠습니까?</h1>
          <button onClick={handlePopupClose}>아니요</button>
          <button onClick={() => handlePopupLeave(onLeave)}>네</button>
        </div>
      )}
    </>
  );

  return { preventLeave, PreventPopup, onPreventLeave, offPreventLeave };
};

const MyApp = () => {
  // CASE 1. 페이지 자체에 이벤트 적용(글로벌 적용)
  // const { PreventPopup } = usePreventLeave(true);

  // CASE 2. 특정 요소가 변경될 경우 감지후 방지 이벤트 적용(e.g., form)
  //   - beforeunload 형태와 동일
  // const { preventLeave, PreventPopup, onPreventLeave, offPreventLeave } =
  //   usePreventLeave(true);

  // CASE 3. 라우터 이동이 있는 컴포넌트 막기
  const { preventLeave, PreventPopup } = usePreventLeave(true);

  return (
    <div>
      <input type="text" onChange={handleInputChange} />
      <PreventPopup onLeave={() => console.log("left!")} />
      {/* 페이지 이동이 있는 컴포넌트에 preventLeave로 팝업 노출 적용 */}
      <Link to="/1ilsang" onClick={preventLeave}>
    </div>
  );
};
```

## 합본 코드

```tsx
const usePreventLeave = (global = false) => {
  const [prevent, setPrevent] = useState(false);

  useEffect(() => {
    if (!global) return;

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopstate);
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [global]);

  const handleBeforeUnload = (event: Event) => {
    event.preventDefault();
    event.returnValue = false; // Chrome requires returnValue to be set.
  };
  const handlePopstate = () => setPrevent(true);
  const handlePopupClose = () => {
    window.history.pushState(null, '', window.location.href);
    setPrevent(false);
  };
  const handlePopupLeave = (onLeave: () => void) => {
    setPrevent(false);
    onLeave();
  };
  const preventLeave = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setPrevent(true);
  };
  const onPreventLeave = () => {
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopstate);
    window.addEventListener('beforeunload', handleBeforeUnload);
  };
  const offPreventLeave = () => {
    window.removeEventListener('popstate', handlePopstate);
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };

  const PreventPopup: FunctionComponent<{ onLeave: () => void }> = ({
    onLeave,
  }) => (
    <>
      {prevent && (
        <div>
          <h1>페이지을 떠나시겠습니까?</h1>
          <button onClick={handlePopupClose}>아니요</button>
          <button onClick={() => handlePopupLeave(onLeave)}>네</button>
        </div>
      )}
    </>
  );

  return { preventLeave, PreventPopup, onPreventLeave, offPreventLeave };
};
```

이로써 유저 이탈시 컨펌창이 노출되는 것에 대한 최소한의 대응은 할수 있게 되었다.

## 참고

- [https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event)
- [https://developer.mozilla.org/en-US/docs/Web/Security/User_activation](https://developer.mozilla.org/en-US/docs/Web/Security/User_activation)
- [https://developer.chrome.com/blog/page-lifecycle-api/](https://developer.chrome.com/blog/page-lifecycle-api/)
- [https://heyjiawei.com/block-user-from-leaving-page-on-single-page-app](https://heyjiawei.com/block-user-from-leaving-page-on-single-page-app)
