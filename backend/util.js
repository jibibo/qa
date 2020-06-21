let AnswerModel = require("./models/answerModel");
let QuestionModel = require("./models/questionModel");
let UserModel = require("./models/userModel");

filterModel = async (model, modelName, filter, sort, onSuccess) => {
  await model
    .find(filter)
    .then((found) => {
      console.log(`found ${JSON.stringify(found)}`);

      if (found.length === 0) {
        console.log(
          `INFO util/filterModel: Filter ${JSON.stringify(
            filter
          )} for model ${modelName} gave no results`
        );
        onSuccess([]);
      } else {
        console.log(
          `INFO util/filterModel: Filter ${JSON.stringify(
            filter
          )} for model ${modelName}  gave ${found.length} results`
        );
        onSuccess(found);
      }
    })
    .catch((error) => {
      console.log(`ERROR util/filterModel: ${error}`);
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

addAuthorNamesToQuestions = async (questions) => {
  let newQuestions = [];

  questions.forEach(async (q) => {
    let newQ = {};
    let jsonQuestion = JSON.parse(JSON.stringify(q));
    for (key in jsonQuestion) {
      console.log(key);
      newQ[key] = jsonQuestion[key];
    }
    await filterUsers({ _id: jsonQuestion.authorId }, (foundUser) => {
      newQ["author"] = foundUser;
    });
    console.log(newQ);
    newQuestions.push(newQ);
  });

  // for (q in questions) {
  //   let newQ = {};
  //   console.log(q);
  //   for (key in q) {
  //     q[key] = newQ[key];
  //   }
  //   newQuestions.push(newQ);
  // }

  console.log(newQuestions);

  return questions;
};

module.exports = {
  sessionTokenValid,
  filterAnswers,
  filterQuestions,
  filterUsers,
  saveModel,
};
