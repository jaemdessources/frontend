export default function formatMoney(amout = 0) {
  const options = {
    style: "currency",
    currency: "USD",
    minimumFractiondigits: 2,
  };

  if (amout % 100 === 0) {
    options.minimumFractiondigits = 0;
  }

  const formatter = Intl.NumberFormat("en-US", options);
  return formatter.format(amout / 100);
}
