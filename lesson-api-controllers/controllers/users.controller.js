const { BaseController } = require('./base.controller');

class UsersController extends BaseController {
  getById(id) {
    return this.client.get(`/users/${id}`);
  }
}

module.exports = { UsersController };
