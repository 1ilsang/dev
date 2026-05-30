import type { Company } from '../models';

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

type EmploymentPeriod = Pick<Company, 'workStartDate' | 'workEndDate'>;

export const getEmploymentDurationMs = (
  companies: EmploymentPeriod[],
  referenceDate = Date.now(),
): number =>
  companies.reduce((total, { workStartDate, workEndDate }) => {
    const end = workEndDate ?? referenceDate;
    return total + Math.max(0, end - workStartDate);
  }, 0);

/** sum-up 재직 기간 합산 → 한국식 N년차 (1년차부터 시작) */
export const getCareerYear = (
  companies: EmploymentPeriod[],
  referenceDate = Date.now(),
): number => {
  const totalMs = getEmploymentDurationMs(companies, referenceDate);
  return Math.floor(totalMs / MS_PER_YEAR) + 1;
};
