var assert = require("assert");
const GreetingsDb = require("../database.js");

describe("The Greeting App", function () {
  this.beforeEach(async function () {
    //clean table before each test run
    await db.none("delete from users");
  });
  it("should be able to add all greeted users", async function () {
    const Greetings = GreetingsDb(db);
    await Greetings.storeNames("cyanda");
    await Greetings.storeNames("dimphoh");

    assert.equal(false, await Greetings.greetedName("cya"));
    assert.equal(false, await Greetings.greetedName("nosie"));
  });

  it("should be able to check if the user has been greeted", async function () {
    const Greetings = GreetingsDb(db);
    await Greetings.storeNames("cyanda");
    await Greetings.storeNames("dimphoh");

    assert.equal(false, await Greetings.greetedName("cya"));
    assert.equal(false, await Greetings.greetedName("nosie"));
  });
});
