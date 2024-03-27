import { FunctionComponent, MouseEventHandler } from 'react';

type ContentHeadlineProps = {
  name: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  hover?: boolean;
};

const ContentHeadline: FunctionComponent<ContentHeadlineProps> = ({
  name,
  onClick,
  hover = true,
}) => {
  return (
    <div className="headline">
      <div
        id={name}
        onClick={onClick}
        className={`title${hover ? ' hover' : ''}`}
      >
        {name}
      </div>
    </div>
  );
};

export default ContentHeadline;
