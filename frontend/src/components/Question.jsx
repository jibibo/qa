import React, { Component } from "react";

class Question extends Component {
  state = {
    hovered: false,
  };

  handleMouseEnter = (event) => {
    this.setState({ hovered: true });
  };

  handleMouseLeave = (event) => {
    this.setState({ hovered: false });
  };

  render() {
    const question = this.props.question;

    const dateColor = (date) => {
      var questionDate = new Date(date).getDate();
      var dayAgo = new Date();
      dayAgo.setDate(dayAgo.getDate() - 1);
      console.log(questionDate);
      console.log(dayAgo);
      if (
        questionDate < dayAgo &&
        new Date(date).getFullYear() === dayAgo.getFullYear()
      ) {
        return true;
      }
      return false;
    };

    const formatDate = (date) => {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [day, month, year].join("-");
    };

    return (
      <div
        id="Question"
        className={this.state.hovered ? "card shadow-lg" : "card"}
        style={{ cursor: "pointer" }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="card-header bg-info">
          <b>0</b> answers
        </div>
        <div className="card-body">
          <h4 className="card-title">{question.title}</h4>
          <pre className="card-text">{question.content}</pre>
          <div className="mb-1">
            {question.tags.map((tag) => {
              return (
                <a
                  href="/"
                  key={tag}
                  className="badge badge-info badge-secondary m-1"
                >
                  {tag}
                </a>
              );
            })}
          </div>
          <div className="btn-group btn-group-sm">
            <button type="button" className="btn btn-primary">
              {/* opens the question and instantly goes to answer textarea*/}
              Answer!
            </button>
            <button type="button" className="btn btn-light">
              {/* more options button (report, fav etc) */}
              ...
            </button>
          </div>
        </div>
        <div className="card-footer">
          {/* if question older than a day:
          - color red
          - date is "x Month 2020" localized in language (march 15th, 2020 for USA for example) 
          else:
          - color normal
          - date is only timestamp, HH:MM:SS (converted to local timezone) */}
          by{" "}
          <a href="/" className="text-decoration-none text-dark">
            <b>{question.author}</b>
          </a>
          <small
            className="float-right"
            style={
              dateColor(question.createdDate)
                ? { color: "green" }
                : { color: "red" }
            }
          >
            {formatDate(question.createdDate)}
          </small>
        </div>
      </div>
    );
  }
}

export default Question;
