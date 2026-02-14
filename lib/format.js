export const currencySymbol = "৳";

export function formatPrice(value) {
  if (value === undefined || value === null || value === "") {
    return "Call for price";
  }
  const numberValue = Number(value);
  if (Number.isNaN(numberValue)) {
    return "Call for price";
  }
  return `${currencySymbol} ${numberValue.toLocaleString("en-US")}`;
}
