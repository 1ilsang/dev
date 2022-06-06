const pad = (value: number) => (value < 10 ? `0${value}` : `${value}`);

export const parseISO = (isoDate: string) => {
  const date = new Date(isoDate);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};
