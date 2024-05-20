import { type NextPage } from 'next';

import Footer from '~/shared/components/Footer';
import Navbar from '~/shared/components/nav/Navbar';
import { getAllPosts, getPostBySlug } from '~/shared/helpers/post';
import TagListContainer from '~/tags/tagList/Container';

const Tags: NextPage = () => {
  const rawPosts = getAllPosts(['slug']);
  const allTags = rawPosts
    .map((rawPost) => {
      const data = getPostBySlug(rawPost.slug, ['tags']);
      return data.tags;
    })
    .flatMap((tagList) => tagList);
  const tags = [...new Set(allTags)];

  return (
    <main className="tag-layout">
      <Navbar />
      <TagListContainer tags={tags} />
      <Footer />
    </main>
  );
};

export default Tags;
