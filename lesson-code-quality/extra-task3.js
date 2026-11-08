function countNines(n) {
  let count = 0;

  for (let position = 1; position <= n; position *= 10) {
    const higher = Math.floor(n / (position * 10));
    const current = Math.floor(n / position) % 10;
    const lower = n % position;

    count += higher * position;

    if (current === 9) {
      count += lower + 1;
    }
  }

  return count;
}

console.log(countNines(8));
console.log(countNines(9));
console.log(countNines(10));
console.log(countNines(98));
console.log(countNines(1000));

module.exports = countNines;
