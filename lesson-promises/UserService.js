class UserService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getUser(id = 1) {
    const response = await fetch(`${this.baseUrl}/users/${id}`);
    if (!response.ok) {
      throw new Error(`Помилка запиту user: ${response.status}`);
    }
    return response.json();
  }
}

module.exports = UserService;
