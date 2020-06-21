import React, { Component } from "react";

class QuestionCard extends Component {
  state = {
    hovered: false,
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

  formatDate = () => {
    var date = new Date(this.props.question.createdDate);
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

  formatDateTitle = () => {
    return new Date(this.props.question.createdDate).toString();
  };

  getCardClass = () => {
    return `card mt-2 ${this.state.hovered ? "shadow " : ""}${
      this.isOldQuestion() ? "bg-dark text-white " : ""
    }${
      this.props.question.answers.length ? "border-success" : "border-danger"
    }`;
  };

  render() {
    // NEEDS TO BE PROPER MASONRY PATTERN, OLDEST QUESTIONS NOT AT TOP!

    return (
      <div
        id="Question"
        className={this.getCardClass()}
        style={{ cursor: "pointer", borderRadius: "10px" }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="card-header">
          <a href="/" className="text-decoration-none text-dark">
            <b>{this.props.question.author}</b>
          </a>
          <span title={this.formatDateTitle()} className="float-right">
            {this.formatDate()}
          </span>
        </div>

        <div
          className="card-body"
          onClick={() => this.props.showQuestion(this.props.question)}
        >
          <h4 className="card-title">{this.props.question.title}</h4>
          <p className="textInheritAll card-text">
            {this.props.question.description}
          </p>
        </div>

        {this.props.question.tags.length > 0 ? (
          <div id="QuestionCardTags" className="card-footer">
            {this.props.question.tags.map((tag) => {
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
        ) : null}

        <div id="QuestionCardAnswers" className="card-footer" onClick={null}>
          <span
            className={
              this.props.question.answers.length
                ? "badge badge-success"
                : "badge badge-danger"
            }
          >
            {this.props.question.answers.length}
          </span>{" "}
          answers
        </div>
      </div>
    );
  }
}

export default QuestionCard;
