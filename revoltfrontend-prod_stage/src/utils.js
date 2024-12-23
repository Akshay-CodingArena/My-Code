export const prices = [
  {
    name: "Any",
    min: 0,
    max: 0,
  },
  {
    name: `$1 to $10`,
    min: 1,
    max: 10,
  },
  {
    name: `$10 to $100`,
    min: 10,
    max: 100,
  },
  {
    name: `$100 to $1000`,
    min: 100,
    max: 1000,
  },
];
export const ratings = [
  {
    name: "4stars & up",
    rating: 4,
  },

  {
    name: "3stars & up",
    rating: 3,
  },

  {
    name: "2stars & up",
    rating: 2,
  },

  {
    name: "1stars & up",
    rating: 1,
  },
];

export const MAP_STATUS = {
  1: "Active",
  0: "Deactive",
};

export const numberFormatPrice = (value) => {
  let numberVal = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);
  let result1 = numberVal.split("₹");
  let result2 = result1[1].split(".");
  let result =
    "₹ " + result2[0] + (parseInt(result2[1]) > 0 ? "." + result2[1] : "");
  return result;
};
