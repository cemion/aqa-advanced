const person = {
  firstName: 'Марія',
  lastName: 'Шевчук',
  age: 28,
};

person.email = 'maria.shevchuk@example.com';
delete person.age;

console.log(person);
