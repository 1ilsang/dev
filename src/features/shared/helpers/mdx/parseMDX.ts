import type { MDXContent } from 'mdx/types';
import type { Category, FileCategory, PostType } from '~/posts/models';

const parseCategory = (category: FileCategory): Category => {
  switch (category) {
    case 'js':
      return 'JavaScript';
    case 'retrospect':
      return 'Retrospect';
    case 'rust':
      return 'Rust';
    case 'activity':
      return 'Activity';
    case 'tool':
      return 'Tool';
    case 'book':
      return 'Book';
    case 'algorithm':
      return 'Algorithm';
  }
};

export const parseMDX = async (fullSlug: string): Promise<PostType> => {
  const category = parseCategory(fullSlug.split('/').shift() as FileCategory);
  const slug = fullSlug.split('/').pop();
  const url = `/posts/${slug}`;
  const {
    frontmatter,
    default: MDX,
    toc,
  } = (await import(`/_posts/${fullSlug}/docs.mdx`)) as PostType & {
    default: MDXContent;
  };

  return {
    frontmatter: {
      ...frontmatter,
      coverImage: `${url}/${frontmatter.coverImage}`,
    },
    toc,
    url,
    slug,
    fullSlug,
    category,
    MDX,
  };
};
