const users = [
  { name: 'Андрій', email: 'andrii@example.com', age: 25, city: 'Київ' },
  { name: 'Оксана', email: 'oksana@example.com', phone: '+380501234567', isAdmin: true },
  { name: 'Дмитро', age: 19, skills: ['JavaScript', 'Testing'] },
];

for (const { name, email = 'не вказано', age = 'не вказано', ...otherFields } of users) {
  console.log(`Ім'я: ${name}, Email: ${email}, Вік: ${age}`);
  console.log('Інші поля:', otherFields);
}
