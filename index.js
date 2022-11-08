const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const session = require("express-session");
const Greeting = require("./greeting")();
const GreetingsDatabase = require("./database");
const GreetingRoutes = require("./routes");
const pgp = require("pg-promise")();
const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgrsql://postgres:Cyanda@100%@localhost:5432/my_greetings";

const config = {
  connectionString: DATABASE_URL,
};

if (process.env.NODE_ENV == "production") {
  config.ssl = {
    rejectUnauthorized: false,
  };
}

const db = pgp(config);
// console.log(db);
const app = express();
app.use(
  session({
    secret: "index",
    resave: false,
    saveUninitialized: true,
  })
);

// initialise the flash middleware
app.use(flash());
app.use(express.static("public"));
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
const greetingsDatabase = GreetingsDatabase(db);

const greetingRoutes = GreetingRoutes(greetingsDatabase, Greeting);

app.use(bodyParser.json());

app.post("/greeting", greetingRoutes.routesNames);
app.get("/", greetingRoutes.greets);
app.get("/greeted", greetingRoutes.namesDisplayed);
app.get("/counter/:username", greetingRoutes.currentName);
app.post("/reset", greetingRoutes.clearDatabase);

const PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
  console.log("App started");
});
