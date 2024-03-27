import { FunctionComponent } from 'react';

import { WorkCardContainerProps } from '../Container';

import ProjectDate from './ProjectDate';

type LeftSideProps = Pick<
  WorkCardContainerProps,
  'workStartDate' | 'workEndDate'
> & {
  href: string;
  logoUrl: string;
  alt: string;
  format?: string;
};

const LeftSide: FunctionComponent<LeftSideProps> = ({
  href,
  logoUrl,
  alt,
  workStartDate,
  workEndDate,
  format = 'yyyy.MM',
}) => {
  return (
    <div className="left-side">
      <a
        className="hashtag"
        rel="noopener noreferrer"
        target="_blank"
        href={href}
      >
        <img className="logo" src={logoUrl} alt={alt} />
      </a>
      <ProjectDate
        startDate={workStartDate}
        endDate={workEndDate}
        format={format}
      />
    </div>
  );
};

export default LeftSide;
