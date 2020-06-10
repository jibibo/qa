const router = require("express").Router();
let UserModel = require("../models/userModel.js");

// insert emailExists function to check if duplicate addresses

// Routes

router.route("/register").post((req, res) => {
  console.log("ROUTE /user/register...");

  const newUser = new UserModel({
    username: req.body.username,
    password: req.body.password,
    registered: Date.now(),
  });

  newUser
    .save()
    .then(() => {
      console.log(`ROUTE /user/register OK: registered ${newUser.username}`);
      res.status(200).json({ result: "success" });
    })
    .catch((err) => {
      console.log(`ROUTE /user/register ERROR: ${err}`);
      res.status(400).json({ result: "err", err: err });
    });
});

router.route("/search").get((req, res) => {
  console.log("ROUTE /user/search...");

  UserModel.find({ _id: req.body.id }) // should be more options than just _id
    .then((users) => {
      console.log(`ROUTE /user/search OK: found ${users.length}`);
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(`ROUTE /user/search err: ${err}`);
      res.status(400).json({ result: "err", err: err });
    });
});

module.exports = router;
