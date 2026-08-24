import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import { Fragment } from 'react';

type TableRowItem = string | { w: string; content: string };
type LeftTableProps = {
  rows: Array<TableRowItem>[];
};

export const LeftTable: FunctionComponent<LeftTableProps> = ({ rows }) => {
  return (
    <table className="mb-4 w-full break-words text-white">
      <THead rows={rows[0]} />
      <tbody>
        {rows.slice(1).map((row, index) => (
          <TableRow key={index} row={row} />
        ))}
      </tbody>
    </table>
  );
};

const THead = ({ rows }) => {
  return (
    <thead>
      <tr>
        {rows.map((item, index) => {
          return (
            <th
              key={index}
              className={classNames(
                'border-b border-base/70 p-2 text-left text-sm font-normal',
                item.w,
              )}
            >
              {typeof item === 'string' ? item : item.content}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

const PlainTextTd = ({ text }) => {
  const contents = text.split('\n');
  return (
    <>
      {contents.map((content) => {
        const parsedContent = content.replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a class="underline-highlight-fade" href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
        );
        return (
          <Fragment key={content}>
            <span
              key={content}
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
            <br />
          </Fragment>
        );
      })}
    </>
  );
};
const TableRow: FunctionComponent<{ row: TableRowItem[] }> = ({ row }) => {
  return (
    <tr>
      {row.map((text, index) => {
        const plainText = typeof text === 'string';
        return (
          <td
            key={index}
            className="border-b border-base/70 p-2 text-left text-sm"
          >
            {plainText ? (
              <PlainTextTd text={text} />
            ) : (
              <span className={classNames(text.w)}>{text.content}</span>
            )}
          </td>
        );
      })}
    </tr>
  );
};
