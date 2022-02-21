const verifyTimeWithoutTimeZone = (str) =>
  /[0-1][0-9]:[0-5][0-9]:[0-5][0-9]/.test(str) ||
  /2[0-3]:[0-5][0-9]:[0-5][0-9]/.test(str);
const verifyDate = (str) => {
  if (!/[0-9][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]/.test(str)) return false;
  const day = Number(str.substr(8, 2));
  const month = Number(str.substr(5, 2));
  const year = Number(str.substr(0, 4));
  if (month === 0 || month > 12) return false;
  if (day === 0 || day > 31) return false;
  if (day < 29) return true;
  if (
    month === 1 ||
    month === 3 ||
    month === 5 ||
    month === 7 ||
    month === 8 ||
    month === 10 ||
    month === 12
  )
    return true;
  if (day === 31) return false;
  if (month === 4 || month === 6 || month === 9 || month === 11) return true;
  if (day === 29 && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0))
    return true;
  return false;
};

module.exports = {
  verifyTimeWithoutTimeZone,
  verifyDate,
};
