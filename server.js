// Imports
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helpers = require("./utils/helpers");
const sequelize = require("./config/connection");
const routes = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Configure session settings
const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 1200000, // Adjust this value as needed
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
};

// Set session options
app.use(session(sess));

// Set the template engine and view engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set up routes
app.use(routes);

// Sync Sequelize with the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Server is now listening on port", PORT));
});
