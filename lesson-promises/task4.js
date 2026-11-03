const TodoService = require('./TodoService');
const UserService = require('./UserService');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const todoService = new TodoService(BASE_URL);
const userService = new UserService(BASE_URL);

async function main() {
  try {
    const allResult = await Promise.all([todoService.getTodo(), userService.getUser()]);
    const [todo, user] = allResult;
    console.log('--- Promise.all ---');
    console.log('Todo:', todo);
    console.log('User:', user);
  } catch (error) {
    console.log(`Помилка Promise.all: ${error.message}`);
  }

  try {
    const raceResult = await Promise.race([todoService.getTodo(), userService.getUser()]);
    console.log('--- Promise.race ---');
    console.log('Перший результат:', raceResult);
  } catch (error) {
    console.log(`Помилка Promise.race: ${error.message}`);
  }
}

main();
