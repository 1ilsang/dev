import { DayList, MonthList } from '../constants/date';

const pad = (value: number) => (value < 10 ? `0${value}` : `${value}`);

export const parseISO = (isoDate: string) => {
  const date = new Date(isoDate);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const padToDigits = (num: number, digits = 2) => {
  return num.toString().padStart(digits, '0');
};

/**
 * @default format: "yyyy.MM.dd HH:mm:ss"
 *
 * @example
 * ```ts
 * const formattedDate = formatDate(new Date(), 'yyyy.MM.dd, HH:mm:ss z');
 * // 2022.11.04, 21:04:22 GMT+09:00
 *
 * const formattedDate = formatDate(new Date(), 'DDD D, EEE E, hh a, h:hh:HH');
 * // Thu Thursday, Nov November, 09 PM, 9:09:21
 * ```
 *
 * @Note
 * Used RegExp alphabet list
 *   - a|d|D|E|h|H|m|M|s|y|z
 */
export const formatDate = (
  time: Date | number | string,
  format = 'yyyy.MM.dd HH:mm:ss',
) => {
  let formattedTime = time;
  if (typeof time === 'string') {
    formattedTime = time.replaceAll('.', '-').replace(' ', 'T');
  }

  const dateObject = new Date(formattedTime);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const date = dateObject.getDate();
  const day = dateObject.getDay();
  const hour = dateObject.getHours();
  const minute = dateObject.getMinutes();
  const second = dateObject.getSeconds();

  const timezoneOffset = dateObject.getTimezoneOffset();
  const absTimezone = Math.abs(timezoneOffset);
  const timezoneSign = timezoneOffset < 0 ? '+' : '-';
  const timezoneHour = padToDigits(Math.floor(absTimezone / 60));
  const timezoneMinute = padToDigits(absTimezone % 60);
  const timezone = `${timezoneSign}${timezoneHour}:${timezoneMinute}`;

  return format
    .replaceAll('yyyy', `${year}`)
    .replaceAll('yy', `${padToDigits(year % 100)}`)
    .replaceAll('MM', `${padToDigits(month)}`)
    .replaceAll('dd', `${padToDigits(date)}`)
    .replaceAll('DDD', `${DayList[day].slice(0, 3)}`)
    .replaceAll('EEE', `${MonthList[month - 1].slice(0, 3)}`)
    .replaceAll('hh', `${padToDigits(hour % 12)}`)
    .replaceAll('HH', `${padToDigits(hour)}`)
    .replaceAll('mm', `${padToDigits(minute)}`)
    .replaceAll('ss', `${padToDigits(second)}`)
    .replaceAll('a', `${hour > 12 ? 'PM' : 'AM'}`)
    .replaceAll('y', `${year % 10}`)
    .replaceAll('M', `${month % 10}`)
    .replaceAll('d', `${date % 10}`)
    .replaceAll('D', `${DayList[day]}`)
    .replaceAll('E', `${MonthList[month - 1]}`)
    .replaceAll('h', `${(hour % 12) % 10}`)
    .replaceAll('H', `${hour % 10}`)
    .replaceAll('m', `${minute % 10}`)
    .replaceAll('s', `${second % 10}`)
    .replaceAll('z', `${timezone}`);
};
