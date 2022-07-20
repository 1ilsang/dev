import Document, { Html, Head, Main, NextScript } from "next/document";

import Favicon from "../components/common/Favicon";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="author" content="1ilsang" />
          <meta name="keyword" content="1ilsang,dev,front,frontend,react" />
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
