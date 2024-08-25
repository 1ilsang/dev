import classNames from 'classnames';
import type { FunctionComponent, PropsWithChildren } from 'react';

type SectionProps = PropsWithChildren & {
  top?: boolean;
};
export const Section: FunctionComponent<SectionProps> = ({
  top = false,
  children,
}) => {
  return (
    <li
      className={classNames(
        "pl-4 mt-1 before:content-['❑'] print:before:content-['•'] before:mr-2",
        [!top && 'mt-8 print:mt-4'],
      )}
    >
      {children}
    </li>
  );
};

type ParagraphProps = PropsWithChildren;
export const Paragraph: FunctionComponent<ParagraphProps> = ({ children }) => {
  return <ul className="pl-4 grid">{children}</ul>;
};

type SentenceProps = PropsWithChildren & { value: string };
export const Sentence: FunctionComponent<SentenceProps> = ({
  value,
  children,
}) => {
  return (
    <li className="mt-0.5 pl-4 before:content-['❑'] before:mr-2 print:before:content-['•']">
      {value}
      {children}
    </li>
  );
};
