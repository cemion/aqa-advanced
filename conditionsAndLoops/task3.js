const number = 5;

console.log('Цикл for:');
for (let i = 1; i <= 10; i++) {
  console.log(`${number} x ${String(i).padEnd(2)} = ${number * i}`);
}

console.log('Цикл while:');
let i = 1;
while (i <= 10) {
  console.log(`${number} x ${String(i).padEnd(2)} = ${number * i}`);
  i++;
}
