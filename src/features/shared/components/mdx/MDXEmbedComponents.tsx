import type { PostType } from '~/posts/models';
import { ExternalAnchor } from './ExternalAnchor';
import {
  ImageHorizonWrap,
  type ImageHorizonWrapProps,
} from './img/ImageHorizonWrap';
import { LeftTable } from './table/LeftTable';

/** MDX 내에서 임베드되어 사용하는 컴포넌트 */
export const MDXEmbedComponents = ({ slug }: PostType) => {
  return {
    ImageHorizonWrap: (props: Omit<ImageHorizonWrapProps, 'slug'>) => (
      <ImageHorizonWrap {...props} slug={slug} />
    ),
    ExternalAnchor,
    LeftTable,
  };
};
