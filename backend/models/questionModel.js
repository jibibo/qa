const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "Question",
  new Schema({
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    tags: {
      type: Array,
    },
    author: {
      type: String,
      required: true,
    },
  })
);
