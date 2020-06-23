const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "Question",
  new Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    choices: {
      type: Array,
      required: true,
    },
    choiceIds: {
      type: Array,
    },
    markedChoiceId: {
      type: String,
    },
    tags: {
      type: Array,
    },
    authorId: {
      type: String,
      required: true,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    lastEditedDate: {
      type: Date,
    },
  })
);
