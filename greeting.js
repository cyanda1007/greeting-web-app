module.exports = function Greetings() {
  var firstName = "";
  var language = "";
  var greetedNames = {};
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

  function counter() {
    let namesList = Object.keys(greetedNames);
    console.log(namesList);
    return namesList.length;
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

  // function errorMessage(name) {
  //   if (/[0-9]/.test(name)) {
  //     return "Please put letters only";
  //   }
  // }

  function userNames(name) {
    if (greetedNames[name] == undefined) {
      greetedNames[name] = 1;
    } else {
      greetedNames[name]++;
    }
  }
  function listedName() {
    let namesList = Object.keys(greetedNames);
    return namesList;
  }

  function allNames() {
    return greetedNames;
  }

  function userCounter(name) {
    console.log(greetedNames[name]);
    return greetedNames[name];
  }

  return {
    userCounter,
    firstName,
    language,
    // errorMessage,
    zuluGreeting,
    allNames,
    englishGreeting,
    xhosaGreeting,
    counter,
    greet,
    userNames,
    listedName,
  };
};
