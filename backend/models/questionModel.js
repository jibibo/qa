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
    tags: {
      type: Array,
    },
    authorId: {
      type: String,
      required: true,
    },
    answerIds: {
      type: Array,
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
    editedDate: {
      type: Date,
    }
  })
);
