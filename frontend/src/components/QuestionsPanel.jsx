import React, { Component } from "react";

import axios from "axios";

import Question from "./Question";
import QuestionSearch from "./QuestionSearch";

class QuestionsPanel extends Component {
  state = {
    questions: [],
  };

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = (searchValue) => {
    axios
      .get(`http://localhost:3000/question/search`, {
        params: searchValue,
      })
      .then((r) => {
        this.setState({ questions: r.data });
      });
  };

  render() {
    return (
      <div id="QuestionsPanel">
        {this.props.showSearchBar ? (
          <QuestionSearch fetchQuestions={this.fetchQuestions} />
        ) : null}
        <br />
        <div className="row">
          {this.state.questions.map((question) => {
            return <Question key={question._id} question={question} />;
          })}
        </div>
      </div>
    );
  }
}

export default QuestionsPanel;
