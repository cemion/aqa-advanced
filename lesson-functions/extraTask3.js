function rentalCarCost(d) {
  const total = d * 40;
  if (d >= 7) {
    return total - 50;
  }
  if (d >= 3) {
    return total - 20;
  }
  return total;
}

function printRentalCosts(fromDay, toDay) {
  for (let d = fromDay; d <= toDay; d++) {
    const day = String(d).padStart(String(toDay).length);
    console.log(`Days: ${day}, cost: $${rentalCarCost(d)}`);
  }
}

printRentalCosts(1, 10);
