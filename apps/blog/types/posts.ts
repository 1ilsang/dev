import Author from "./author";

interface PostType {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  coverImage: string;
  description: string;
  author: Author;
  ogImage: {
    url: string;
  };
  content: string;
}

export default PostType;
