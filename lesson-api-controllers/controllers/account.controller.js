const { BaseController } = require('./base.controller');

class AccountController extends BaseController {
  generateToken(credentials) {
    return this.client.post('/Account/v1/GenerateToken', credentials);
  }

  login(credentials) {
    return this.client.post('/Account/v1/Login', credentials);
  }

  async getToken(credentials) {
    const response = await this.login(credentials);
    return response.data.token;
  }

  getUser(userId, token) {
    return this.client.get(`/Account/v1/User/${userId}`, {
      headers: BaseController.authHeader(token),
    });
  }
}

module.exports = { AccountController };
