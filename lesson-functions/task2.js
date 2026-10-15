function isAdult(age) {
  if (age >= 18) {
    return true;
  }
  return false;
}

console.log('Age 25 is adult:', isAdult(25));
console.log('Age 15 is adult:', isAdult(15));
