var assert = require("assert");
const Greetings = require("../greeting.js");
describe("Greeting with different language", function () {
  it("should greet in Isizulu", function () {
    const greetings = Greetings();
    assert.equal(greetings.zuluGreeting("cyanda"), "Sawubona cyanda");
    assert.equal(greetings.zuluGreeting("Andiswa"), "Sawubona Andiswa");
  });

  it("should greet in English", function () {
    const greetings = Greetings();
    assert.equal(greetings.englishGreeting("cyanda"), "Hello cyanda");
    assert.equal(greetings.englishGreeting("Nokubonga"), "Hello Nokubonga");
  });

  it("should greet in Isixhosa", function () {
    const greetings = Greetings();
    assert.equal(greetings.xhosaGreeting("cyanda"), "Molo cyanda");
    assert.equal(greetings.xhosaGreeting("Dimpho"), "Molo Dimpho");
  });
});
