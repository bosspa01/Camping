const calNight = (checkIn, checkOut) => {
  const milliDay = checkOut.getTime() - checkIn.getTime();
  const diffDay = milliDay / (1000 * 60 * 60 * 24);
  return diffDay;
};

export const calTotal = (checkIn, checkOut, price) => {
  if (!checkIn || !checkOut) return;
  const totalNights = calNight(checkIn, checkOut);
  const total = totalNights * price;
  //   console.log("*", totalNights, total);
  return { total, totalNights };
};
