import { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/common/Navbar";
import { ImageUrl } from "../helpers/constant";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        {/* TODO: Meta 컴포넌트화 및 페이지에 모두 적용 */}
        <title>1ilsang.dev</title>
        <meta property="og:title" content={`1ilsang.dev`} />
        <meta property="og:image" content={ImageUrl.HOME} />
        <meta property="og:description" content={`1ilsang.dev`} />
        <meta name="description" content="1ilsang.dev" />
      </Head>
      <div className="home-container">
        <Navbar />
        <section className="home-logo scroll-snap" />
        <section className="home-logo2 scroll-snap" />
        <section className="home-logo scroll-snap" />
      </div>
    </>
  );
};
export default Home;
