const router = require("express").Router();
let QuestionModel = require("../models/QuestionModel");
let { usernameExists } = require("../util");

// Routes

router.route("/").get((req, res) => {
  console.log("ROUTE /questions/...");

  QuestionModel.find({})
    .then((questions) => {
      console.log(`ROUTE /questions/ OK`);
      res.status(200).json(questions);
    })
    .catch((err) => {
      console.log(`ROUTE /questions/ ERR: ${err}`);
      res.status(400).json({ result: "err", err: err });
    });
});

router.route("/submit").post((req, res) => {
  console.log("ROUTE /questions/submit...");

  let callback = (exists) => {
    if (exists) {
      const newQuestion = new QuestionModel({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
      });

      newQuestion
        .save()
        .then(() => {
          console.log(
            `ROUTE /questions/submit OK: submitted ${req.body.title}`
          );
          res.status(200).json({ response: "success" });
        })
        .catch((err) => {
          console.log(`ROUTE /users/register ERR: ${err}`);
          res.status(400).json({ response: "err", err: err });
        });
    } else {
      let err = "User not found";

      console.log(`ROUTE /users/register ERR: ${err}`);
      res.status(400).json({ response: "err", err: err });
    }
  };

  usernameExists(req.body.author, callback);
});

module.exports = router;
