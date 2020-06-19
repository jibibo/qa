const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "Answer",
  new Schema({
    text: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    questionId: {
      type: Array,
      required: true,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    lastEditedDate: {
      type: Date,
    },
    likedByIds: {
        type: Array,
    },
    dislikedByIds: {
        type: Array,
    }
  })
);
