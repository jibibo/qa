const router = require("express").Router();
let AnswerModel = require("../models/answerModel");
let { sessionTokenValid, saveModel } = require("../util");

// Routes

router.route("/add").post((req, res) => {
  console.log("START /answer/add");

  sessionTokenValid(req.body.sessionToken, (foundUser) => {
    console.log(req.body);

    // check if questionId is valid aswell

    if (foundUser) {
      const newAnswer = new AnswerModel({
        text: req.body.text,
        authorId: foundUser._id,
        questionId: req.body.questionId,
      });

      saveModel(
        newAnswer,
        () => {
          console.log(`OK /answer/add: added ${req.body.text}`);
          res.status(200).json({ response: "success" });
        },
        (error) => {
          console.log(`ERROR /answer/add: ${error}`);
          res.status(400).json({ error: error });
        }
      );
    } else {
      console.log(`ERROR /answer/add: invalid session token`);
      res.status(400).json({ error: "session_token_invalid" });
    }
  });
});

module.exports = router;
