function solution(a, b) {
  return a.length < b.length ? a + b + a : b + a + b;
}

console.log(solution('1', '22'));
console.log(solution('22', '1'));
console.log(solution('', 'abc'));
