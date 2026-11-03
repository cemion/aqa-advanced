class TodoService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getTodo(id = 1) {
    const response = await fetch(`${this.baseUrl}/todos/${id}`);
    if (!response.ok) {
      throw new Error(`Помилка запиту todo: ${response.status}`);
    }
    return response.json();
  }
}

module.exports = TodoService;
