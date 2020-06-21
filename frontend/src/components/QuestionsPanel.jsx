import React, { Component } from "react";

import axios from "axios";

import QuestionCard from "./QuestionCard";
import Question from "./Question";
import QuestionSearch from "./QuestionSearch";

class QuestionsPanel extends Component {
  state = {
    showQuestion: null,
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
        console.log(r.data);
      });
  };

  renderColumns = () => {
    return this.state.questions.length ? (
      <div className="card-columns">
        {this.state.questions.map((question) => {
          return (
            <QuestionCard
              key={question._id}
              question={question}
              answers={Math.floor(Math.random() * 6)}
            />
          );
        })}
      </div>
    ) : (
      <p>Nothing here (yet)!</p>
    );
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
        <Question />
        <br />
        {this.renderColumns()}
      </div>
    );
  }
}

export default QuestionsPanel;
