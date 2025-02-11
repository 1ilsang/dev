import type { FunctionComponent } from 'react';
import { BLIND } from '../work/data/blind/sum-up';

export const CareerYear: FunctionComponent = () => {
  const current = Number(new Date());
  const start = BLIND.workStartDate;
  const UNIX_YEAR = 1970;
  const FULL_YEAR = 1;

  return (
    <span suppressHydrationWarning>
      {new Date(current - start).getFullYear() - UNIX_YEAR + FULL_YEAR}
    </span>
  );
};
