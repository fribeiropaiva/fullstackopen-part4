const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

test('returns all saved blogs', async () => {
  await api
    .get('/api/blogs')
    .expect(200);
});
