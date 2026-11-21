const { demoqa } = require('./controllers');

const { account, bookStore } = demoqa;

const { DEMOQA_USERNAME, DEMOQA_PASSWORD } = process.env;
const CREDENTIALS = { userName: DEMOQA_USERNAME, password: DEMOQA_PASSWORD };

const BOOK_ISBN = '9781449325862';
const JWT_PATTERN = /^[\w-]+\.[\w-]+\.[\w-]+$/;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const expectBookShape = (book) => {
  expect(book).toEqual({
    isbn: expect.stringMatching(/^\d{13}$/),
    title: expect.any(String),
    subTitle: expect.any(String),
    author: expect.any(String),
    publish_date: expect.any(String),
    publisher: expect.any(String),
    pages: expect.any(Number),
    description: expect.any(String),
    website: expect.any(String),
  });
  expect(Number.isNaN(Date.parse(book.publish_date))).toBe(false);
};

describe('Book Store API (controllers)', () => {
  let userId;

  const clearCollection = async () => {
    const token = await account.getToken(CREDENTIALS);
    await bookStore.deleteAllBooks(userId, token);
  };

  beforeAll(async () => {
    await account.generateToken(CREDENTIALS);
    const loginResponse = await account.login(CREDENTIALS);
    userId = loginResponse.data.userId;
    await clearCollection();
  });

  afterAll(async () => {
    await clearCollection();
  });

  test('POST GenerateToken: returns token', async () => {
    const response = await account.generateToken(CREDENTIALS);

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('application/json');
    expect(response.data).toEqual({
      token: expect.stringMatching(JWT_PATTERN),
      expires: expect.any(String),
      status: 'Success',
      result: 'User authorized successfully.',
    });
    expect(Date.parse(response.data.expires)).toBeGreaterThan(Date.now());
  });

  test('POST Login: returns user data', async () => {
    const response = await account.login(CREDENTIALS);

    expect(response.status).toBe(200);
    expect(response.data).toMatchObject({
      userId: expect.stringMatching(UUID_PATTERN),
      username: DEMOQA_USERNAME,
      token: expect.stringMatching(JWT_PATTERN),
      expires: expect.any(String),
      created_date: expect.any(String),
      isActive: expect.any(Boolean),
    });
    expect(response.data.userId).toBe(userId);
    expect(Date.parse(response.data.created_date)).toBeLessThan(Date.now());
  });

  test('GET Books: returns catalog', async () => {
    const response = await bookStore.getBooks();

    expect(response.status).toBe(200);
    expect(response.data.books).toHaveLength(8);
    response.data.books.forEach(expectBookShape);
    expect(response.data.books.map((book) => book.isbn)).toContain(BOOK_ISBN);
  });

  test('GET Book: returns book by ISBN', async () => {
    const response = await bookStore.getBook(BOOK_ISBN);

    expect(response.status).toBe(200);
    expectBookShape(response.data);
    expect(response.data).toMatchObject({
      isbn: BOOK_ISBN,
      title: 'Git Pocket Guide',
      author: 'Richard E. Silverman',
      pages: 234,
    });
  });

  test('GET Book: returns 400 for unknown ISBN', async () => {
    const response = await bookStore.getBook('0000000000000');

    expect(response.status).toBe(400);
    expect(response.data).toEqual({
      code: '1205',
      message: 'ISBN supplied is not available in Books Collection!',
    });
  });

  test('POST Books: adds book', async () => {
    const token = await account.getToken(CREDENTIALS);
    const response = await bookStore.addBooks(userId, [BOOK_ISBN], token);

    expect(response.status).toBe(201);
    expect(response.data).toEqual({ books: [{ isbn: BOOK_ISBN }] });
  });

  test('GET User: shows added book', async () => {
    const token = await account.getToken(CREDENTIALS);
    const [profileResponse, bookResponse] = await Promise.all([
      account.getUser(userId, token),
      bookStore.getBook(BOOK_ISBN),
    ]);

    expect(profileResponse.status).toBe(200);
    expect(profileResponse.data).toEqual({
      userId,
      username: DEMOQA_USERNAME,
      books: [bookResponse.data],
    });
  });

  test('GET User: returns 401 with invalid token', async () => {
    const response = await account.getUser(userId, 'invalid-token');

    expect(response.status).toBe(401);
    expect(response.data).toEqual({ code: '1200', message: 'User not authorized!' });
  });
});
