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

  // trying to implement search by tag

  if (req.query.searchValue !== undefined && req.query.options !== undefined) {
    filter = {
      tags: {
        $regex: req.query.searchValue,
        $options: "i",
      },
    };
  } else if (
    req.query.searchValue !== undefined &&
    req.query.tag === undefined
  ) {
    filter = {
      title: {
        $regex: req.query.searchValue,
        $options: "i",
      },
    };
  }

  await filterQuestions(filter, async (questions) => {
    console.log(questions);
    await addAuthorNamesToQuestions(questions).then((newQuestions) => {
      console.log(
        `OK /question/search, sending length: ${newQuestions.length}`
      );
      res.status(200).json(newQuestions);
      // addAuthorNamesToQuestions doesnt work with options query?
    });
  });
});

router.route("/add").post((req, res) => {
  console.log("START /question/add");

  filterUsers({ sessionToken: req.body.sessionToken }, (matches) => {
    // console.log(req.body);
    if (matches) {
      console.log("Author:");
      console.log(matches[0]);

      const newQuestion = new QuestionModel({
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        choices: req.body.choices,
        authorId: matches[0]._id,
      });

      saveModel;
      newQuestion
        .save()
        .then(() => {
          console.log(`OK /question/add: added ${req.body.title}`);
          res.status(200).json({ title: req.body.title });
        })
        .catch((error) => {
          console.log(`ERR /question/add: ${error}`);
          res.status(500).json({ error: error });
        });
    } else {
      let error = "Invalid session token";

      console.error(`ERROR /question/add: ${error}`);
      res.status(400).json({ error: error });
    }
  });
});

module.exports = router;
