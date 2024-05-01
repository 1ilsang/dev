import { getAllPosts, urlToSlugMap } from '~/shared/helpers/post';

getAllPosts();
export const urls = Object.keys(urlToSlugMap);
