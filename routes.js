const greeting = require("./greeting");

module.exports = function greetingRoute(GreetingsDatabase, Greeting) {
  async function routesNames(req, res, next) {
    try {
      let name = req.body.lastName;
      let language = req.body.language;
      await GreetingsDatabase.storeNames(name);
      // console.log(Greeting.greet(name, language));
      req.flash("message", Greeting.greet(name, language));
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  }
  async function greets(req, res, next) {
    try {
      res.render("index", {
        counting: await GreetingsDatabase.numberOfGreetedNames(),
      });
    } catch (err) {
      next(err);
    }
  }
  async function namesDisplayed(req, res, next) {
    try {
      res.render("greeted", {
        greetedNames: await GreetingsDatabase.displayNames(),
      });
    } catch (err) {
      next(err);
    }
  }

  async function currentName(req, res, next) {
    try {
      let name = req.params.username;
      res.render("counter", {
        name: await GreetingsDatabase.greetedName(name),
      });
    } catch (err) {
      next(err);
    }
  }

  async function greetName(req, res, next) {
    try {
      res.render("index");
    } catch (err) {
      next(err);
    }
  }
  async function clearDatabase(req, res, next) {
    try {
      let name = req.body.lastName;
      res.render("index", {
        name: await GreetingsDatabase.Reset(name),
      });
    } catch (err) {
      next(err);
    }
  }
  return {
    clearDatabase,
    routesNames,
    greets,
    namesDisplayed,
    currentName,
    greetName,
  };
};

// const listedName = async (req, res) => {

//   res.render("listedName", {
//     uniqueName: names,
//   });
// };

// const userCounter = async (req, res) => {
//   let counter = await userNames.namesList();
//   res.render("userCounter", {
//     uniqueName: counter,
//   });
// };

// const clear = async (req, res) => {
//   let remove = await userNames.namesList();
//   res.render("clear", {
//     uniqueName: remove,
//   });
// };

// const greet = async (req, res) => {
//   let greetings = await userNames.namesList();
//   res.render("greet", {
//     uniqueName: greetings,
//   });
// };

// const userNames = async (req, res) => {
//   let nameUser = await userCounter.namesList();
//   res.render("userNames", {
//     uniqueName: nameUser,
//   });
// };

// const errorMessage = async (req, res) => {
//   let errMessage = await userNames.namesList();
//   res.render("errorMessage", {
//     uniqueName: errMessage,
//   });
// };

// const counter = async (req, res) => {
//   let counting = await userCounter.namesList();
//   res.render("counter", {
//     uniqueName: counting,
//   });
// };
// return {
//   counter,
//   errorMessage,
//   userNames,
//   greet,
//   clear,
//   userCounter,
//   listedName,
// };
