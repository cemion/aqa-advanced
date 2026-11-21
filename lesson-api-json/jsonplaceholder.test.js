const { createApiClient } = require('./api-client');

const apiClient = createApiClient('https://jsonplaceholder.typicode.com');

const expectPostShape = (post) => {
  expect(post).toEqual({
    userId: expect.any(Number),
    id: expect.any(Number),
    title: expect.any(String),
    body: expect.any(String),
  });
};

describe('JSONPlaceholder API', () => {
  test('GET Posts: returns user posts', async () => {
    const response = await apiClient.get('/posts', { params: { userId: 1 } });

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('application/json');
    expect(response.data).toHaveLength(10);
    response.data.forEach((post) => {
      expectPostShape(post);
      expect(post.userId).toBe(1);
    });
    expect(response.data.map((post) => post.id)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  test('GET Post: returns post by id', async () => {
    const response = await apiClient.get('/posts/1');

    expect(response.status).toBe(200);
    expectPostShape(response.data);
    expect(response.data).toMatchObject({
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    });
  });

  test('GET User: returns user by id', async () => {
    const response = await apiClient.get('/users/1');

    expect(response.status).toBe(200);
    expect(response.data).toMatchObject({
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: expect.any(String),
        suite: expect.any(String),
        city: 'Gwenborough',
        zipcode: expect.any(String),
        geo: { lat: expect.any(String), lng: expect.any(String) },
      },
      phone: expect.any(String),
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: expect.any(String),
        bs: expect.any(String),
      },
    });
  });

  test('POST Posts: creates post', async () => {
    const newPost = { title: 'AQA advanced', body: 'API testing with axios', userId: 1 };

    const response = await apiClient.post('/posts', newPost);

    expect(response.status).toBe(201);
    expect(response.statusText).toBe('Created');
    expect(response.data).toEqual({ ...newPost, id: 101 });
  });

  test('POST Comments: creates comment', async () => {
    const newComment = {
      postId: 1,
      name: 'Great post',
      email: 'tester@example.com',
      body: 'Checking that POST /comments works',
    };

    const response = await apiClient.post('/comments', newComment);

    expect(response.status).toBe(201);
    expect(response.data).toEqual({ ...newComment, id: 501 });
  });
});
