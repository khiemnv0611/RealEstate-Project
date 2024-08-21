export const formatMoney = (number) => {
  if (!+number) return 0;
  return Number(+number.toFixed(1)).toLocaleString();
};
