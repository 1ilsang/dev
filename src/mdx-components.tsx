import type { MDXComponents } from 'mdx/types';
import { Callout } from '~/shared/components/Callout/Container';
import { HeadingFactory } from '~/shared/components/mdx/Headings';
import {
  ImageTag,
  type ImageTagProps,
} from '~/shared/components/mdx/img/ImageTag';
import { BasicTable } from '~/shared/components/mdx/table/BasicTable';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  const parser = {
    ...components,
    Callout: (props) => {
      return <Callout {...props}>{parser.p(props)}</Callout>;
    },
    img: (props: ImageTagProps) => <ImageTag {...props} />,
    blockquote: (props) => {
      // > ... 참조
      return (
        <blockquote className="pl-4 text-[#8b949e] border-l-[0.25rem] border-[#425061]">
          {props.children}
        </blockquote>
      );
    },
    p: (props) => <p className="mt-4 mb-4">{props.children}</p>,
    ol: (props) => (
      <ol className="min-[790px]:ml-6 ml-4 list-decimal">{props.children}</ol>
    ),
    ul: (props) => (
      <ul className="min-[790px]:ml-6 ml-4 list-disc">{props.children}</ul>
    ),
    table: (props) => <BasicTable {...props} />,
    ...HeadingFactory(),
  };
  return parser;
}
