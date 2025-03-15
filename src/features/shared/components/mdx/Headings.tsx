import classNames from 'classnames';
import { Children, type JSX } from 'react';
import { jsx } from 'react/jsx-runtime';

type Heading = 'h2' | 'h3' | 'h4' | 'h5';
type HeadingGenerator = (props: JSX.IntrinsicElements[Heading]) => JSX.Element;
type HeadingFactory = Record<Heading, HeadingGenerator>;

export const HeadingFactory = (): HeadingFactory => {
  const commonClass = 'font-semibold leading-snug pb-0.5 pt-6 mb-2 group';

  const headingClass: Record<Heading, string> = {
    h2: 'text-3xl mt-12 border-b border-[hsl(210deg_18%_87%_/100%)]',
    h3: 'text-2xl mt-8',
    h4: 'text-xl mt-6',
    h5: 'text-lg pt-4 mb-0.5',
  };

  const getHeadingElement =
    (TagName: Heading): HeadingGenerator =>
    (props) => {
      const AnchorProps = props.children[0].props;
      const AnchorSpan = AnchorProps.children;
      const Anchor = jsx('a', {
        ...AnchorProps,
        className: classNames(
          AnchorSpan.props.className,
          'opacity-0 group-hover:opacity-100 ease-in-out transition-opacity duration-300',
          'before:absolute before:w-[40px] before:left-[-25px] before:content-["⧉"] before:text-[#61768f] before:mr-2',
        ),
      });

      const children = Children.toArray(props.children);
      const PlainText = children.slice(1);

      return (
        <TagName
          {...props}
          className={classNames(commonClass, headingClass[TagName])}
        >
          {Anchor}
          {PlainText}
        </TagName>
      );
    };

  const result = (['h2', 'h3', 'h4', 'h5'] as Heading[]).reduce((acc, cur) => {
    return {
      ...acc,
      [cur]: getHeadingElement(cur),
    };
  }, {} as HeadingFactory);

  return result;
};
