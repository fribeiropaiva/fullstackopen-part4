const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const blog = require('../models/blog');

describe('when there are some blogs saved', () => {
  test('get blogs', async () => {
    await api.get('/api/blogs').expect(200);
  });

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

  test('a blog without likes will default it to 0', async () => {
    const newBlog = {
      title: 'Zen para distraídos 2',
      author: 'Monja Coen',
      url: 'https://google.com/',
    };

    await api
      .post('/api/blogs')
      .send(newBlog);

    const response = await api.get('/api/blogs');

    const recentlyPostedBlog = response.body.find((blog) => blog.title === 'Zen para distraídos 2');

    expect(recentlyPostedBlog.likes).toBe(0);
  });

  test('a blog without title and url will result in a 400 error', async () => {
    const newBlog = {
      title: '',
      author: 'Monja Coen',
      url: '',
      likes: 2,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  });

  test('deletion of a blog', async () => {
    const blogs = await api.get('/api/blogs');

    const blogToDelete = blogs.body[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const afterDeletionBlogs = await api.get('/api/blogs');

    const hasBeenDeleted = afterDeletionBlogs.body.some((blog) => blog.id === blogToDelete.id);

    expect(hasBeenDeleted).toBe(false);
  });

  test('update number of likes of a blog', async () => {
    const blogs = await api.get('/api/blogs');

    const blogToUpdate = blogs.body[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 5 })
      .expect(200);

    const afterUpdateBlogs = await api.get('/api/blogs');

    const hasBeenUpdated = afterUpdateBlogs.body.find((blog) => blog.id === blogToUpdate.id);

    expect(hasBeenUpdated.likes).toBe(5);
  });
});
