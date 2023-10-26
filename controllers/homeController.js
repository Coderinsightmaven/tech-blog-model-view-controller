const Post = require("../models/post");

exports.renderHomePage = async (req, res) => {
  try {
    const posts = await Post.findAll();
    // Include the user object from the session in the rendering context
    res.render("home", { posts, user: req.session.user });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
