let UserModel = require("./models/UserModel.js");
let QuestionModel = require("./models/QuestionModel");

usernameExists = async (username, callback) => {
  // should check sessionToken instead
  console.log(`Checking if user ${username} exists...`);

  UserModel.find({ username: username }).then((foundUsers) => {
    console.log(foundUsers);
    if (foundUsers[0]) {
      console.log(`Username ${username} exists`);
      callback(true);
    } else {
      console.log(`Username ${username} doesn't exist`);
      callback(false);
    }
  });
};

module.exports = {
  usernameExists,
};
