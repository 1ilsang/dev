import { companyData } from '../data/company';
import { getCareerYear, getEmploymentDurationMs } from './careerYear';

describe('getEmploymentDurationMs', () => {
  it('should sum employment periods and treat missing workEndDate as ongoing', () => {
    const referenceDate = new Date('2026-05-30T12:00:00+09:00').getTime();

    const durationMs = getEmploymentDurationMs(companyData, referenceDate);

    expect(durationMs).toBeGreaterThan(7 * 365 * 24 * 60 * 60 * 1000);
    expect(durationMs).toBeLessThan(8 * 366 * 24 * 60 * 60 * 1000);
  });
});

describe('getCareerYear', () => {
  it('should return career year from all company sum-up dates', () => {
    const referenceDate = new Date('2026-05-30T12:00:00+09:00').getTime();

    expect(getCareerYear(companyData, referenceDate)).toBe(8);
  });

  it('should return 1년차 for employment under one year', () => {
    const referenceDate = new Date('2018-06-01T12:00:00+09:00').getTime();

    expect(
      getCareerYear(
        [{ workStartDate: companyData[3].workStartDate }],
        referenceDate,
      ),
    ).toBe(1);
  });

  it('should ignore gaps between employments', () => {
    const referenceDate = new Date('2026-05-30T12:00:00+09:00').getTime();
    const earliestStartOnly = getCareerYear(
      [{ workStartDate: companyData[3].workStartDate }],
      referenceDate,
    );
    const allEmployments = getCareerYear(companyData, referenceDate);

    expect(allEmployments).toBeLessThan(earliestStartOnly);
  });
});
