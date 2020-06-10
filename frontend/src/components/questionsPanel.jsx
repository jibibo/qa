import React, { Component } from "react";

import axios from "axios";

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
      <div className="questionsPanel">
        <h2>Questions:</h2>
        <ul>
          {this.state.questions.map((question) => {
            return (
              <div key={question._id} className="row">
                <div className="col-lg-3">
                  <div className="panel panel-sm">pct%</div>
                </div>
                <div className="col-lg-6 align">{question.title}</div>
                <div className="col-lg-3">{question.author}</div>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default QuestionsPanel;
