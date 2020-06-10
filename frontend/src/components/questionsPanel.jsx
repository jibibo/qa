import React, { Component } from "react";

import axios from "axios";

// import Question from "./question";

class QuestionsPanel extends Component {
  state = {
    questions: [],
  };

  render() {
    axios
      .get("http://localhost:3000/questions")
      .then((r) => {
        this.setState({
          questions: r.data,
        });
      })
      .catch((err) => console.log(err));

    return (
      <div className="panel">
        <h2>Questions:</h2>
        <ul>
          {this.state.questions.map((question) => {
            return (
              <li key={question._id}>
                {question.title} by {question.author}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default QuestionsPanel;
