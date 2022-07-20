import { NextPage } from "next";

import MetaHeader from "../components/common/MetaHeader";
import Navbar from "../components/common/Navbar";
import { ImageUrl, MetaDescription, MetaTitle } from "../helpers/constant";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader
        title={MetaTitle.HOME}
        ogImageUrl={ImageUrl.HOME}
        description={MetaDescription.HOME}
      />
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
