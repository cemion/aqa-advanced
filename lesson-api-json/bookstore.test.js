const { createApiClient } = require('./api-client');

const apiClient = createApiClient('https://demoqa.com');

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

const authHeader = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

const getCurrentToken = async () => {
  const response = await apiClient.post('/Account/v1/Login', CREDENTIALS);
  return response.data.token;
};

describe('Book Store API', () => {
  let userId;

  const clearCollection = async () => {
    const token = await getCurrentToken();
    await apiClient.delete('/BookStore/v1/Books', {
      params: { UserId: userId },
      ...authHeader(token),
    });
  };

  beforeAll(async () => {
    await apiClient.post('/Account/v1/GenerateToken', CREDENTIALS);
    const loginResponse = await apiClient.post('/Account/v1/Login', CREDENTIALS);
    userId = loginResponse.data.userId;
    await clearCollection();
  });

  afterAll(async () => {
    await clearCollection();
  });

  test('POST GenerateToken: returns token', async () => {
    const response = await apiClient.post('/Account/v1/GenerateToken', CREDENTIALS);

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
    const response = await apiClient.post('/Account/v1/Login', CREDENTIALS);

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
    const response = await apiClient.get('/BookStore/v1/Books');

    expect(response.status).toBe(200);
    expect(response.data.books).toHaveLength(8);
    response.data.books.forEach(expectBookShape);
    expect(response.data.books.map((book) => book.isbn)).toContain(BOOK_ISBN);
  });

  test('POST Books: adds book', async () => {
    const token = await getCurrentToken();
    const response = await apiClient.post(
      '/BookStore/v1/Books',
      { userId, collectionOfIsbns: [{ isbn: BOOK_ISBN }] },
      authHeader(token),
    );

    expect(response.status).toBe(201);
    expect(response.data).toEqual({ books: [{ isbn: BOOK_ISBN }] });
  });

  test('GET User: shows added book', async () => {
    const token = await getCurrentToken();
    const [profileResponse, bookResponse] = await Promise.all([
      apiClient.get(`/Account/v1/User/${userId}`, authHeader(token)),
      apiClient.get('/BookStore/v1/Book', { params: { ISBN: BOOK_ISBN } }),
    ]);

    expect(profileResponse.status).toBe(200);
    expect(profileResponse.data).toEqual({
      userId,
      username: DEMOQA_USERNAME,
      books: [bookResponse.data],
    });
    expect(profileResponse.data.books[0]).toMatchObject({
      isbn: BOOK_ISBN,
      title: 'Git Pocket Guide',
      author: 'Richard E. Silverman',
      pages: 234,
    });
  });
});
