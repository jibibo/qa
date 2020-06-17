const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

console.log("Setting up Express app...");

const expressApp = express();
expressApp.use(cors());
expressApp.use(express.json());

const port = process.env.PORT;

console.log("Connecting to MongoDB...");

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

expressApp.use("/user", require("./routes/UserRoute"));
expressApp.use("/question", require("./routes/QuestionRoute"));
expressApp.use("/answer", require("./routes/AnswerRoute"));

expressApp.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});
