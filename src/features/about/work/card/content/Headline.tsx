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
    <div className={`headline${hover ? ' hover' : ''}`} onClick={onClick}>
      <div id={name} className="title">
        {name}
      </div>
    </div>
  );
};

export default ContentHeadline;
