const router = require("express").Router();
let QuestionModel = require("../models/QuestionModel");
let { sessionTokenValid } = require("../util");

// // Routes

router.route("/search").get((req, res) => {
  console.log("ROUTE:START /question/search");

  var params = {};

  if (req.query[0] !== undefined) {
    params = {
      title: {
        $regex: req.query[0],
        $options: "i",
      },
    };
  }

  console.log(`ROUTE:INFO /question/search: searching, params: ${params}`);

  QuestionModel.find(params)
    .then((questions) => {
      console.log(
        `ROUTE:OK /question/search: found ${questions.length} matches`
      );
      res.status(200).json(questions);
    })
    .catch((err) => {
      console.log(`ROUTE:ERR /question/search: ${err}`);
      res.status(400).json({ result: "err", err: err });
    });
});

router.route("/add").post((req, res) => {
  console.log("ROUTE:START /question/add");

  sessionTokenValid(req.body.sessionToken, (foundUser) => {
    console.log(req.json + req.body.json);
    if (foundUser) {
      const newQuestion = new QuestionModel({
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags,
        author: foundUser.username,
      });

      console.log("ROUTE:INFO /question/add: created new QuestionModel");

      newQuestion
        .save()
        .then(() => {
          console.log(`ROUTE:OK /question/add: added ${req.body.title}`);
          res.status(200).json({ response: "success" });
        })
        .catch((err) => {
          console.log(`ROUTE:ERR /question/add: ${err}`);
          res.status(400).json({ response: "err", err: err });
        });
    } else {
      let err = "Invalid session token";

      console.log(`ROUTE:ERR /question/add: ${err}`);
      res.status(400).json({ response: "err", err: err });
    }
  });
});

module.exports = router;
