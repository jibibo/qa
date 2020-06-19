let UserModel = require("./models/UserModel.js");

filterUsers = async (filter) => {
  UserModel.find(filter)
    .then((users) => {
      if (users) {
        console.log(
          `INFO /util Filter ${filter} gave ${users.length} results: ${users}`
        );
        return users;
      } else {
        console.log(`INFO /util Filter ${filter} gave no results`);
        return null;
      }
    })
    .catch((error) => {
      console.log(`ERROR /util Unhandled error on filterUser: ${error}`);
    });
};

sessionTokenValid = async (sessionToken, callback) => {
  console.log(
    `INFO /util Checking if session token ${sessionToken} is valid...`
  );

  user = filterUsers({ sessionToken: sessionToken });

  if (user) {
    console.log(`INFO /util Session token ${sessionToken} is valid`);
    callback(user);
  } else {
    console.log(`INFO /util Session token ${sessionToken} is not valid`);
    callback(false);
  }
};

saveModel = async (model, onSuccess, onError) => {
  model
    .save()
    .then(() => {
      console.log(`OK /util/saveModel: Saved model`);
      onSuccess();
    })
    .catch((error) => {
      console.log(`ERROR /util/saveModel: ${error}`);
      onError(error);
    });
};

module.exports = {
  sessionTokenValid,
  filterUsers,
  saveModel,
};
