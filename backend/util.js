let AnswerModel = require("./models/answerModel");
let QuestionModel = require("./models/questionModel");
let UserModel = require("./models/userModel");

filterModel = async (model, filter, callback) => {
  await model.find(filter).then((found) => {
    console.log(`found: ${found}`);
    console.log(`type: ${typeof found}`);
    if (found === undefined) {
      console.log(
        `INFO util: Filter ${JSON.stringify(filter)} gave no results`
      );
      callback(null);
    } else {
      console.log(
        `INFO util: Filter ${JSON.stringify(filter)} gave ${
          found.length
        } results`
      );
      callback(found);
    }
  });
};

filterUsers = async (filter, callback) => {
  await filterModel(UserModel, filter, callback);
};

sessionTokenValid = async (sessionToken, callback) => {
  console.log(
    `INFO util: Checking if session token ${sessionToken} is valid...`
  );

  user = filterUsers({ sessionToken: sessionToken });

  if (user) {
    console.log(`INFO util: Session token ${sessionToken} is valid`);
    callback(user);
  } else {
    console.log(`INFO util: Session token ${sessionToken} is not valid`);
    callback(false);
  }
};

saveModel = async (model, onSuccess, onError) => {
  model
    .save()
    .then(() => {
      console.log(`OK util/saveModel: Saved model`);
      onSuccess();
    })
    .catch((error) => {
      console.log(`ERROR util/saveModel: ${error}`);
      onError(error);
    });
};

module.exports = {
  sessionTokenValid,
  filterUsers,
  saveModel,
};
