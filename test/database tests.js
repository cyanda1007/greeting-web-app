var assert = require("assert");
const GreetingsDb = require("../database.js");

describe("The Greeting App", function () {
  this.beforeEach(async function () {
    //clean table before each test run
    await db.none("delete from users");
  });
});
