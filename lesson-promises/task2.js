const BASE_URL = 'https://jsonplaceholder.typicode.com';

function getTodo() {
  return fetch(`${BASE_URL}/todos/1`).then((response) => {
    if (!response.ok) {
      throw new Error(`Помилка запиту todo: ${response.status}`);
    }
    return response.json();
  });
}

function getUser() {
  return fetch(`${BASE_URL}/users/1`).then((response) => {
    if (!response.ok) {
      throw new Error(`Помилка запиту user: ${response.status}`);
    }
    return response.json();
  });
}

const allResult = Promise.all([getTodo(), getUser()]);
const raceResult = Promise.race([getTodo(), getUser()]);

allResult
  .then(([todo, user]) => {
    console.log('--- Promise.all ---');
    console.log('Todo:', todo);
    console.log('User:', user);
  })
  .catch((error) => console.log(`Помилка Promise.all: ${error.message}`));

raceResult
  .then((result) => {
    console.log('--- Promise.race ---');
    console.log('Перший результат:', result);
  })
  .catch((error) => console.log(`Помилка Promise.race: ${error.message}`));
