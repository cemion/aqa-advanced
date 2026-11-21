const { BaseController } = require('./base.controller');

class PostsController extends BaseController {
  getAll(params) {
    return this.client.get('/posts', { params });
  }

  getById(id) {
    return this.client.get(`/posts/${id}`);
  }

  create(post) {
    return this.client.post('/posts', post);
  }
}

module.exports = { PostsController };
