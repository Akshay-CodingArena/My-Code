export const numberFormatPrice = (value) => {
  let numberVal = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);
  let result1 = numberVal.split("₹");
  let result2 = result1[1].split(".");
  let result =
    "₹" + result2[0] + (parseInt(result2[1]) > 0 ? "." + result2[1] : "");
  return result;
};
