const router = require("express").Router();
let UserModel = require("../models/UserModel.js");
let { filterUsers, saveModel } = require("../util");

const uuid = require("uuid");

// Routes

router.route("/register").post((req, res) => {
  console.log("START /user/register");

  if (filterUsers({ username: req.body.username })) {
    console.log(`ERROR /user/register: Username ${req.body.username} is taken`);
    res.status(400).json({ error: "username_taken" });
  } else if (
    req.body.password !== undefined &&
    req.body.password !== req.body.confirmPassword
  ) {
    console.log("ERROR /user/register: Passwords don't match");
    res.status(400).json({ error: "passwords_dont_match" });
  } else if (req.body.withEmail && filterUsers({ email: req.body.email })) {
    console.log(`ERROR /user/register: Email ${req.body.email} is taken`);
    res.status(400).json({ error: "email_taken" });
  } else {
    // we good

    const sessionToken = uuid.v4();

    const newUser = new UserModel({
      username: req.body.username,
      password: req.body.password,
      email: req.body.withEmail ? req.body.email : null,
      sessionToken: sessionToken,
    });

    console.log("INFO /user/register: Created new UserModel");

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
        res.status(400).json({ error: error });
      }
    );
  }
});

router.route("/search").get((req, res) => {
  console.log("START /user/search");

  users = filterUsers({ username: req.body.username }); // more options

  if (users) {
    console.log(`OK /user/search: found ${users.length}`);
    res.status(200).json(users);
  } else {
    console.log(`ERROR /user/search: ${error}`);
    res.status(400).json({ error: error });
  }
});

module.exports = router;
