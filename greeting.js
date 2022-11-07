module.exports = function Greetings() {
  var message = "";

  function zuluGreeting(names) {
    return "Sawubona " + names;
  }

  function englishGreeting(names) {
    return "Hello " + names;
  }

  function xhosaGreeting(names) {
    return "Molo " + names;
  }

  function greet(name, langua) {
    if (langua === "zulu") {
      message = zuluGreeting(name);
    } else if (langua === "engfa") {
      message = englishGreeting(name);
    } else if (langua === "xhosa") {
      message = xhosaGreeting(name);
    }
    return message;
  }

  return {
    zuluGreeting,
    englishGreeting,
    xhosaGreeting,
    greet,
  };
};
