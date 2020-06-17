const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const port = process.env.PORT;

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connection established");
});

app.use(express.json());

app.use("/user", require("./routes/UserRoute"));
app.use("/question", require("./routes/QuestionRoute"));
app.user("/answer", require("./routes/AnswerRoute"))

app.listen(port, () => {
  console.log(`Backend ready on port ${port}`);
});
