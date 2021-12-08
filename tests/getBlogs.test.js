const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

describe('get blogs', () => {
  test('returns all saved blogs', async () => {
    await api
      .get('/api/blogs')
      .expect(200);
  });

  test('_id property is not found in any blog', async () => {
    const blogs = await api.get('/api/blogs');

    const checkIds = blogs.body.some((blog) => blog._id);

    expect(checkIds).toBe(false);
  });
});
