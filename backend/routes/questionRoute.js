const router = require("express").Router();
let QuestionModel = require("../models/QuestionModel");
let { sessionTokenValid } = require("../util");

// Routes

router.route("/search").get((req, res) => {
  console.log("START /question/search");

  var filter = {};

  if (req.query[0] !== undefined) {
    filter = {
      title: {
        $regex: req.query[0],
        $options: "i",
      },
    };
  }

  console.log(`INFO /question/search: searching, filter: ${filter}`);

  QuestionModel.find(filter)
    .sort("-createdDate")
    .then((questions) => {
      console.log(
        `OK /question/search: found ${questions.length} matches`
      );
      res.status(200).json(questions);
    })
    .catch((err) => {
      console.log(`ERR /question/search: ${err}`);
      res.status(400).json({ result: "err", err: err });
    });
});

router.route("/add").post((req, res) => {
  console.log("START /question/add");

  sessionTokenValid(req.body.sessionToken, (foundUser) => {
    console.log(req.body);
    if (foundUser) {
      const newQuestion = new QuestionModel({
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        authorId: foundUser._id,
      });

      console.log("INFO /question/add: created new QuestionModel");

      newQuestion
        .save()
        .then(() => {
          console.log(`OK /question/add: added ${req.body.title}`);
          res.status(200).json({ response: "success", title: req.body.title });
        })
        .catch((err) => {
          console.log(`ERR /question/add: ${err}`);
          res.status(400).json({ response: "err", err: err });
        });
    } else {
      let err = "Invalid session token";

      console.log(`ERR /question/add: ${err}`);
      res.status(400).json({ response: "err", err: err });
    }
  });
});

module.exports = router;
