import { NextPage } from "next";
import Head from "next/head";
import Meta from "../components/common/Meta";
import Navbar from "../components/common/Navbar";
import { ImageUrl, MetaDescription, MetaTitle } from "../helpers/constant";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <Meta
          title={MetaTitle.HOME}
          ogImageUrl={ImageUrl.HOME}
          description={MetaDescription.HOME}
        />
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
