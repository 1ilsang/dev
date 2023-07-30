import { NextPage } from "next";

import Footer from "~/shared/components/Footer";
import MetaHeader from "~/shared/components/MetaHeader";
import Navbar from "~/shared/components/Navbar";
import { ImageUrl, MetaDescription, MetaTitle } from "~/shared/constants/blog";
import { getAllPosts, getPostBySlug } from "~/shared/helpers/post";
import TagListContainer from "~/tags/tagList/Container";

interface TagsProps {
  tags: string[];
}

const Tags: NextPage<TagsProps> = ({ tags }) => {
  return (
    <>
      <MetaHeader
        title={MetaTitle.HOME}
        ogImageUrl={ImageUrl.HOME}
        description={MetaDescription.HOME}
      />
      <main className="tag-layout">
        <Navbar />
        <TagListContainer tags={tags} />
        <Footer />
      </main>
    </>
  );
};

export default Tags;

export async function getStaticProps() {
  const rawPosts = getAllPosts(["slug"]);
  const allTags = rawPosts
    .map((rawPost) => {
      const data = getPostBySlug(rawPost.slug, ["tags"]);
      return data.tags;
    })
    .flatMap((tagList) => tagList);
  const tags = [...new Set(allTags)];

  return {
    props: {
      tags,
    },
  };
}
