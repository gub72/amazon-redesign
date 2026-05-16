export const getPrice = (price, type = "main") => {
  const priceStr = price ? price.toString() : "0";
  const [main, decimal] = priceStr.includes(".") ? priceStr.split(".") : [priceStr, "00"];

  if (type === "decimal") {
    return decimal.padEnd(2, "0").substring(0, 2);
  } else {
    return main;
  }
};

export const renderRating = (num) => {
  let rawRating = num;
  if (!rawRating) rawRating = 1;

  let convertedRating = Math.floor((rawRating / 2) * 10);
  let remainder = convertedRating % 10;
  convertedRating -= remainder;
  let stars = new Array(convertedRating / 10).fill("BsStarFill").join(",");
  remainder === 0
    ? (remainder = 0)
    : remainder > 5
    ? (remainder = 10)
    : (remainder = 5);
  convertedRating += remainder;
  convertedRating /= 10;

  if (remainder) stars += ",BsStarHalf";
  stars = stars.split(",");

  if (stars.length < 5) {
    const remainder = new Array(5 - stars.length);
    remainder.fill("BsStar");
    stars = [...stars, ...remainder];
  }
  return stars;
};

export const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const getTotalPrice = (cart) =>
  cart.reduce((totalPrice, item) => (totalPrice += parseFloat(item.price)), 0);

export const getError = (firebaseErr) => {
  // Firebase error (auth/invalid-credentials) => invalid credentials
  if (firebaseErr.includes("Firebase: Error (auth/")) {
    return firebaseErr
      .replace("Firebase: Error (auth/", "")
      .replace(").", "")
      .split("-")
      .join(" ");
  }
};
