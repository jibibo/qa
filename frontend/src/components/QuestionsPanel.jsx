import React, { Component } from "react";

import axios from "axios";

import Question from "./Question";

class QuestionsPanel extends Component {
  state = {
    questions: [],
  };

  componentDidMount() {
    axios
      .get("http://localhost:3000/question")
      .then((r) => {
        this.setState({
          questions: r.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="col-md-12">
        <h2>Questions:</h2>
        <ul>
          {this.state.questions.map((question) => {
            return <Question key={question._id} question={question} />;
          })}
        </ul>
      </div>
    );
  }
}

export default QuestionsPanel;
