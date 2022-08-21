const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const session = require("express-session");
const greeting = require("./greeting")();

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
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/", function (req, res) {
  // console.log(greeting.firstName);
  res.render("index", {
    message: greeting.greet(greeting.firstName, greeting.language),
    counting: greeting.counter(),
  });
});
app.post("/greeting", function (req, res) {
  // console.log(req.body);
  // let nameUser = req.body.name;
  // let lang = req.body.language;

  // if (nameUser & lang) {
  //   greet(nameUser, lang);
  // } else {
  //   req.flash("info", greeting.errorMessage());
  // }
  greeting.firstName = req.body.lastName;
  greeting.language = req.body.language;
  greeting.userNames(greeting.firstName);

  res.redirect("/");
});

app.get("/greeted", function (req, res) {
  console.log(req.body);
  res.render("greeted", {
    message: greeting.listedName(),
    // message: greeting.userNames(greeting.firstName),
  });
});

app.get("/counter/:lastName", function (req, res) {
  let user = req.params.lastName;
  // console.log(user);
  greeting.userCounter(user);
  res.render("counter", {
    username: user,
    numberOfTimes: greeting.userCounter(user),
  });
});

const PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
  console.log("App started");
});
