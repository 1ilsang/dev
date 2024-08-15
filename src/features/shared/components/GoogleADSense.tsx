import Script from 'next/script';
import type { FunctionComponent } from 'react';

type Props = {
  pId: string;
};

const GoogleADSense: FunctionComponent<Props> = ({ pId }) => {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
};

export default GoogleADSense;
