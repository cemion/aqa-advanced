function sqInRect(lng, wdth) {
  if (lng === wdth) {
    return null;
  }

  const squares = [];
  let a = lng;
  let b = wdth;

  while (a > 0 && b > 0) {
    const side = Math.min(a, b);
    squares.push(side);

    if (a > b) {
      a -= side;
    } else {
      b -= side;
    }
  }

  return squares;
}

console.log(sqInRect(5, 3));
console.log(sqInRect(3, 5));
console.log(sqInRect(5, 5));
console.log(sqInRect(20, 14));

module.exports = sqInRect;
