function isAllCaps(str) {
  return str === str.toUpperCase();
}

const testStrings = [
  'с',
  'C',
  'hello I AM DONALD',
  'HELLO I AM DONALD',
  'ACSKLDFJSgSKLDFJSKLDFJ',
  'ACSKLDFJSGSKLDFJSKLDFJ',
  '123 !?',
];

const maxLength = Math.max(...testStrings.map((str) => str.length)) + 2;

for (const str of testStrings) {
  const quoted = `"${str}"`.padEnd(maxLength);
  console.log(`${quoted} -> ${isAllCaps(str)}`);
}
