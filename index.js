const express = require("express");
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection"); // Adjust the path as necessary
const Post = require("./models/post"); // Importing the model
const User = require("./models/user"); // Importing the model

const app = express();

// Set up Handlebars view engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Serve static files
app.use(express.static("public"));

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database & tables created!");
    app.get("/", async (req, res) => {
      try {
        const posts = await Post.findAll(); // Adjust based on your actual model and method
        res.render("home", { posts });
      } catch (error) {
        res.status(500).send("Error in fetching posts");
      }
    });

    // ... rest of your server setup and routes

    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((err) => console.error("Error in database sync", err));
