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
  let nameUser = req.body.lastName;
  let lang = req.body.language;
  let isNumber = /[0-9]/g.test(nameUser);
  if (nameUser && lang && isNumber == false) {
    greeting.greet(nameUser, lang);
    greeting.firstName = req.body.lastName;
    greeting.language = req.body.language;
    greeting.userNames(nameUser);
  } else {
    req.flash("info", greeting.errorMessage(nameUser, lang));
  }
  // if (
  //   nameUser != undefined &&
  //   lang != undefined &&
  //   nameUser != "" &&
  //   lang != ""
  // ) {
  // }
  // if (
  //   nameUser == undefined ||
  //   lang == undefined ||
  //   nameUser == "" ||
  //   lang == ""
  // ) {
  //   req.flash("info", greeting.errorMessage(nameUser, lang));
  // }

  res.redirect("/");
});

app.get("/greeted", function (req, res) {
  res.render("greeted", {
    message: greeting.listedName(),
  });
});

app.get("/counter/:lastName", function (req, res) {
  let userFname = req.params.lastName;

  greeting.userCounter(userFname);
  res.render("counter", {
    username: userFname,
    numberOfTimes: greeting.userCounter(userFname),
  });
});

app.post("/reset", function (req, res) {
  greeting.clear();

  res.redirect("/");
});

const PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
  console.log("App started");
});
