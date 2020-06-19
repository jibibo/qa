const router = require("express").Router();
let UserModel = require("../models/UserModel.js");

// Routes

router.route("/register").post((req, res) => {
  console.log("ROUTE:START /user/register");
  UserModel.find({ username: req.body.username }).then((foundUsers) => {
    console.log(`ROUTE Users matched: ${foundUsers}`);

    // possible bug: different users with identical session tokens will break this
    if (foundUsers[0]) {
      console.log(
        `ROUTE:ERR Username ${foundUsers[0].username} already exists`
      );
      res.status(404).json({ result: "err" });
    } else {
      const newUser = new UserModel({
        username: req.body.username,
        password: req.body.password,
      });

      newUser
        .save()
        .then(() => {
          console.log(`ROUTE:OK /user/register: added ${req.body.username}`);
          res
            .status(200)
            .json({ response: "success", username: req.body.username });
        })
        .catch((err) => {
          console.log(`ROUTE:ERR /user/register: ${err}`);
          res.status(400).json({ response: "err", err: err });
        });
    }
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
