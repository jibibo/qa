import React, { Component } from "react";

import QuestionDetail from "./QuestionDetail";

class Question extends Component {
  state = {
    hovered: false,
    question: "",
    showQuestionDetail: false,
  };

  handleMouseEnter = (event) => {
    this.setState({ hovered: true });
  };

  handleMouseLeave = (event) => {
    this.setState({ hovered: false });
  };

  isOldQuestion = () => {
    var date = new Date(this.props.question.createdDate);
    var now = Date.now();
    var delta = now - date.getTime();

    return delta > 86400000; // > 24 hours
  };

  formatDate = (dateString) => {
    var date = new Date(dateString);
    var now = Date.now();
    var delta = now - date.getTime();

    if (delta < 0) {
      return "TeneT?";
    } else if (delta === 0) {
      return "now!";
    } else if (delta <= 60000) {
      return Math.ceil(delta / 1000) + " s";
    } else if (delta <= 3600000) {
      return Math.ceil(delta / 60000) + " min";
    } else if (delta <= 86400000) {
      return Math.floor(delta / 3600000) + " h";
    } else {
      return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join(
        "-"
      );
    }
  };

  getCardClass = () => {
    return `card mt-2 ${this.state.hovered ? "shadow " : ""}${
      this.isOldQuestion() ? "bg-dark text-white " : ""
    }${this.props.answers ? "border-success" : "border-danger"}`;
  };

  openQuestion = (question) => {
    this.setState({
      question: question,
      showQuestionDetail: true,
    });
  };

  closeQuestion = () => {
    this.setState({
      showQuestionDetail: false,
    });
  };

  render() {
    const q = this.props.question;

    // NEEDS TO BE PROPER MASONRY PATTERN, OLDEST QUESTIONS NOT AT TOP!

    return (
      <>
        <QuestionDetail
          question={this.state.question}
          showModal={this.state.showQuestionDetail}
          closeModal={this.closeQuestion}
        />
        <div
          id="Question"
          className={this.getCardClass()}
          style={{ cursor: "pointer" }}
          onClick={() => this.openQuestion(q)}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <div className="card-header">
            {/* clicking here should open card and scroll down to answers list*/}
            <span
              className={
                this.props.answers
                  ? "badge badge-success"
                  : "badge badge-danger"
              }
            >
              {this.props.answers}
            </span>{" "}
            answers
            <span className="float-right">
              {this.formatDate(q.createdDate)}
            </span>
          </div>
          <div className="card-body">
            <h4 className="card-title">{q.title}</h4>
            <p className="textInheritAll card-text">{q.description}</p>
            <div className="mb-2">
              {q.tags.map((tag) => {
                // tags here

                return (
                  <a
                    href="/"
                    key={tag}
                    className="badge badge-secondary text-light m-1"
                  >
                    {tag}
                  </a>
                );
              })}
            </div>
            <div className="btn-group btn-group-sm">
              <button type="button" className="btn btn-primary">
                {/* opens the question and instantly puts cursor in answer textarea*/}
                Answer!
              </button>
              <button type="button" className="btn btn-light">
                {/* more options button (report, fav etc) */}
                ...
              </button>
            </div>
          </div>
          <div className="card-footer">
            by{" "}
            <a href="/" className="text-decoration-none text-dark">
              <b>{q.author}</b>
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default Question;
