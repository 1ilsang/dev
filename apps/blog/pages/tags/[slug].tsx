import { NextPage } from "next";
import Image from "next/image";
import Navbar from "../../components/common/Navbar";

interface TagsProps {}

const Tags: NextPage<TagsProps> = () => {
  return (
    <div className="home-container">
      <Navbar />
      <Image
        src="/assets/build.png"
        layout="fill"
        objectFit="contain"
        alt={"공사중"}
      />
    </div>
  );
};

export default Tags;
