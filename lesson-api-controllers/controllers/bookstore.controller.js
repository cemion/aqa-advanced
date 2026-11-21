const { BaseController } = require('./base.controller');

class BookStoreController extends BaseController {
  getBooks() {
    return this.client.get('/BookStore/v1/Books');
  }

  getBook(isbn) {
    return this.client.get('/BookStore/v1/Book', { params: { ISBN: isbn } });
  }

  addBooks(userId, isbns, token) {
    return this.client.post(
      '/BookStore/v1/Books',
      { userId, collectionOfIsbns: isbns.map((isbn) => ({ isbn })) },
      { headers: BaseController.authHeader(token) },
    );
  }

  deleteAllBooks(userId, token) {
    return this.client.delete('/BookStore/v1/Books', {
      params: { UserId: userId },
      headers: BaseController.authHeader(token),
    });
  }
}

module.exports = { BookStoreController };
