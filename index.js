const express = require("express");
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection"); // Adjust the path as necessary
const bcrypt = require("bcrypt");
const Post = require("./models/post"); // Importing the model
const authRoutes = require("./routes/auth");

const app = express();
express.json();
app.use(express.urlencoded({ extended: true }));

const session = require("express-session");

// Session configuration
app.use(
  session({
    secret: "qumI5JVX+wsxoaYD4UygPSP2gYM", // Replace with a real secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using https
  })
);

// Set up Handlebars view engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
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
    app.get("/signin", (req, res) => {
      res.render("signin");
    });

    app.get("/dashboard", (req, res) => {
      if (req.session.userId) {
        res.render("dashboard");
      } else {
        res.redirect("/signin");
      }
    });

    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((err) => console.error("Error in database sync", err));
