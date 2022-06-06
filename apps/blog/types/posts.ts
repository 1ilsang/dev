interface PostType {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  coverImage: string;
  description: string;
  ogImage: {
    url: string;
  };
  content: string;
}

export default PostType;
