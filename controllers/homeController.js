const Post = require('../models/post');

exports.renderHomePage = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.render('home', { posts });
  } catch (err) {
    res.status(500).send(err.message);
  }
};