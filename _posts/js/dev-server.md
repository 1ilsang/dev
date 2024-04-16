---
title: 'Vite Dev Server 이해하기 (feat. HMR)'
description: 'Dev 서버의 동작 방식은 어떻게 될까?'
url: 'vite-dev-server'
tags: ['vite', 'dev-server', 'hmr', 'preact', 'prefresh']
coverImage: 'https://github.com/1ilsang/dev/assets/23524849/132b52c7-3c2b-4554-b0fb-8ec5f3193d7a'
date: '2024-02-04T13:50:51.772Z'
ogImage:
  url: 'https://github.com/1ilsang/dev/assets/23524849/132b52c7-3c2b-4554-b0fb-8ec5f3193d7a'
---

![cover](https://github.com/1ilsang/dev/assets/23524849/132b52c7-3c2b-4554-b0fb-8ec5f3193d7a 'cover')

요즘 [Vite](https://vitejs.dev/)의 매력에 푹 빠져있다. 그러던 도중 "개발 서버는 어떻게 동작하는 걸까?" 의문을 가지게 되었다. 따라서 오늘은 <u>Vite Dev Server의 동작 방식을 이해하고 HMR 과정</u>을 파헤쳐 보려고 한다.

## Index

- [TL;DR!](#tldr)
- [1. 개발 서버 실행(서버 초기화)](#1-개발-서버-실행서버-초기화)
- [2. index.html 요청](#2-indexhtml-요청)
- [3. index.html 렌더링과 자원 요청](#3-indexhtml-렌더링과-자원-요청)
- [4. 렌더링 계속 진행(with WebSocket)](#4-렌더링-계속-진행with-websocket)
- [5. 코드 변경 감지](#5-코드-변경-감지)
- [6. 브라우저 리렌더링](#6-브라우저-리렌더링)
- [마무리](#마무리)

## TL;DR!

![dev-server-logic-summary](https://github.com/1ilsang/dev/assets/23524849/03dab012-82a9-4649-8d80-15c0dfe0c129 'l')

> 한 짤로 보는 Dev Server의 동작 방식

이 글은 핵심 로직에 해당하는 노란색 박스를 위주로 설명하려고 한다. 위의 도식도를 쫓아오며 글을 읽는다면 도움이 될 것으로 생각한다.

이 글은 Vite `v5.0.12` [버전을 기준](https://github.com/vitejs/vite/tree/v5.0.12)으로 작성되었다.

Let's Dive!

## 1. 개발 서버 실행(서버 초기화)

![init-server-phase](https://github.com/1ilsang/dev/assets/23524849/7d46712d-6118-4788-9c91-fa2d20f8c3c3)

> 최초 서버 실행 이후의 상태

<br />

```ts title="vite/packages/vite/src/node/server/index.ts"
// https://github.com/vitejs/vite/blob/v5.0.12/packages/vite/src/node/server/index.ts#L385
// server/index.ts
export async function _createServer(
  inlineConfig: InlineConfig = {},
  options: { ws: boolean },
): Promise<ViteDevServer> {
  // connect를 사용해 express와 같은 미들웨어 구조를 가진다.
  const middlewares = connect() as Connect.Server

  // HTTP 서버와 웹 소켓 서버를 생성한다.
  const httpServer = await resolveHttpServer(serverConfig, middlewares, httpsOptions)
  const ws = createWebSocketServer(httpServer, config, httpsOptions)

  // 파일 변경 감지를 위해 chokidar를 설정한다.
  const watcher = chokidar.watch((...) as FSWatcher)

  // 의존성 관계를 추적할 수 있는 모듈 그래프를 만든다. HMR 및 트리쉐이킹 같은 최적화 작업을 위해 존재한다.
  // 서버 초기화 단계에서는 그래프가 비어있다.
  const moduleGraph: ModuleGraph = new ModuleGraph(...)

  // Rollup의 플러그인 컨테이너를 활용해 플러그인 구성을 만든다.
  const container = await createPluginContainer(config, moduleGraph, watcher)

  // ...
}
```

`yarn vite` 등의 커맨드로 Dev Server를 실행시키면 `bin/vite.js`의 `cli.js`가 [호출](https://github.com/vitejs/vite/blob/v5.0.12/packages/vite/bin/vite.js#L44)된다. 이후 `src/node/cli.ts`가 [호출](https://github.com/vitejs/vite/blob/v5.0.12/packages/vite/src/node/cli.ts#L156)되면서 Dev Server가 실행된다.

### Dev Server는 아래와 같은 프로세스를 거치며 초기화를 진행한다.

1. Dev Server가 실행되면 HTTP 서버와 웹 소켓 서버가 실행된다.

   - 미들웨어는 Express에서 사용되는 [connect](https://www.npmjs.com/package/connect)로 연결된다.

2. 파일 시스템 옵저버를 설정한다.

   - 파일 변경 감지를 위해 [chokidar](https://www.npmjs.com/package/chokidar)를 사용한다.

3. 모듈 그래프를 생성한다.

   - 모듈(파일)의 의존성 관계를 추적한다.
     - [HMR(Hot Module Replacement)](https://webpack.kr/concepts/hot-module-replacement/) 및 [트리쉐이킹](https://webpack.kr/guides/tree-shaking/) 같은 최적화 작업을 위해 존재한다.
   - 현재(초기화 단계)는 비어있다.

4. 플러그인 컨테이너를 생성한다.
   - Dev Server에 필요한 Built-in(내장된) 플러그인이 추가된다.
     - importAnalysis, css, optimizer, json 등이 있다.
   - 사용자가 추가한 플러그인(vite.config.ts > plugins)이 추가된다.
   - 플러그인은 이후 Dev Server의 특정 시점마다 훅을 실행시켜 미들웨어 역할을 하게 된다.
5. 클라이언트의 요청을 기다린다.

## 2. index.html 요청

![index.html-request-phase](https://github.com/1ilsang/dev/assets/23524849/ec8f01ad-b4a6-4da8-aaa6-0e5015438ba3 'l')

<br />

```ts {11,14}
// server/index.ts
middlewares.use(indexHtmlMiddleware(root, server))

// https://github.com/vitejs/vite/blob/v5.0.12/packages/vite/src/node/server/middlewares/indexHtml.ts#L438
// HTML 파일을 처리하고 변환한다. 스크립트 태그 주입 및 HMR 클라이언트 코드 삽입, 모듈 경로 변환 등의 작업을 한다.
html = await server.transformIndexHtml(url, html, req.originalUrl)

// transform
export function createDevHtmlTransformFn(...) {
  // 필요한 플러그인의 실행 시점에 따라 분류한다.
  const [preHooks, normalHooks, postHooks] = resolveHtmlTransforms(...)
  return (...) => {
    // html에 반영한다.
    return applyHtmlTransforms(
      html,
      [
        preImportMapHook(config),
        ...preHooks,
        // ...
      ],
      { ... },
    )
  }
}
```

최초 유저의 요청(`GET /`)이 발생하면 `index.html`이 리턴된다. 이 과정에서 `transform`과 같은 [플러그인 훅](https://vitejs.dev/guide/api-plugin.html#universal-hooks)을 거치며 필요한 데이터들을 세팅한다.

1. 미들웨어에서 `transform` 함수가 실행된다.

   - 플러그인 컨테이너의 플러그인들이 실행 된다.
     - 플러그인들은 실행 시점(`pre`, `normal`, `post`)에 맞춰 훅이 실행된다.

2. 의존성 사전 번들링
   - `node_modules`에 있는 의존성은 [ESM](https://webpack.kr/guides/ecma-script-modules/)이 아닐 수 있다. Vite는 이들을 [사전 번들링](https://ko.vitejs.dev/guide/dep-pre-bundling.html)하여 브라우저가 이해할 수 있는 ESM 형태로 변환한다.
     - 이 과정은 esbuild로 실행되어 빠르게 처리된다.

![transpile-ts-to-js](https://github.com/1ilsang/dev/assets/23524849/23f4b155-b5f5-487d-8500-b39796919829 'l')

> hmr.ts의 response에 타입이 사라진 모습.

3. 코드 변환

   - TS 혹은 JSX 파일의 경우 JS로 변환된다.
     - 위의 그림과 같이 파일명 자체는 변경되지 않지만, 코드는 js로 변경된다.

<br />

```ts
// 만약 index.html에서 해당 파일을 import 한다고 가정해 보자.
// playground/hmr/hmr.ts
import { foo as depFoo, nestedFoo } from './hmrDep'
import './importing-updated'
import './invalidation/parent'

// hmr.ts 파일에 구성된 모듈 의존성 그래프
ModuleNode {
  url: '/hmr.ts',
  file: '/User/user/VSCode/vite/playground/hmr/hmr.ts',
  type: 'js',
  // 클라이언트 측에서 사용되는 모듈들, 즉 브라우저에서 실행되는 모듈들의 목록을 추적하는 데 사용된다.
  clientImportModules: Set(10) {
    // 재귀적 구조
    ModuleNode: {
      url: '/hmrDep.js' // hmr.ts 내부에서 import 되는 hmrDep 이 추가된 모습.
      file: '/User/user/VSCode/vite/playground/hmr/hmrDep.js',
      clientImportModules: Set(10) {
        ModuleNode: { ... }
    }.
    ModuleNode: {
      url: '/importing-updated/index.js', // hmr.ts 내부에서 import 되는 importing-updated가 추가된 모습.
      file: '/User/user/VSCode/vite/playground/hmr/importing-updated/index.js',
      // ...
    }
  // ...
```

4. 모듈 의존성 그래프 생성

   - 위 코드를 보면 `hmr.ts`에서 import 되는 `./hmrDep`, `./importing-updated` 등이 `ModuleNode`에 설정되는 것을 알 수 있다.
   - 만약 외부 의존성이 있다면 chokidar에 추가된다.
   - 파일 시스템에 변경사항이 있을 때 모듈 그래프로 빠르게 전파시킨다.

5. Dev Server의 기능에 필요한 사전 코드들(`@vite/client` 등)을 응답 자원에 추가한다.

6. 변환된 html 파일을 리턴한다.

## 3. index.html 렌더링과 자원 요청

![index.html-rendering-phase](https://github.com/1ilsang/dev/assets/23524849/5321cc9c-f569-4653-8179-06669e82f630 'l')

> 3 ~ 4. 브라우저 렌더링 및 정적 자원 요청 상황.

<br />

![init-html](https://github.com/1ilsang/dev/assets/23524849/a5969d65-b177-4011-ab1b-d45129b9951e)

![browser-initiator](https://github.com/1ilsang/dev/assets/23524849/3eacdd15-514a-43a9-a71c-cc8ba228d574 'l')

> 브라우저는 위에서부터 아래로 해석해 나가므로 @vite/client, global.css, hmr.ts가 순차적으로 요청되는 것을 볼 수 있다.

1. 브라우저는 응답받은 html 파일을 렌더링 하기 시작한다.

2. 렌더링에 필요한 자원(js, css 등)을 다시 Dev Server에 요청한다.

   - html의 최상단 `/@vite/client`을 시작점으로 `global.css`, `hmr.ts` 등이 요청된다.

<br />

```ts {13}
// server/index.ts
// main transform middleware
middlewares.use(transformMiddleware(server))

// https://github.com/vitejs/vite/blob/v5.0.12/packages/vite/src/node/server/middlewares/transform.ts#L175
export function transformMiddleware(...) {
  // resolve, load and transform using the plugin container
  const result = await transformRequest(url, server, {
    html: req.headers.accept?.includes('text/html'),
  })
  if (result) {
    // transform된 코드, 소스코드를 캐시 설정해 리턴한다.
    return send(req, res, result.code, type, {
      etag: result.etag,
      cacheControl: isDep ? 'max-age=31536000,immutable' : 'no-cache',
      headers: server.config.server.headers,
      map: result.map,
    })
  }
}
```

3. transform 적용

   - 각 요청에 대해 Dev Server는 [transformMiddleware](https://github.com/vitejs/vite/blob/v5.0.12/packages/vite/src/node/server/middlewares/transform.ts#L175)에서 [2번 html 요청](#2-indexhtml-요청)과 비슷한 과정으로 `transform` 이후 응답한다.
     - 이때 `public` 폴더 내의 요청인지 외부 자원 요청인지 등의 분류 작업 또한 [미들웨어에서 진행](https://github.com/vitejs/vite/blob/v5.0.12/packages/vite/src/node/server/index.ts#L774)한다.
     - `@fs` prefix는 vite 프로젝트의 루트(config 위치)를 벗어날 경우 설정된다(모노레포 혹은 파일 시스템 직접 접근 등의 경우).
   - HMR 코드 적용
     - Dev Server에 내장된 [importAnalysis 플러그인](https://github.com/vitejs/vite/blob/v5.0.12/packages/vite/src/node/plugins/importAnalysis.ts#L209)에서 <u>HMR이 설정된 파일(\*1)이라면 `import.meta.hot`을 파일 최상단에 [추가](https://github.com/vitejs/vite/blob/v5.0.12/packages/vite/src/node/plugins/importAnalysis.ts#L715)</u>한다.

4. 변환된 자원을 브라우저에 응답(response)한다.

<br />

> (\*1): preact의 prefresh 같은 HMR 라이브러리를 적용했거나(후술) import.meta.hot.accept을 직접 코드에 추가한 경우에 해당(아래 코드)한다.

```html {7}
<!-- 
  import.meta.hot.accept가 코드에 있다면 HMR을 허용한 파일이라고 인식한다.
  importAnalysis 플러그인이 createHotContext를 추가한다. -->
<script type="module">
  if (import.meta.hot) {
    // https://vitejs.dev/guide/api-hmr#hot-accept-cb
    import.meta.hot.accept((param) => {
      console.log('param', param);
    });
  }
</script>
```

![inject-import-meta-hot](https://github.com/1ilsang/dev/assets/23524849/57326d8a-3c7a-41d4-ac7b-b202bc851bc8 'l')

> 일반 스크립트의 응답에 createHotContext 생성 및 import.meta.hot에 바인딩된 모습.

## 4. 렌더링 계속 진행(with WebSocket)

이제 index.html의 요청 파일을 가져왔으므로 브라우저 렌더링이 계속 진행된다.

```ts title="@vite/client.ts"
function setupWebSocket(...) {
  const socket = new WebSocket(`${protocol}://${hostAndPath}`, 'vite-hmr')
  socket.addEventListener('message', async ({ data }) => {
    handleMessage(JSON.parse(data))
  });
}
```

- `@vite/client` 파일
  - Dev Server와의 통신 및 [HMR에 필요한 코드들](https://github.com/vitejs/vite/blob/v5.0.12/packages/vite/src/client/client.ts#L137)이 작성되어 있다.
  - [WebSocket 연결](https://github.com/vitejs/vite/blob/v5.0.12/packages/vite/src/client/client.ts#L68) 및 `update` 이벤트를 기다린다.

<br />

```tsx {2,9,12}
// AS-IS 원본 코드
import { h, render } from 'preact';
import App from './MyComponent';

render(<App />, document.getElementById('app'));

// TO-BE 변경된 코드
import { render } from '/node_modules/.vite/deps/preact.js';
import { jsxDEV as _jsxDEV } from '/node_modules/.vite/deps/preact_jsx-dev-runtime.js';
import App from '/src/MyComponent';

render(_jsxDEV(App, ...), document.getElementById('app'))
```

만약 `react`와 같은 UI 라이브러리를 사용한다면 각 <u>라이브러리가 의존하는 HMR 라이브러리가 호출</u>된다. 여기서는 `preact`를 기준으로 설명(리액트와 거의 동일하다)하겠다.

`jsxDEV`로 감싸진 하위 컴포넌트들은 HMR이 적용된다. 자세한 내용은 [6. 브라우저 리렌더링](#6-브라우저-리렌더링)에서 다루겠다.

이제 브라우저가 더 이상 요청할 것이 없을 때까지 3 ~ 4 과정을 반복하며 렌더링을 마무리한다.

## 5. 코드 변경 감지

![file-change-phase](https://github.com/1ilsang/dev/assets/23524849/51800d15-f916-4c25-bc1f-6a6bd2044d54 'l')

> 코드가 변경되었을 때의 Dev Server 모습

<br />

```ts
watcher.on('change', async (file) => {
  file = normalizePath(file);
  // 플러그인 컨테이너에게 update 이벤트 발송. 플러그인에서 필요시 실행된다.
  await container.watchChange(file, { event: 'update' });
  // 의존성 그래프에 변경사항 체크
  moduleGraph.onFileChange(file);
  // 대망의 HMR 업데이트 시작
  await onHMRUpdate(file, false);
});
```

개발 중 파일이 변경되면(개발자의 코드 수정) chokidar에서 `change` [이벤트를 감지](https://github.com/vitejs/vite/blob/v5.0.12/packages/vite/src/node/server/index.ts#L673)한다.

- 플러그인 컨테이너에 `update` 이벤트를 전파한다.
  - 각 플러그인에서 필요시(listen) 플러그인 코드가 실행된다.
- 의존성 그래프에 변경사항을 적용한다.
  - 모듈 캐싱을 무효화해 refresh 되도록 함.
- `onHMRUpdate` 함수를 호출해 hot-reloading을 준비한다.

<br />

```ts {7,18}
function onHMRUpdate() {
  // 관련 플러그인 훅 실행
  for (const hook of config.getSortedPluginHooks('handleHotUpdate')) {
    const filteredModules = await hook(hmrContext)
  }
  ...
  updateModules(...)
}

function updateModules(...) {
  for (const mod of modules) {
    const boundaries: PropagationBoundary[] = []
    // 모듈 그래프 갱신
    const hasDeadEnd = propagateUpdate(mod, traversedModules, boundaries)
    moduleGraph.invalidateModule(mod, invalidatedModules, timestamp, true)
  }
  // 소켓 메시지 전송
  ws.send({ type: 'update', updates })
```

`onHMRUpdate`는 `updateModules`를 [호출](https://github.com/vitejs/vite/blob/v5.0.12/packages/vite/src/node/server/hmr.ts#L142)한다.

- HMR 관련 플러그인이 있을 때 훅(`handleHotUpdate`)을 실행시킨다.
- 관련된 모듈 그래프를 갱신한다.
- 브라우저에게 파일이 변경되었음을 <u>WebSocket</u>으로 알린다(update 이벤트 전송).

## 6. 브라우저 리렌더링

![socket-update-event](https://github.com/1ilsang/dev/assets/23524849/23181d27-311e-4154-a04f-7efa2fb7cae9 'l')

> 브라우저 소켓이 Dev Server의 update 소켓 데이터를 받은 모습.

<br />

```ts /hmrClient.fetchUpdate/ {22}
// Step 1.
// @vite/client.ts
case 'update':
  notifyListeners('vite:beforeUpdate', payload);
  await Promise.all(payload.updates.map(async(update)=> {
      if (update.type === 'js-update') {
            // queueUpdate는 업데이트 목록의 순서를 유지해준다.
            return queueUpdate(hmrClient.fetchUpdate(update))
      }
      // ... CSS update는 생략
  });
  notifyListeners('vite:afterUpdate', payload);

// Step 2.
// HMRClient > fetchUpdate
fetchUpdate(...) {
  fetchedModule = await this.importUpdatedModule(update);

// client/client.ts > importUpdatedModule
async function importUpdatedModule(...) {
  // Step 3.
  const importPromise = import(
    /* @vite-ignore */
    base +
      acceptedPathWithoutQuery.slice(1) +
      `?${explicitImportRequired ? 'import&' : ''}t=${timestamp}${
        query ? `&${query}` : ''
      }`
  )
  return await importPromise
},
```

1. `@vite/client`에서 연결된 브라우저의 소켓은 `update` 이벤트를 받고 `hmrClient`에게 [업데이트를 지시](https://github.com/vitejs/vite/blob/v5.0.12/packages/vite/src/client/client.ts#L182)한다.

2. hmrClient는 `fetchUpdate`에 데이터를 넘기고 `importUpdatedModule`을 [호출](https://github.com/vitejs/vite/blob/v5.0.12/packages/vite/src/shared/hmr.ts#L235)한다.

   - importUpdatedModule은 hmrClient가 [생성될 때 적용](https://github.com/vitejs/vite/blob/v5.0.12/packages/vite/src/client/client.ts#L137)된다.

![import response](https://github.com/1ilsang/dev/assets/23524849/d2d0de89-4eee-4496-9c51-d99d228eed0b 'l')

> Step 3 ~ 4.

3. importUpdatedModule이 호출되면서 변경된 모듈이 `import` 되므로, Dev Server에 새로 요청하게 된다([3. 렌더링 자원 요청](#3-indexhtml-렌더링과-자원-요청)). 이때 `t` 값을 쿼리로 넣어(?t=123214123) <u>캐싱을 회피해 변경된 모듈의 코드를 응답으로 받을 수 있도록</u> 한다.

4. import로 요청한 응답이 정상적으로 오면 리렌더링 되기 시작([4. 렌더링 진행](#4-렌더링-계속-진행with-websocket))된다.

5. HMR이 가능한 파일은 `import.meta.hot.accept` 함수의 [콜백으로 실행](https://ko.vitejs.dev/guide/api-hmr.html#hot-accept-cb)된다. HMR이 불가능한 파일이라면 전체 페이지를 리로딩한다.

```ts {16}
// vite.config.ts
import preact from '@preact/preset-vite';

export default defineConfig({
  // Step 1. preact 플러그인 호출
  plugins: [preact()],
});

// Step2 2. preact 플러그인에서 prefresh가 호출되면서 소스코드를 transform 한다.
return {
  code: `${prelude}${result.code}
  if (import.meta.hot) {
    self.$RefreshReg$ = prevRefreshReg;
    self.$RefreshSig$ = prevRefreshSig;`
    // 중요! Step 3. 해당 코드 덕에 HMR로 인식, Dev Server에서 호출되며 flushUpdate 실행
    `import.meta.hot.accept((m) => {
      try {
        flushUpdates();`

// Step 4. 실제 코드 변경 부분.
function flushUpdates() {
  self.__PREFRESH__.replaceComponent(prev, next, true);
```

앞에서 잠깐 다뤘지만 `react`, `preact` 등 순수 자바스크립트가 아니라면 라이브러리 자체 HMR을 호출한다. 이 HMR 코드는 [[3. 렌더링 자원 요청](#3-indexhtml-렌더링과-자원-요청)] 단계에서 추가된다.

1. [preact-vite 플러그인](https://github.com/preactjs/preset-vite)(`@preact/preset-vite`)은 내부적으로 [prefresh](https://github.com/preactjs/prefresh)라는 HMR 라이브러리를 사용한다.

2. preact 플러그인은 `prefreshEnabled` 여부에 따라 [prefresh를 호출](https://github.com/preactjs/preset-vite/blob/a325c1f3811900f70277424304c9eb42fc60f8a7/src/index.ts#L246)한다.

3. prefresh는 `transform` 단계에서 `import.meta.hot.accept` [코드를 주입](https://github.com/preactjs/prefresh/blob/main/packages/vite/src/index.js#L87)한다.

4. [[6. 브라우저 리렌더링](#6-브라우저-리렌더링)] 발생시 3번 단계의 `importUpdatedModule`를 거쳐 `import.meta.hot.accept`의 콜백이 실행된다.

5. perfresh에서 심어둔 `flushUpdates` 함수가 [HMR을 수행](https://github.com/preactjs/prefresh/blob/018f5cc907629b82ffb201c32e948efe4b40098a/packages/utils/src/index.js#L11)(컴포넌트 변경)된다.

이로써 HMR이 완전히 마무리되면서 다시 개발자의 입력을 기다리게 된다.

<br />

![dev-server-logic-summary](https://github.com/1ilsang/dev/assets/23524849/03dab012-82a9-4649-8d80-15c0dfe0c129 'l')

> Dev Server 초기화부터 HMR까지.

## 마무리

Vite Dev Server를 사용하면서 모호하게 알고 있던 부분을 이번 기회에 한번 쭉 정리할 수 있었다. 정리하면서 모르는 것이 참 많다고 느꼈다.

팩트인지 확인하기 위한 소스코드 탐험과 디버깅 과정은 상당히 의미 있었다. 글이 너무 길어질 것 같아 생략한 함수들이 꽤 있는데 감탄하며 본 로직들이 많이 있었다. 역시 남의 코드를 많이 봐야 한다.

이번 과정을 통해 두 가지 인사이트를 얻을 수 있었다.

1. Vite Dev Server의 많은 부분들이 Webpack Dev Server의 동작과 비슷하다는 점이 인상적이었다. 하나를 잘해놓는 게 중요하다고 느꼈다.
2. 소스코드의 탐험이 쉽지만은 않았만 어느 정도 자신감이 붙을 수 있었다. 이후에도 이렇게 공부해 나가야겠다고 생각했다.

이 글을 쓰며 참고했던 혹은 유용했던 링크를 남기며 글을 마무리하려고 한다.

- [https://rajaraodv.medium.com/webpack-hot-module-replacement-hmr-e756a726a07](https://rajaraodv.medium.com/webpack-hot-module-replacement-hmr-e756a726a07)
- [https://webpack.kr/concepts/hot-module-replacement](https://webpack.kr/concepts/hot-module-replacement)
- [https://ko.vitejs.dev/config/server-options.html](https://ko.vitejs.dev/config/server-options.html)
- [https://github.com/vitejs/vite](https://github.com/vitejs/vite)
