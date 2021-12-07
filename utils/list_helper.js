const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((acc, blog) => acc + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  return blogs.reduce((prev, blog) => ((prev.likes > blog.likes) ? prev : blog), blogs[0]);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
