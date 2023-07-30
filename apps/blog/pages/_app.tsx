import { AppProps } from "next/app";

import { cliLogo } from "~/shared/constants/blog";
import "~/styles/index.scss";

let bannerOpened = false;

export default function MyApp({ Component, pageProps }: AppProps) {
  if (!bannerOpened) {
    bannerOpened = true;
    if (typeof window !== "undefined") {
      console.info(cliLogo);
    }
  }
  return <Component {...pageProps} />;
}
