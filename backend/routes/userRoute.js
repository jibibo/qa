const router = require("express").Router();
let UserModel = require("../models/userModel");
let { filterUsers, saveModel } = require("../util");

const uuid = require("uuid");

// Routes

router.route("/register").post(async (req, res) => {
  console.log("START /user/register");

  var usernameMatches;
  await filterUsers({ username: req.body.username }, (matches) => {
    usernameMatches = matches;
  });

  var emailMatches;
  await filterUsers({ email: req.body.email }, (matches) => {
    emailMatches = matches;
  });
  console.log(`usernameMatches ${usernameMatches}`);
  if (usernameMatches.length > 0) {
    console.log(`ERROR /user/register: Username ${req.body.username} is taken`);
    res.status(400).json({ error: "username_taken" });
  } else if (req.body.withEmail && emailMatches) {
    console.log(`ERROR /user/register: Email ${req.body.email} is taken`);
    res.status(400).json({ error: "email_taken" });
  } else if (
    req.body.password && // test if this could be true by accident
    req.body.password !== req.body.confirmPassword
  ) {
    console.log("ERROR /user/register: Passwords don't match");
    res.status(400).json({ error: "passwords_dont_match" });
  } else {
    // we good

    const sessionToken = uuid.v4();

    const newUser = new UserModel({
      username: req.body.username,
      password: req.body.password,
      email: req.body.withEmail ? req.body.email : null,
      sessionToken: sessionToken,
    });

    saveModel(
      newUser,
      () => {
        console.log(`OK /user/register: registered ${req.body.username}`);
        res.status(200).json({
          username: req.body.username,
          sessionToken: sessionToken,
        });
      },
      (error) => {
        console.log(`ERROR /user/register: ${error}`);
        res.status(400).json({ error: error });
      }
    );
  }
});

router.route("/search").get(async (req, res) => {
  console.log("START /user/search");

  await filterUsers({ username: req.body.username }, (users) => {
    if (users) {
      console.log(`OK /user/search: found ${users.length}`);
      res.status(200).json(users);
    } else {
      console.log(`ERROR /user/search: ${error}`);
      res.status(400).json({ error: error });
    }
  });
});

module.exports = router;
