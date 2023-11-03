export const changeUTCToYYYYMMDD = (utc: string) => {
  // UTC 문자열을 Date 객체로 변환하고, 바로 한국 시간대로 변환
  const kstDate = new Date(utc);
  kstDate.setTime(kstDate.getTime() + 9 * 60 * 60 * 1000); // 9시간을 더해 한국 시간대로 변환

  const year = kstDate.getFullYear();
  const month = (kstDate.getMonth() + 1).toString().padStart(2, '0');
  const day = kstDate.getDate().toString().padStart(2, '0');

  return `${year}/${month}/${day}`;
};
