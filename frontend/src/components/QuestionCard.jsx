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

    return delta > 86400000; // > 24 hours true/false
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

  getCardClasses = () => {
    return `card mt-2 ${this.state.hovered ? "shadow-sm " : ""}${
      this.isOldQuestion() ? "bg-dark text-white " : ""
    }`;
  };

  getAuthorButtonClasses = () => {
    return `btn btn-link btn-sm ${
      this.isOldQuestion() ? "text-light" : "text-dark"
    }`;
  };

  render() {
    return (
      // ${this.props.question.choices.length ? "" : ""}
      <>
        <div
          id="QuestionCard"
          className={this.getCardClasses()}
          style={{ borderRadius: "10px" }}
        >
          <div
            className="shadow-sm"
            style={{
              borderBottomRightRadius: "30%",
              borderTopLeftRadius: "10px",
              position: "absolute",
              zIndex: 1,
              right: -2,
              bottom: -2,
              backgroundColor: this.props.question.choices.length
                ? "#4CBB17"
                : "#D5212E",
              width: 40,
              height: 40,
            }}
          >
            <span>&#8203;</span>
          </div>
          <div className="card-header">
            <button className={this.getAuthorButtonClasses()}>
              <b>{this.props.question.author}</b>
            </button>
            <span title={this.formatDateTitle()} className="float-right">
              {this.formatDate()}
            </span>
          </div>

          <div
            className="card-body"
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            style={{ cursor: "pointer" }}
            onClick={() => this.props.onShowQuestion(this.props.question)}
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
                    href="#"
                    onClick={() => this.props.searchQuestions(tag, "tag")}
                    key={tag}
                    className="badge badge-secondary text-light m-1"
                  >
                    {tag}
                  </a>
                );
              })}
            </div>
          ) : null}

          <div id="QuestionCardChoices" className="card-footer" onClick={null}>
            <span
              className={
                this.props.question.choices.length
                  ? "badge badge-success"
                  : "badge badge-danger"
              }
            >
              {this.props.question.choices.length}
            </span>{" "}
            choices
          </div>
        </div>
      </>
    );
  }
}

export default QuestionCard;
