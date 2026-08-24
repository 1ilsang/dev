import { type JSX } from 'react';

export const BasicTable = (props: JSX.IntrinsicElements['table']) => {
  return (
    <table
      {...props}
      className="mb-4 w-full table-fixed break-words text-white"
    >
      {props.children}
    </table>
  );
};
