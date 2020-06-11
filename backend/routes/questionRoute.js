const router = require("express").Router();
let QuestionModel = require("../models/QuestionModel");
let { usernameExists } = require("../util");

// // Routes

router.route("/search").get((req, res) => {
  console.log("ROUTE /question/search...");

  let params = {};

  if (req.query[0] !== undefined) {
    arams = {
      title: {
        $regex: req.query[0],
        $options: "i",
      },
    };
  }

  console.log(`ROUTE /question/search: querying: ${req.query[0]}`);

  QuestionModel.find(params)
    .then((questions) => {
      console.log(
        `ROUTE /question/search OK: found ${questions.length} matches`
      );
      res.status(200).json(questions);
    })
    .catch((err) => {
      console.log(`ROUTE /question/search ERR: ${err}`);
      res.status(400).json({ result: "err", err: err });
    });
});

router.route("/submit").post((req, res) => {
  console.log("ROUTE /question/submit...");

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
          console.log(`ROUTE /question/submit OK: submitted ${req.body.title}`);
          res.status(200).json({ response: "success" });
        })
        .catch((err) => {
          console.log(`ROUTE /question/submit ERR: ${err}`);
          res.status(400).json({ response: "err", err: err });
        });
    } else {
      let err = "User not found";

      console.log(`ROUTE /question/submit ERR: ${err}`);
      res.status(400).json({ response: "err", err: err });
    }
  };

  usernameExists(req.body.author, callback);
});

module.exports = router;
