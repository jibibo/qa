const router = require("express").Router();
let QuestionModel = require("../models/questionModel");
let {
  sessionTokenValid,
  filterQuestions,
  saveModel,
  filterUsers,
} = require("../util");

// Routes

router.route("/search").get(async (req, res) => {
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

  await filterQuestions(filter, async (questions) => {
    console.log(`OK /question/search: found ${questions.length} matches`);

    const sendQuestions = [];

    questions.forEach(async (q) => {
      await filterUsers({ _id: q.authorId }, (foundUser) => {});
    });

    res.status(200).json(questions);
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

      saveModel;
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
