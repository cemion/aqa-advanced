function divide(numerator, denominator) {
  if (
    typeof numerator !== 'number' ||
    typeof denominator !== 'number' ||
    Number.isNaN(numerator) ||
    Number.isNaN(denominator)
  ) {
    throw new TypeError('Both arguments must be numbers');
  }
  if (denominator === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return numerator / denominator;
}

try {
  console.log('Result:', divide(10, 2));
} catch (error) {
  console.error('Error:', error.message);
} finally {
  console.log('Робота завершена');
}

try {
  console.log('Result:', divide(10, 0));
} catch (error) {
  console.error('Error:', error.message);
} finally {
  console.log('Робота завершена');
}

try {
  console.log('Result:', divide('10', 2));
} catch (error) {
  console.error('Error:', error.message);
} finally {
  console.log('Робота завершена');
}

try {
  console.log('Result:', divide(10, null));
} catch (error) {
  console.error('Error:', error.message);
} finally {
  console.log('Робота завершена');
}
