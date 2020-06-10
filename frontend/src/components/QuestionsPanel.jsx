import React, { Component } from "react";

import axios from "axios";

import Question from "./Question";

class QuestionsPanel extends Component {
  state = {
    questions: [],
    searchValue: "",
  };

  componentDidMount() {
    this.fetchQuestions();
  }

  handleChange = (event) => {
    this.setState({ searchValue: event.target.value });
    this.fetchQuestions(event.target.value);
  };

  fetchQuestions = (searchValue) => {
    axios
      .get(`http://localhost:3000/question/fetch?title=${searchValue}`, {})
      .then((r) => {
        this.setState({ questions: r.data });
      });
  };

  handleSubmit(event) {
    console.log("Submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="col-md-12">
        {this.props.showSearchBar ? (
          <div className="row">
            <div className="col-lg-10 col-md-10">
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="question"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.searchValue}
                  placeholder="Search questions..."
                />
              </form>
            </div>
            <div className="col-lg-2 col-md-2">
              <input
                type="submit"
                value="Search"
                className="btn btn-lg btn-primary"
              />
            </div>
          </div>
        ) : null}

        <div className="row">
          <h2>Questions:</h2>
        </div>
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
