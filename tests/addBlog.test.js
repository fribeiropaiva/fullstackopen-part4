const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const blog = require('../models/blog');

test('a valid blog post can be added', async () => {
  const newBlog = {
    title: 'Zen para distraídos',
    author: 'Monja Coen',
    url: 'https://google.com/',
    likes: 2,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
});
