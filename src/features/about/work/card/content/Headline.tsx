import classNames from 'classnames';
import type {
  FunctionComponent,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react';

type ContentHeadlineProps = {
  name: string;
  description: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  hover?: boolean;
  underline?: boolean;
  ariaExpanded?: boolean;
  controlsId?: string;
};

const ContentHeadline: FunctionComponent<ContentHeadlineProps> = ({
  name,
  onClick,
  hover = true,
  underline = true,
  description,
  ariaExpanded,
  controlsId,
}) => {
  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!onClick || (e.key !== 'Enter' && e.key !== ' ')) return;
    e.preventDefault();
    onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
  };

  return (
    <>
      <div
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-expanded={onClick ? ariaExpanded : undefined}
        aria-controls={onClick ? controlsId : undefined}
        className={classNames('flex', [
          onClick &&
            hover &&
            'cursor-pointer duration-300 hover:text-highlight',
        ])}
        onClick={onClick}
        onKeyDown={onClick ? handleKeyDown : undefined}
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
