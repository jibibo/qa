const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");

module.exports = mongoose.model(
  "User",
  new Schema({
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    moderator: {
      type: Boolean,
      default: false,
    },
    followerIds: {
      type: Array,
    },
    followingIds: {
      type: Array,
    },
    registeredDate: {
      type: Date,
      default: Date.now(),
    },
    sessionToken: {
      // should support multiple session tokens (atleast, somehow handle multiple devices)
      type: String,
      default: uuid.v4(),
    },
  })
);
