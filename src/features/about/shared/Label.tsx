import classNames from 'classnames';
import type { FunctionComponent, KeyboardEventHandler } from 'react';

type Props = {
  label: string;
  onClick?: () => void;
  ariaExpanded?: boolean;
};

export const Label: FunctionComponent<Props> = ({
  label,
  onClick,
  ariaExpanded,
}) => {
  const handleKeyDown: KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    onClick?.();
  };

  if (onClick === undefined) {
    return (
      <div className="select-none text-white-blue text-2xl font-bold mb-1 leading-10 border-b-[1px] border-base print:text-black">
        {label}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={classNames(
        'select-none text-white-blue text-2xl font-bold mb-1 leading-10 border-x-0 border-t-0 border-b border-base border-solid print:text-black w-full text-left bg-transparent p-0 font-inherit',
        'cursor-pointer hover:text-sub-blue duration-300',
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-expanded={ariaExpanded}
    >
      {label}
    </button>
  );
};
