import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Footer from "../components/common/Footer";
import Meta from "../components/common/Meta";
import Navbar from "../components/common/Navbar";
import { ImageUrl, MetaDescription, MetaTitle } from "../helpers/constant";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <Meta
          title={MetaTitle.HOME}
          ogImageUrl={ImageUrl.HOME}
          description={MetaDescription.HOME}
        />
      </Head>
      <div className="about-layout">
        <Navbar />
        <div className="about-container">
          <Image
            src="/assets/build.png"
            layout="fill"
            objectFit="contain"
            alt={"공사중"}
          />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default About;
