const router = require("express").Router();
let QuestionModel = require("../models/QuestionModel");
let { usernameExists } = require("../util");

// // Routes

router.route("/search").get((req, res) => {
  console.log("ROUTE START /question/search");

  let params = {};

  if (req.query[0] !== undefined) {
    params = {
      title: {
        $regex: req.query[0],
        $options: "i",
      },
    };
  }

  console.log(`ROUTE INFO /question/search: querying: ${req.query[0]}`);

  QuestionModel.find(params)
    .then((questions) => {
      console.log(
        `ROUTE OK /question/search: found ${questions.length} matches`
      );
      res.status(200).json(questions);
    })
    .catch((err) => {
      console.log(`ROUTE ERR/question/search: ${err}`);
      res.status(400).json({ result: "err", err: err });
    });
});

router.route("/submit").post((req, res) => {
  console.log("ROUTE START /question/submit");

  let callback = (exists) => {
    if (exists) {
      const newQuestion = new QuestionModel({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
      });

      console.log("ROUTE INFO /question/submit: created new QuestionModel");

      newQuestion
        .save()
        .then(() => {
          console.log(`ROUTE OK /question/submit: submitted ${req.body.title}`);
          res.status(200).json({ response: "success" });
        })
        .catch((err) => {
          console.log(`ROUTE ERR /question/submit: ${err}`);
          res.status(400).json({ response: "err", err: err });
        });
    } else {
      let err = "User not found";

      console.log(`ROUTE ERR /question/submit: ${err}`);
      res.status(400).json({ response: "err", err: err });
    }
  };

  usernameExists(req.body.author, callback);
});

module.exports = router;
