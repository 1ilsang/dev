import { NextPage } from "next";

import MetaHeader from "~/shared/components/MetaHeader";
import Navbar from "~/shared/components/Navbar";
import {
  ImageUrl,
  MetaDescription,
  MetaTitle,
} from "~/shared/helpers/constant";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader
        title={MetaTitle.HOME}
        ogImageUrl={ImageUrl.HOME}
        description={MetaDescription.HOME}
      />
      {/* TODO: home-layout 으로 변경 필요 */}
      <main className="home-container">
        <Navbar />
        <section className="home-logo scroll-snap" />
        <section className="home-logo2 scroll-snap" />
        <section className="home-logo scroll-snap" />
      </main>
    </>
  );
};

export default Home;
