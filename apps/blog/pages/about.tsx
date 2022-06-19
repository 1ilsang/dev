import { NextPage } from "next";
import Image from "next/image";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

const About: NextPage = () => {
  return (
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
  );
};

export default About;
