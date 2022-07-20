import { AppProps } from "next/app";
import "../styles/globals.scss";

let bannerOpened = false;

export default function MyApp({ Component, pageProps }: AppProps) {
  if (!bannerOpened) {
    bannerOpened = true;
    console.info(
      `
			 
	\u001b[33m██╗ ██╗ ██╗    ███████╗ █████╗ ███╗   ██╗ \u001b[32m███\u001b[33m███╗
   ███║   ║ ██║    ██╔════╝██╔══██╗████╗  \u001b[32m██║██\u001b[33m╔════╝ 
   ╚██║ ██║ ██║    ███████╗█\u001b[32m██████║██╔██╗\u001b[33m ██║██║  ███╗
	██║ ██║ ██║    ╚═══\u001b[32m═██║██╔\u001b[33m══██║██║╚██╗██║██║   ██║
	██║ ██║ ██████╗██\u001b[32m████\u001b[33m█║██║  ██║██║ ╚████║╚██████╔╝
	╚═╝ ╚═╝ ╚═════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
																										 
								\u001b[31mThank you for visiting.\u001b[0m
			`,
    );
  }
  return <Component {...pageProps} />;
}
