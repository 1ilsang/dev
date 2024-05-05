import { FunctionComponent } from 'react';

const Favicon: FunctionComponent = () => {
  return (
    <>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta name="apple-mobile-web-app-title" content="1ilsang.dev" />
      <meta name="theme-color" content="#141621" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#141621" />
    </>
  );
};

export default Favicon;
