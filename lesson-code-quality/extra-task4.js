function isPrime(num) {
  if (num < 2) {
    return false;
  }
  if (num === 2) {
    return true;
  }
  if (num % 2 === 0) {
    return false;
  }

  for (let divisor = 3; divisor * divisor <= num; divisor += 2) {
    if (num % divisor === 0) {
      return false;
    }
  }

  return true;
}

function gap(g, m, n) {
  let previousPrime = null;

  for (let num = m; num <= n; num++) {
    if (!isPrime(num)) {
      continue;
    }

    if (previousPrime !== null && num - previousPrime === g) {
      return [previousPrime, num];
    }

    previousPrime = num;
  }

  return null;
}

console.log(gap(2, 3, 50));
console.log(gap(2, 5, 7));
console.log(gap(2, 5, 5));
console.log(gap(4, 130, 200));
console.log(gap(6, 100, 110));

module.exports = gap;
