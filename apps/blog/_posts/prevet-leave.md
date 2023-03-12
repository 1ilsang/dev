---
title: "페이지 이탈시 확인 팝업 만들기"
description: "usePreventLeave"
tags: ["usePreventLeave", "beforeunload", "popstate", "popup"]
coverImage: "https://user-images.githubusercontent.com/23524849/224527867-7128d0f0-04b6-4f6d-93db-4079af82d181.png"
date: "2023-03-12T06:14:32.600Z"
ogImage:
  url: "https://user-images.githubusercontent.com/23524849/224527867-7128d0f0-04b6-4f6d-93db-4079af82d181.png"
---

유저가 페이지 이탈시 확인 컴펌을 받는 로직이 필요하게 되었고 이에 대한 고민을 공유해 보려고 한다.

페이지 이탈은 아래와 같은 네가지 방법이 있다고 생각한다.

1. 브라우저 닫기
2. 페이지 새로고침
3. 페이지 뒤로가기
4. 페이지 내의 다른 Navigation 컴포넌트 클릭(라우터 변경)

나는 위의 네 가지 경우 모두 확인하는 팝업을 만들어야 했다.

<img width="253" alt="image" src="https://user-images.githubusercontent.com/23524849/224527867-7128d0f0-04b6-4f6d-93db-4079af82d181.png">

기본적으로 크롬에서 제공하는 새로고침 컨펌 팝업은 위의 이미지와 같다.

![image](https://user-images.githubusercontent.com/23524849/224530063-1e18a08b-9e27-44dc-a7af-1f5b51723da6.png)

브라우저의 동작을 보면 더 명확하다.

beforeunload 이벤트는 브라우저 닫기, 새로고침, 페이지 이탈시 발생하는 이벤트이므로 대부분의 케이스는 이 경우로 제어하고

뒤로가기는 popstate로 제어한다.

다른 컴포넌트 클릭으로 라우터 변경이 일어난다면 onLeave 메서드를 받아서 처리해 주었다.
이 부분은 더 디벨롭이 필요한 부분인데, 라우터 변경이 일어나는 모든 영역에 클릭 이벤트를 넣어주는건 사실상 불가능하기 때문이다.

```tsx
import { useEffect, useState, MouseEvent, FunctionComponent } from "react";
import { useLocation, useParams } from "react-router-dom";

const usePreventLeave = (setPage = true) => {
  const location = useLocation();
  const { searchId, id } = useParams();
  const [prevent, setPrevent] = useState(false);

  const preventPathList = [
    `/account/${searchId}/broadcast/create`,
    `/account/${searchId}/broadcast/${id}/edit`,
  ];

  useEffect(() => {
    if (!setPage) return;
    window.history.pushState(null, "", window.location.href);

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [setPage]);

  const handleBeforeUnload = (event: Event) => {
    event.preventDefault();
    event.returnValue = false; // For chrome
  };
  const handlePopstate = () => setPrevent(true);
  const preventLeave = (event: MouseEvent<HTMLElement>) => {
    if (!preventPathList.includes(location.pathname)) return false;
    event.preventDefault();
    setPrevent(true);
    return true;
  };
  const handlePopupClose = () => {
    window.history.pushState(null, "", window.location.href);
    setPrevent(false);
  };
  const handlePopupLeave = (onLeave: () => void) => {
    setPrevent(false);
    onLeave();
  };
  const historyBack = () => window.history.back();

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

  return { preventLeave, prevent, setPrevent, PreventPopup, historyBack };
};

export default usePreventLeave;
```

이로써 각 페이지에 대한 처리를 할 수 있게 된다.
