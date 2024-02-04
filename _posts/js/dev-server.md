---
title: 'Vite Dev Server 이해하기 (feat. HMR)'
description: 'Dev 서버의 동작 방식은 어떻게 될까?'
tags: ['vite', 'dev-server', 'hmr']
coverImage: 'https://github.com/1ilsang/dev/assets/23524849/132b52c7-3c2b-4554-b0fb-8ec5f3193d7a'
date: '2024-02-04T13:50:51.772Z'
ogImage:
  url: 'https://github.com/1ilsang/dev/assets/23524849/132b52c7-3c2b-4554-b0fb-8ec5f3193d7a'
---

<img class="cover" alt="cover" src="https://github.com/1ilsang/dev/assets/23524849/132b52c7-3c2b-4554-b0fb-8ec5f3193d7a" />

요즘 `vite`의 매력에 푹빠져있다. 그러던 도중 "개발 서버는 어떻게 동작하는걸까?" 의문을 가지게 되었다. 따라서 오늘은 <u>Vite Dev Server의 동작 방식을 이해하고 HMR 과정</u>을 파헤쳐 보려고 한다.

## Index

- [TR;DR!](#trdr)
- [1. 개발 서버 실행(서버 초기화)](#1-개발-서버-실행서버-초기화)
- [2. index.html 요청](#2-indexhtml-요청)
- [3. index.html 렌더링(with WebSocket)](#3-indexhtml-렌더링with-websocket)
- [4. 코드 변경 감지](#4-코드-변경-감지)
- [5. 브라우저 리렌더링](#5-브라우저-리렌더링)
- [마무리](#마무리)

## TR;DR!

![dev-server-logic-summary](https://github.com/1ilsang/dev/assets/23524849/778f568d-154a-4ac8-bfe0-3e1399c16588)

> 한 짤로 보는 Dev Server의 동작 방식

이 글은 핵심 로직에 해당하는 노란색 박스를 위주로 설명하려고 한다. 위의 도식도를 쫓아오며 글을 읽는다면 도움이 될 것이라 생각한다.

이 글은 Vite `v5.0.12` [버전을 기준](https://github.com/vitejs/vite/tree/v5.0.12)으로 작성되었다.

Let's Dive!

## 1. 개발 서버 실행(서버 초기화)

```ts
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

![init-server-phase](https://github.com/1ilsang/dev/assets/23524849/7d46712d-6118-4788-9c91-fa2d20f8c3c3)

> 최초 서버 실행 이후의 상태

`yarn vite` 등의 커맨드로 Dev Server를 실행시키면 `bin/vite.js`의 `cli.js`가 [실행](https://github.com/vitejs/vite/blob/v5.0.12/packages/vite/bin/vite.js#L44)된다.

이후 `src/node/cli.ts`가 [실행](https://github.com/vitejs/vite/blob/v5.0.12/packages/vite/src/node/cli.ts#L156)되면서 Dev Server가 실행된다.

Dev Server는 아래와 같은 프로세스를 거치며 초기화를 진행한다.

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

```ts
// server/index.ts
middlewares.use(indexHtmlMiddleware(root, server))

// indexHtmlMiddleware.ts
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

![index.html-request-phase](https://github.com/1ilsang/dev/assets/23524849/ec8f01ad-b4a6-4da8-aaa6-0e5015438ba3)

최초 유저의 요청(`GET /`)이 발생하면 `index.html`이 리턴된다. 이 과정에서 `transform`을 거치며 필요한 데이터들을 세팅한다.

1. 미들웨어에서 `transform` 함수가 실행된다.
   - 이는 플러그인 컨테이너를 실행시키게 된다.
     - 플러그인들은 실행 시점(`pre`, `normal`, `post`)에 맞춰 실행된다.
2. 의존성 사전 번들링
   - `node_modules`에 있는 의존성들은 [ESM](https://webpack.kr/guides/ecma-script-modules/)이 아닐 수 있다. Vite는 이들을 [사전 번들링](https://ko.vitejs.dev/guide/dep-pre-bundling.html)하여 브라우저가 이해할 수 있는 ESM 형태로 변환한다.
     - 이 과정은 esbuild로 실행되어 빠르게 처리된다.

![transpile-ts-to-js](https://github.com/1ilsang/dev/assets/23524849/23f4b155-b5f5-487d-8500-b39796919829)

3. 코드 변환
   - TS 혹은 JSX 파일의 경우 JS로 변환된다.
     - 위의 그림과 같이 파일 명 자체는 변경되지 않지만 코드는 js로 변경된다.

![module-graph](https://github.com/1ilsang/dev/assets/23524849/87b4fc0c-d9d6-4a27-bf0d-7b676136231a)

4. 모듈 파서
   - 모듈 의존성 그래프를 생성한다.
     - 만약 외부 의존성이 있다면 chokidar에 추가된다.
     - 파일 시스템에 변경사항이 있을 경우 모듈 그래프로 빠르게 전파시킨다.
5. Dev Server의 기능에 필요한 사전 코드들(`@vite/client` 등)을 추가한다.
6. 변환된 html 파일을 리턴한다.

## 3. index.html 렌더링(with WebSocket)

![init-html](https://github.com/1ilsang/dev/assets/23524849/a5969d65-b177-4011-ab1b-d45129b9951e)

![browser-initiator](https://github.com/1ilsang/dev/assets/23524849/3eacdd15-514a-43a9-a71c-cc8ba228d574)

브라우저는 응답 받은 html 파일을 파싱하면서 필요한 자원(js, css 등)을 다시 요청한다.

- html의 최상단 `/@vite/client` 파일을 가져온다면 실행되면서 웹 소켓이 실행된다.
- 각 요청에 대해 Dev Server는 transformMiddleware에서 [2번 html 요청](#2-indexhtml-요청)과 비슷한 과정으로 응답한다.

```ts
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
    const depsOptimizer = getDepsOptimizer(server.config, false) // non-ssr
    const type = isDirectCSSRequest(url) ? 'css' : 'js'
    const isDep =
      DEP_VERSION_RE.test(url) || depsOptimizer?.isOptimizedDepUrl(url)
    return send(req, res, result.code, type, {
      etag: result.etag,
      // allow browser to cache npm deps!
      cacheControl: isDep ? 'max-age=31536000,immutable' : 'no-cache',
      headers: server.config.server.headers,
      map: result.map,
    })
  }
}
```

이때 Dev Server에 내장된 importAnalysis 플러그인에서 HMR이 가능한 파일이라면 `import.meta.hot`을 설정한다.

![index.html-rendering-phase](https://github.com/1ilsang/dev/assets/23524849/5321cc9c-f569-4653-8179-06669e82f630)

## 4. 코드 변경 감지

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

```ts
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
  ws.send({
    type: 'update',
    updates,
  })
```

![file-change-phase](https://github.com/1ilsang/dev/assets/23524849/51800d15-f916-4c25-bc1f-6a6bd2044d54)

## 5. 브라우저 리렌더링

![socket-update-event](https://github.com/1ilsang/dev/assets/23524849/23181d27-311e-4154-a04f-7efa2fb7cae9)

```ts
// vite/client
case 'update':
  notifyListeners('vite:beforeUpdate', payload);
  await Promise.all(payload.updates.map(async(update)=> {
      if (update.type === 'js-update') {
            // queueUpdate는 업데이트 목록을 추가한다.
            return hmrClient.queueUpdate(update);
      }
      // ... CSS update는 생략
  });
  notifyListeners('vite:afterUpdate', payload);

// queueUpdate
queueUpdate(...) {
  fetchedModule = await this.importUpdatedModule(update);

// importUpdatedModule
async function importUpdatedModule(...) {
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

react, preact 등 순수 자바스크립트가 아니라면 라이브러리 자체 flush를 호출한다.

- preact는 prefresh 에서 hmr 진행.
- prefresh는 @preact/preset-vite에 포함되어 있다.

HMR이 가능한 파일은 import.meta.hot.accept 함수의 콜백으로 처리된다.
불가능 하다면 페이지를 리로딩하고 캐싱을 피하기 위해 시간을 쿼리스트링으로 붙인다(?ts=123214123)

## 마무리

Vite Dev Server의 많은 부분들이 Webpack의 동작과 비슷하다는 점에서 역시 크게 바뀌지는 않는구나 조금 안심했다.

이 글을 쓰며 참고했던 혹은 유용했던 링크를 남기며 글을 마무리 하려고 한다.

- [https://rajaraodv.medium.com/webpack-hot-module-replacement-hmr-e756a726a07](https://rajaraodv.medium.com/webpack-hot-module-replacement-hmr-e756a726a07)
- [https://webpack.kr/concepts/hot-module-replacement](https://webpack.kr/concepts/hot-module-replacement)
- [https://ko.vitejs.dev/config/server-options.html](https://ko.vitejs.dev/config/server-options.html)
- [https://github.com/vitejs/vite](https://github.com/vitejs/vite)
