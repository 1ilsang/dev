import { NextPage } from "next";
import Image from "next/image";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";

interface TagsProps {}

const Tags: NextPage<TagsProps> = () => {
  return (
    <div className="tag-layout">
      <Navbar />
      <div className="tag-container">
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

export default Tags;

// TODO: tags 뽑아내기
