const greeting = require("./greeting");

module.exports = function greetingRoute(GreetingsDatabase, Greeting) {
  async function routesNames(req, res, next) {
    try {
      let name = req.body.lastName;
      let language = req.body.language;
      let message = await messageError(name, language);
      if (message !== undefined) {
        req.flash("info", message);
      } else {
        req.flash("message", Greeting.greet(name, language));
      }
      // console.log(Greeting.greet(name, language));
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
  async function messageError(name, language) {
    if (!name && !language) {
      return "please enter a name and select one language";
    } else if (!name) {
      return "Please enter a name";
    } else if (!language) {
      return "Please select one language";
    } else if (/[0-9]/g.test(name)) {
      return "Please enter letters not numbers";
    } else {
      await GreetingsDatabase.storeNames(name);
    }
  }
  return {
    clearDatabase,
    routesNames,
    greets,
    namesDisplayed,
    currentName,
    messageError,
    greetName,
    clearDatabase,
  };
};
