import { NextPage } from "next";
import Image from "next/image";
import Footer from "../components/common/Footer";
import MetaHeader from "../components/common/MetaHeader";
import Navbar from "../components/common/Navbar";
import { ImageUrl, MetaDescription, MetaTitle } from "../helpers/constant";

const About: NextPage = () => {
  return (
    <>
      <MetaHeader
        title={MetaTitle.HOME}
        ogImageUrl={ImageUrl.HOME}
        description={MetaDescription.HOME}
      />
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
