export const parseISO = (isoDate: string) => {
  const date = new Date(isoDate);
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};
