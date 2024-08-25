import classNames from 'classnames';
import type { FunctionComponent, MouseEventHandler } from 'react';

type Props = {
  label: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export const Label: FunctionComponent<Props> = ({ label, onClick }) => {
  return (
    <div
      className={classNames(
        'select-none text-white-blue text-2xl font-bold mb-1 leading-10 border-b-[1px] border-base print:text-black',
        [
          onClick !== undefined &&
            'cursor-pointer hover:text-sub-blue duration-300',
        ],
      )}
      onClick={onClick}
    >
      {label}
    </div>
  );
};
