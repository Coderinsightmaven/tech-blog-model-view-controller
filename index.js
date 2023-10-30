const express = require("express");
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection"); // Adjust the path as necessary
const bcrypt = require("bcrypt");
const Post = require("./models/post"); // Importing the model
const authRoutes = require("./routes/auth");

const app = express();

// Set up Handlebars view engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Middleware for parsing request bodies
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Routing
app.use("/auth", authRoutes);

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

    // Sign-up route
    app.get("/signup", (req, res) => {
      res.render("signup");
    });

    // Sign-in route
    app.get("/login", (req, res) => {
      res.render("signin");
    });

    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((err) => console.error("Error in database sync", err));
