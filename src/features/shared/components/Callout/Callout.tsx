import classNames from 'classnames';
import type { FunctionComponent } from 'react';

type CalloutType = 'info' | 'warning' | 'error';
type CalloutValue = 'ℹ️' | '⚠️' | '❗';

const TYPE_LABELS: Record<CalloutType, string> = {
  info: '정보',
  warning: '주의',
  error: '오류',
};

export const Callout = ({
  className,
  children,
  info = false,
  warning = false,
  error = false,
}: {
  className?: string;
  children: React.ReactNode;
  info?: boolean;
  warning?: boolean;
  error?: boolean;
}) => {
  const type: CalloutType = info ? 'info' : warning ? 'warning' : 'error';
  return (
    <div
      role="note"
      aria-label={TYPE_LABELS[type]}
      className={classNames(
        'flex flex-row gap-1.75 px-4 py-1 rounded-lg max-w-full overflow-hidden',
        className,
        {
          'bg-blue-100 text-blue-800': info,
          'bg-yellow-100 text-yellow-800': warning,
          'bg-red-100 text-red-800': error,
        },
      )}
    >
      <Type type={type} />
      <div className="text-[0.95rem] pr-1 flex-1 min-w-0">{children}</div>
    </div>
  );
};

const Type: FunctionComponent<{ type: CalloutType }> = ({ type }) => {
  const typeMap: Record<CalloutType, CalloutValue> = {
    info: 'ℹ️',
    warning: '⚠️',
    error: '❗',
  };
  return (
    <div className="text-2xl pt-3.5" aria-hidden="true">
      {typeMap[type]}
    </div>
  );
};
