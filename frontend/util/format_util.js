export const formatDollarString = (num) => {
  return num.toLocaleString("en-US", {
    style: "currency", currency: "USD"
  });
}

