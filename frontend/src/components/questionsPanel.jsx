import React, { Component } from "react";

import axios from "axios";

import Question from "./question";

class QuestionsPanel extends Component {
  state = {};
  render() {
    let questionsFormatted;

    axios
      .get("http://localhost:3000/questions")
      .then((r) => {
        r.data.forEach((q) => {
          <li id={q._id}>
            <b>{q.title}</b> by {q.author} (id = {q._id})
          </li>;
        });
      })
      .catch((err) => console.log(err));

    return (
      <div className="panel">
        <h2>Active questions:</h2>
        <Question />
      </div>
    );
  }
}

export default QuestionsPanel;
