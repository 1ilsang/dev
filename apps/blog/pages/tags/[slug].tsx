import { NextPage } from "next";
import Image from "next/image";

import MetaHeader from "~/shared/components/MetaHeader";
import Navbar from "~/shared/components/Navbar";
import {
  ImageUrl,
  MetaDescription,
  MetaTitle,
} from "~/shared/helpers/constant";
import Footer from "~/shared/components/Footer";

interface TagsProps {}

const Tags: NextPage<TagsProps> = () => {
  return (
    <>
      <MetaHeader
        title={MetaTitle.HOME}
        ogImageUrl={ImageUrl.HOME}
        description={MetaDescription.HOME}
      />
      <main className="tag-layout">
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
      </main>
    </>
  );
};

export default Tags;
