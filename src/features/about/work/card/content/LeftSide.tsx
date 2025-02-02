import type { FunctionComponent } from 'react';
import { memo } from 'react';

import type { WorkCardContainerProps } from '../Container';

import { ProjectDate } from './ProjectDate';
import classNames from 'classnames';

type LeftSideProps = Pick<
  WorkCardContainerProps,
  'workStartDate' | 'workEndDate'
> & {
  href: string;
  logoUrl: string;
  alt: string;
  format?: string;
  objectFit?:
    | 'fill'
    | 'contain'
    | 'cover'
    | 'none'
    | (CSSStyleDeclaration['objectFit'] & {});
};

const LeftSide: FunctionComponent<LeftSideProps> = memo(
  ({
    href,
    logoUrl,
    alt,
    workStartDate,
    workEndDate,
    format = 'yyyy.MM',
    objectFit = 'cover',
  }) => {
    return (
      <div className="w-48">
        <a rel="noopener noreferrer" target="_blank" href={href}>
          <img
            className={classNames(
              'w-16 h-16 duration-300 ease-in-out hover:drop-shadow-[2px_2px_4px_lightgray] hover:invert-[2%]',
              { 'object-fill': objectFit === 'fill' },
              { 'object-contain': objectFit === 'contain' },
              { 'object-cover': objectFit === 'cover' },
              { 'object-none': objectFit === 'none' },
            )}
            src={logoUrl}
            alt={alt}
          />
        </a>
        <ProjectDate
          className="mt-1"
          startDate={workStartDate}
          endDate={workEndDate}
          format={format}
        />
      </div>
    );
  },
);
LeftSide.displayName = 'LeftSide';

export default LeftSide;
