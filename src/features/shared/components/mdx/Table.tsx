import type { JSX } from 'react';

export const Table = (props: JSX.IntrinsicElements['table']) => {
  return (
    <table
      {...props}
      className="w-full mb-4 text-[#dfdfdf] table-fixed break-words"
    >
      {props.children}
    </table>
  );
};
