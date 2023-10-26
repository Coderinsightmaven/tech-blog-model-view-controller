
const User = require('../models/user');
const session = require('express-session');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    await User.create({ username, password });
    res.redirect('/login');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await user.validPassword(password))) {
      return res.status(401).send('Incorrect username or password');
    }

    req.session.user = user;
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
