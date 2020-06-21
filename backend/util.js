let AnswerModel = require("./models/answerModel");
let QuestionModel = require("./models/questionModel");
let UserModel = require("./models/userModel");

filterModel = async (model, modelName, filter, sort, onSuccess) => {
  await model
    .find(filter)
    .then((matches) => {
      // console.log(`matches ${JSON.stringify(found)}`);

      if (matches.length === 0) {
        console.info(
          `INFO util/filterModel: Filter ${JSON.stringify(
            filter
          )} for model ${modelName} gave no matches`
        );
        onSuccess([]);
      } else {
        console.info(
          `INFO util/filterModel: Filter ${JSON.stringify(
            filter
          )} for model ${modelName} gave ${matches.length} match(es)!`
        );
        onSuccess(matches);
      }
    })
    .catch((error) => {
      console.error(`ERROR util/filterModel: ${error}`);
      onSuccess([]);
    });
};

filterAnswers = async (filter, callback) => {
  await filterModel(AnswerModel, "Answer", filter, null, callback);
};

filterQuestions = async (filter, callback) => {
  await filterModel(
    QuestionModel,
    "Question",
    filter,
    "-createdDate",
    callback
  );
};

filterUsers = async (filter, callback) => {
  await filterModel(UserModel, "User", filter, null, callback);
};

sessionTokenValid = async (sessionToken, callback) => {
  console.info(`INFO util: Checking session token ${sessionToken}...`);

  await filterUsers({ sessionToken: sessionToken }, (matches) => {
    if (matches.length > 0) {
      console.info(`INFO util: Session token is valid`);
      callback(matches[0]);
    } else {
      console.info(`INFO util: Session token is not valid`);
      callback(false);
    }
  });
};

saveModel = async (model, onSuccess, onError) => {
  console.info("INFO util/saveModel: Saving model...");
  await model
    .save()
    .then(() => {
      console.info(`OK util/saveModel: Saved model`);
      onSuccess();
    })
    .catch((error) => {
      console.info(`ERROR util/saveModel: ${error}`);
      onError(error);
    });
};

addAuthorNamesToQuestions = async (questions) => {
  let newQuestions = [];

  await questions.forEach(async (q) => {
    let newQ = {};
    let jsonQuestion = JSON.parse(JSON.stringify(q));
    for (key in jsonQuestion) {
      // console.log(key);
      newQ[key] = jsonQuestion[key];
    }
    await filterUsers({ _id: jsonQuestion.authorId }, (foundUser) => {
      newQ["author"] = foundUser.username;
    });
    // console.log(newQ);
    newQuestions.push(newQ);
  });

  console.info("Questions with author names:");
  console.info(newQuestions);

  return newQuestions;
};

module.exports = {
  sessionTokenValid,
  filterAnswers,
  filterQuestions,
  filterUsers,
  saveModel,
};
