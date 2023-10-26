const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ /* Specify helpers if any */ });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'super secret',
  resave: false,
  saveUninitialized: true
}));

// Inform Express.js on which template engine to use
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Routes
app.use(require('./routes'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});