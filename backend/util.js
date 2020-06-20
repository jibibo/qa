let AnswerModel = require("./models/answerModel");
let QuestionModel = require("./models/questionModel");
let UserModel = require("./models/userModel");

filterModel = async (model, filter, sort, onSuccess) => {
  await model
    .find(filter)
    .sort(sort)
    .then((found) => {
      console.log(`Found type: ${typeof found}`);
      if (found === undefined) {
        console.log(
          `INFO util: Filter ${JSON.stringify(filter)} gave no results`
        );
        onSuccess(null);
      } else {
        console.log(
          `INFO util: Filter ${JSON.stringify(filter)} gave ${
            found.length
          } results`
        );
        onSuccess(found);
      }
    })
    .catch((error) => {
      console.log(`what happened??? ${error}`);
    });
};

filterAnswers = async (filter, callback) => {
  await filterModel(AnswerModel, filter, null, callback);
};

filterQuestions = async (filter, callback) => {
  await filterModel(QuestionModel, filter, "-createdDate", callback);
};

filterUsers = async (filter, callback) => {
  await filterModel(UserModel, filter, null, callback);
};

sessionTokenValid = async (sessionToken, callback) => {
  console.log(
    `INFO util: Checking if session token ${sessionToken} is valid...`
  );

  user = filterUsers({ sessionToken: sessionToken });

  if (user) {
    console.log(`INFO util: Session token is valid`);
    callback(user);
  } else {
    console.log(`INFO util: Session token is not valid`);
    callback(false);
  }
};

saveModel = async (model, onSuccess, onError) => {
  console.log("INFO util/saveModel: Saving model...");
  await model
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
  filterAnswers,
  filterQuestions,
  filterUsers,
  saveModel,
};
