import { NextPage } from "next";

import HomeContainer from "~/home/Container";
import MetaHeader from "~/shared/components/MetaHeader";
import Navbar from "~/shared/components/Navbar";
import { ImageUrl, MetaDescription, MetaTitle } from "~/shared/constants/blog";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader
        title={MetaTitle.HOME}
        ogImageUrl={ImageUrl.HOME}
        description={MetaDescription.HOME}
      />
      <main className="home-layout">
        <Navbar />
        <HomeContainer />
      </main>
    </>
  );
};

export default Home;
