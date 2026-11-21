const { createApiClient } = require('../../lesson-api-json/api-client');

class BaseController {
  constructor(baseURL) {
    this.client = createApiClient(baseURL);
  }

  static authHeader(token) {
    return { Authorization: `Bearer ${token}` };
  }
}

module.exports = { BaseController };
