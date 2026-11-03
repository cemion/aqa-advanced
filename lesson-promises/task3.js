const BASE_URL = 'https://jsonplaceholder.typicode.com';

async function getTodo() {
  const response = await fetch(`${BASE_URL}/todos/1`);
  if (!response.ok) {
    throw new Error(`Помилка запиту todo: ${response.status}`);
  }
  return response.json();
}

async function getUser() {
  const response = await fetch(`${BASE_URL}/users/1`);
  if (!response.ok) {
    throw new Error(`Помилка запиту user: ${response.status}`);
  }
  return response.json();
}

async function main() {
  try {
    const allResult = await Promise.all([getTodo(), getUser()]);
    const [todo, user] = allResult;
    console.log('--- Promise.all ---');
    console.log('Todo:', todo);
    console.log('User:', user);
  } catch (error) {
    console.log(`Помилка Promise.all: ${error.message}`);
  }

  try {
    const raceResult = await Promise.race([getTodo(), getUser()]);
    console.log('--- Promise.race ---');
    console.log('Перший результат:', raceResult);
  } catch (error) {
    console.log(`Помилка Promise.race: ${error.message}`);
  }
}

main();
