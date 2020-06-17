const router = require("express").Router();
let AnswerModel = require("../models/AnswerModel");
let { sessionTokenValid } = require("../util");

// Routes

router.route("/add").post((req, res) => {
  console.log("ROUTE:START /answer/add");

  sessionTokenValid(req.body.sessionToken, (foundUser) => {
    console.log(req.body);

    // check if questionId is valid aswell

    if (foundUser) {
      const newAnswer = new AnswerModel({
        text: req.body.text,
        authorId: foundUser._id,
        questionId: req.body.questionId,
      });

      console.log("ROUTE:INFO /answer/add: created new AnswerModel");

      newAnswer
        .save()
        .then(() => {
          console.log(`ROUTE:OK /answer/add: added ${req.body.text}`);
          res.status(200).json({ response: "success" });
        })
        .catch((err) => {
          console.log(`ROUTE:ERR /answer/add: ${err}`);
          res.status(400).json({ response: "err", err: err });
        });
    } else {
      let err = "Invalid session token";

      console.log(`ROUTE:ERR /answer/add: ${err}`);
      res.status(400).json({ response: "err", err: err });
    }
  });
});

module.exports = router;
