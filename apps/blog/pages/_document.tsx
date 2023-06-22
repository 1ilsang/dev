import Document, { Html, Head, Main, NextScript } from "next/document";

import Favicon from "~/shared/components/Favicon";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="author" content="1ilsang" />
          <meta name="keyword" content="1ilsang,dev,front,frontend,react" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
          />
          <link
            rel="preload"
            href="https://cdn.jsdelivr.net/gh/everydayminder/assets/subset-D2Coding.woff2"
            as="font"
            type="font/woff2"
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
