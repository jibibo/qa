let UserModel = require("./models/UserModel.js");
let QuestionModel = require("./models/QuestionModel");

sessionTokenValid = async (sessionToken, callback) => {
  console.log(`UTIL Checking if session token ${sessionToken} is valid...`);

  UserModel.find({ sessionToken: sessionToken }).then((foundUsers) => {
    console.log(`UTIL Users matched: ${foundUsers}`);
    
    // possible bug: different users with identical session tokens will break this
    if (foundUsers[0]) {
      console.log(`UTIL Session token ${sessionToken} is valid`);
      callback(foundUsers[0]);
    } else {
      console.log(`UTIL Session token ${sessionToken} is not valid`);
      callback(null);
    }
  });
};

module.exports = {
  sessionTokenValid,
};
