module.exports = function GreetingsDatabase(db) {
  async function storeNames(name) {
    try {
      let results = await db.oneOrNone(
        "select count(*) from users where username = $1",
        [name]
      );
      // if name in db table update the counter
      if (Number(results.count) > 0) {
        await db.none(
          "update users set counting = counting+1  where username = $1",
          [name]
        );
      }
      if (Number(results.count) === 0) {
        let greetingCount = 1;
        await db.none("insert into users (username, counting) values($1, $2)", [
          name,
          greetingCount,
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function displayNames() {
    try {
      let result = await db.manyOrNone("select username from users ");
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async function numberOfGreetedNames() {
    try {
      let count = await db.oneOrNone("select count(*) from users");
      // console.log(count);
      return count.count;
    } catch (err) {
      console.log(err);
    }
  }

  async function greetedName(user) {
    try {
      let result = await db.manyOrNone(
        "select * from users where username = $1",
        [user]
      );
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  async function Reset(name) {
    try {
      let result = await db.none("delete from users", [name]);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  return {
    Reset,
    storeNames,
    greetedName,
    displayNames,
    numberOfGreetedNames,
  };
};
