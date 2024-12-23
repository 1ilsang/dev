import classNames from 'classnames';
import type { FunctionComponent, MouseEventHandler } from 'react';

type ContentHeadlineProps = {
  name: string;
  description: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  hover?: boolean;
  underline?: boolean;
};

const ContentHeadline: FunctionComponent<ContentHeadlineProps> = ({
  name,
  onClick,
  hover = true,
  underline = true,
  description,
}) => {
  return (
    <>
      <div
        className={classNames('flex', [
          hover && 'cursor-pointer duration-300 hover:text-highlight',
        ])}
        onClick={onClick}
      >
        <div id={name} className="text-2xl font-bold select-none leading-9">
          {name}
        </div>
      </div>
      <div
        className={classNames('mb-4 select-none', [
          underline &&
            'border-dotted border-b-[1px] border-white-blue print:border-black',
        ])}
      >
        {description}
      </div>
    </>
  );
};

export default ContentHeadline;
