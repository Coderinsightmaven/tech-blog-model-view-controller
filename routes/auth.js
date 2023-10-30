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
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    req.session.userId = user.id; // Create a session
    res.redirect("/dashboard"); // Redirect to the dashboard
  } else {
    res.redirect("/signin");
  }
});

router.get("/logout", (req, res) => {
  if (req.session) {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        res.status(500).send("Could not log out, please try again.");
      } else {
        // Redirect to login page or home page after logout
        res.redirect("/");
      }
    });
  } else {
    // If there is no session, just redirect to the login or home page
    res.redirect("/login");
  }
});

module.exports = router;
