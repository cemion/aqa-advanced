const { PostsController } = require('./posts.controller');
const { UsersController } = require('./users.controller');
const { CommentsController } = require('./comments.controller');
const { AccountController } = require('./account.controller');
const { BookStoreController } = require('./bookstore.controller');

const JSONPLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com';
const DEMOQA_URL = 'https://demoqa.com';

const jsonPlaceholder = {
  posts: new PostsController(JSONPLACEHOLDER_URL),
  users: new UsersController(JSONPLACEHOLDER_URL),
  comments: new CommentsController(JSONPLACEHOLDER_URL),
};

const demoqa = {
  account: new AccountController(DEMOQA_URL),
  bookStore: new BookStoreController(DEMOQA_URL),
};

module.exports = { jsonPlaceholder, demoqa };
