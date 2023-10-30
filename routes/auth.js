const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user"); // Adjust the path as needed
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });
    res.redirect("/login"); // Or handle as you see fit
  } catch (error) {
    res.status(500).send("Error in creating user: " + error.message);
  }
});

router.post("/signin", async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    req.session.userId = user.id;
    res.redirect("/dashboard");
  } else {
    res.redirect("/signin");
  }
});

module.exports = router;
