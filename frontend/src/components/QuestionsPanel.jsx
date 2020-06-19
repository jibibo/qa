import React, { Component } from "react";

import axios from "axios";

import Question from "./Question";
import QuestionSearch from "./QuestionSearch";

class QuestionsPanel extends Component {
  state = {
    questions: [],
  };

  componentDidMount() {
    // on window load
    this.refreshQuestions();
  }

  refreshQuestions = () => {
    this.searchQuestions();
  };

  searchQuestions = (searchValue) => {
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
          <QuestionSearch
            searchQuestions={this.searchQuestions}
            refreshQuestions={this.refreshQuestions}
          />
        ) : null}
        <br />
        <div className="card-columns">
          {this.state.questions.map((question) => {
            return (
              <Question
                key={question._id}
                question={question}
                answers={Math.floor(Math.random() * 6)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default QuestionsPanel;
