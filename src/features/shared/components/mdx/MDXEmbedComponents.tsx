import type { PostType } from '~/posts/models';
import { ExternalAnchor } from './ExternalAnchor';
import {
  ImageHorizonWrap,
  type ImageHorizonWrapProps,
} from './img/ImageHorizonWrap';
import { LeftTable } from './table/LeftTable';
import { Callout } from '../Callout/Container';
import { Typography } from '../Typography/Container';

/**
 * MDX 내에서 임베드되어 사용하는 컴포넌트
 * mdx-components 파일에 추가하면 재귀적으로 동작하기 때문에
 * 불필요한 p, ol 등의 태그가 추가 됨.
 * 바로 임베딩되어 사용되어야 한다면 여기에 추가해야 함.
 */
export const MDXEmbedComponents = ({ slug }: PostType) => {
  return {
    ImageHorizonWrap: (props: Omit<ImageHorizonWrapProps, 'slug'>) => (
      <ImageHorizonWrap {...props} slug={slug} />
    ),
    ExternalAnchor,
    LeftTable,
    Typography: (props) => {
      return <Typography {...props}>{props.children}</Typography>;
    },
    Callout: (props) => {
      return <Callout {...props}>{props.children}</Callout>;
    },
  };
};
