function getRectangleAreaDeclaration(width, height) {
  return width * height;
}

const getRectangleAreaExpression = function (width, height) {
  return width * height;
};

const getRectangleAreaArrow = (width, height) => width * height;

console.log('Function declaration:', getRectangleAreaDeclaration(5, 10));
console.log('Function expression:', getRectangleAreaExpression(5, 10));
console.log('Arrow function:', getRectangleAreaArrow(5, 10));