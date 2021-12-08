require('dotenv').config();
require('express-async-errors');

const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blog');

const MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRouter);

module.exports = app;
