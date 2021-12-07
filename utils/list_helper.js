const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((acc, blog) => acc + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  return blogs.reduce((prev, blog) => ((prev.likes > blog.likes) ? prev : blog), blogs[0]);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};

  const authors = blogs.map((blog) => blog.author);
  const finalObjs = authors.map((author) => {
    let numberOfAppereances = 0;
    authors.forEach((otherAuthor) => {
      if (author === otherAuthor) numberOfAppereances++;
    });
    return {
      author,
      blogs: numberOfAppereances,
    };
  });

  return finalObjs.reduce((acc, obj) => {
    if (acc.blogs > obj.blogs) {
      return acc;
    }
    return obj;
  }, finalObjs[0]);
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};

  const authors = blogs.map((blog) => blog.author);
  const finalObjs = authors.map((author) => {
    let numberOfLikes = 0;
    blogs.forEach((blog) => {
      if (author === blog.author) numberOfLikes += blog.likes;
    });
    return {
      author,
      likes: numberOfLikes,
    };
  });

  return finalObjs.reduce((acc, obj) => {
    if (acc.likes > obj.likes) {
      return acc;
    }
    return obj;
  }, finalObjs[0]);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
