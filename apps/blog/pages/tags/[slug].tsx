import { NextPage } from "next";
import Image from "next/image";

import MetaHeader from "~/shared/components/MetaHeader";
import Navbar from "~/shared/components/Navbar";
import {
  ImageUrl,
  MetaDescription,
  MetaTitle,
} from "~/shared/helpers/constant";

interface TagsProps {}

const Tags: NextPage<TagsProps> = () => {
  return (
    <>
      <MetaHeader
        title={MetaTitle.HOME}
        ogImageUrl={ImageUrl.HOME}
        description={MetaDescription.HOME}
      />
      <div className="home-container">
        <Navbar />
        <main>
          <Image
            src="/assets/build.png"
            layout="fill"
            objectFit="contain"
            alt={"공사중"}
          />
        </main>
      </div>
    </>
  );
};

export default Tags;
