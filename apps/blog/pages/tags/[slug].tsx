import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Meta from "../../components/common/Meta";
import Navbar from "../../components/common/Navbar";
import { ImageUrl, MetaDescription, MetaTitle } from "../../helpers/constant";

interface TagsProps {}

const Tags: NextPage<TagsProps> = () => {
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
        <Image
          src="/assets/build.png"
          layout="fill"
          objectFit="contain"
          alt={"공사중"}
        />
      </div>
    </>
  );
};

export default Tags;
