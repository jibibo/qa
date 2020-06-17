const router = require("express").Router();
let UserModel = require("../models/UserModel.js");

// Routes

router.route("/register").post((req, res) => {
  console.log("ROUTE:START /user/register");

  const newUser = new UserModel({
    username: req.body.username,
    password: req.body.password,
  });

  console.log("ROUTE:INFO /user/register: created new UserModel");

  newUser
    .save()
    .then(() => {
      console.log(`ROUTE:OK /user/register: registered ${newUser.username}`);
      res.status(200).json({ result: "success" });
    })
    .catch((err) => {
      console.log(`ROUTE:ERR /user/register: ${err}`);
      res.status(400).json({ result: "err", err: err });
    });
});

router.route("/search").get((req, res) => {
  console.log("ROUTE:START /user/search");

  UserModel.find({ _id: req.body.id }) // should be more options than just _id
    .then((users) => {
      console.log(`ROUTE:OK /user/search: found ${users.length}`);
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(`ROUTE:ERR /user/search: ${err}`);
      res.status(400).json({ result: "err", err: err });
    });
});

module.exports = router;
