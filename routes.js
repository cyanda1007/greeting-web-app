module.exports = function greetingRoute(GreetingsDatabase) {
  async function routesNames(req, res, next) {
    try {
      let name = req.body.lastName;
      await GreetingsDatabase.storeNames(name);
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  }
  async function greets(req, res, next) {
    try {
      res.render("index");
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
  return {
    routesNames,
    greets,
    namesDisplayed,
    currentName,
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
