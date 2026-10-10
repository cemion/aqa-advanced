function sumArray(array) {
  if (!Array.isArray(array) || array.length <= 1) {
    return 0;
  }
  const sorted = [...array].sort((a, b) => a - b);
  return sorted.slice(1, -1).reduce((sum, n) => sum + n, 0);
}

console.log(sumArray([6, 2, 1, 8, 10]));
console.log(sumArray([1, 1, 11, 2, 3]));
console.log(sumArray([5]));
console.log(sumArray([]));
console.log(sumArray(null));
console.log(sumArray([3, 3]));
