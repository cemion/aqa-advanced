const { BaseController } = require('./base.controller');

class CommentsController extends BaseController {
  create(comment) {
    return this.client.post('/comments', comment);
  }
}

module.exports = { CommentsController };
