var assert = require("assert");
const GreetingsDb = require("../database");
const pgp = require("pg-promise")();

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgrsql://postgres:Cyanda@100%@localhost:5432/my_greetings_db";

const config = {
  connectionString: DATABASE_URL,
};

const db = pgp(config);
describe("The Greeting App", function () {
  this.beforeEach(async function () {
    //clean table before each test run
    await db.none("delete from users");
  });
  it("should be able to add all greeted users", async function () {
    const Greetings = GreetingsDb(db);
    await Greetings.storeNames("cyanda");
    await Greetings.storeNames("dimphoh");

    assert.deepEqual(
      [
        {
          username: "cyanda",
        },
        {
          username: "dimphoh",
        },
      ],
      await Greetings.displayNames()
    );
  });

  it("should be able to check if the user has been greeted", async function () {
    const Greetings = GreetingsDb(db);
    await Greetings.storeNames("cyanda");
    await Greetings.storeNames("dimphoh");

    assert.deepEqual(
      [
        {
          username: "cyanda",
        },
        {
          username: "dimphoh",
        },
      ],
      await Greetings.displayNames()
    );
  });

  it("should be able to update the counter if the user has been greeted", async function () {
    const Greetings = GreetingsDb(db);
    await Greetings.storeNames("cyanda");
    await Greetings.storeNames("dimphoh");

    assert.deepEqual(
      [
        {
          username: "cyanda",
        },
        {
          username: "dimphoh",
        },
      ],
      await Greetings.displayNames()
    );
  });

  it("should be able to count if the user has been greeted", async function () {
    const Greetings = GreetingsDb(db);
    await Greetings.storeNames("cyanda");
    await Greetings.storeNames("dimphoh");

    assert.notEqual(false, await Greetings.numberOfGreetedNames());
  });
});
