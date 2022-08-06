import { NextPage } from "next";
import Image from "next/image";

import Footer from "../../components/common/Footer";
import MetaHeader from "../../components/common/MetaHeader";
import Navbar from "../../components/common/Navbar";
import { ImageUrl, MetaDescription, MetaTitle } from "../../helpers/constant";

interface TagsProps {}

const Tags: NextPage<TagsProps> = () => {
  return (
    <>
      <MetaHeader
        title={MetaTitle.HOME}
        ogImageUrl={ImageUrl.HOME}
        description={MetaDescription.HOME}
      />
      <div className="tag-layout">
        <Navbar />
        <main>
          <div className="tag-container">
            <Image
              src="/assets/build.png"
              layout="fill"
              objectFit="contain"
              alt={"공사중"}
            />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Tags;

// TODO: tags 뽑아내기
