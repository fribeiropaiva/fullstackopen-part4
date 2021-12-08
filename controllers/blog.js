const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});

  return response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.title && !blog.url) {
    return response.status(400).send();
  }

  if (!blog.likes) blog.likes = 0;

  const savedBlog = await blog.save();

  return response.status(201).json(savedBlog);
});

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  return response.status(204).send();
});

blogRouter.put('/:id', async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, { likes: request.body.likes });

  return response.status(200).send();
});

module.exports = blogRouter;
