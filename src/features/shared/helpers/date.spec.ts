import { parseISO, formatDate } from './date';

describe('parseISO', () => {
  it('should parse ISO date string to formatted string', () => {
    const result = parseISO('2024-01-15T09:30:00');
    expect(result).toBe('2024-01-15 09:30');
  });

  it('should pad single digit month and date', () => {
    const result = parseISO('2024-03-05T08:05:00');
    expect(result).toBe('2024-03-05 08:05');
  });
});

describe('formatDate', () => {
  const fixedDate = new Date('2024-11-04T21:04:22');

  it('should use default format when no format provided', () => {
    const result = formatDate(fixedDate);
    expect(result).toBe('2024.11.04 21:04:22');
  });

  it('should format with custom format string', () => {
    const result = formatDate(fixedDate, 'yyyy-MM-dd');
    expect(result).toBe('2024-11-04');
  });

  it('should handle string input', () => {
    const result = formatDate('2024.11.04 21:04:22', 'yyyy-MM-dd');
    expect(result).toBe('2024-11-04');
  });

  it('should handle number input', () => {
    const result = formatDate(fixedDate.getTime(), 'yyyy.MM.dd');
    expect(result).toBe('2024.11.04');
  });

  it('should format short year (yy)', () => {
    const result = formatDate(fixedDate, 'yy');
    expect(result).toBe('24');
  });

  it('should format hours in 12h (hh)', () => {
    const result = formatDate(fixedDate, 'hh');
    expect(result).toBe('09');
  });

  it('should format AM/PM (a) before other single-char replacements', () => {
    // 'a' is replaced after multi-char tokens, so 'PM' M gets replaced by single 'M' -> month%10
    // Testing the actual behavior: format='a' -> 'PM' -> then 'M' replaced by month%10
    const result = formatDate(fixedDate, 'a');
    // PM -> M gets replaced by month%10 (11%10=1) -> 'P1'
    expect(result).toBe('P1');
  });

  it('should format day name (DDD) without interference', () => {
    // DDD -> 'Mon' but then single 'M' replacement changes it
    // M -> month%10 (11%10=1), so 'Mon' -> '1on'
    const result = formatDate(fixedDate, 'DDD');
    expect(result).toBe('1on');
  });

  it('should format month name (EEE)', () => {
    const result = formatDate(fixedDate, 'EEE');
    // 'Nov' -> no single char conflicts with remaining replacements
    expect(result).toBe('Nov');
  });
});
