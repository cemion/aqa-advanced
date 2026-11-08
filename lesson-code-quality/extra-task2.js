function minValue(values) {
  const uniqueDigits = [...new Set(values)];

  uniqueDigits.sort((a, b) => a - b);

  return Number(uniqueDigits.join(''));
}

console.log(minValue([1, 3, 1]));
console.log(minValue([5, 7, 5, 9, 7]));
console.log(minValue([1, 9, 3, 1, 7, 4, 6, 6, 7]));

module.exports = minValue;
