function countdown(num) {
  if (num <= 0) {
    console.log('Значення має бути 1 або більше');
    return;
  }
  console.log(num);
  if (num > 1) {
    countdown(num - 1);
  }
}

countdown(5);
countdown(0);
countdown(-3);
