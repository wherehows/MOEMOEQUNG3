export const changeUTCToYYYYMMDD = (utc: string) => {
  const kstDate = new Date(utc);
  kstDate.setTime(kstDate.getTime() + 9 * 60 * 60 * 1000);

  const year = kstDate.getFullYear();
  const month = (kstDate.getMonth() + 1).toString().padStart(2, '0');
  const day = kstDate.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};
