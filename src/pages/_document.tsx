import Document, { Html, Head, Main, NextScript } from 'next/document';

import Favicon from '~/shared/components/Favicon';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charSet="utf-8" />
          <meta name="author" content="1ilsang" />
          <meta name="keyword" content="1ilsang,dev,front,frontend,react" />
          <link
            href="/assets/D2Coding-subset.woff2"
            as="font"
            type="font/woff2"
            rel="preload"
            crossOrigin="anonymous"
          />
          <link
            href="/assets/D2CodingBold-subset.woff2"
            as="font"
            type="font/woff2"
            rel="preload"
            crossOrigin="anonymous"
          />
          <Favicon />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
