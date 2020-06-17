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

  isOldQuestion = (dateString) => {
    var date = new Date(dateString);
    var now = Date.now();
    var delta = now - date.getTime();

    if (delta > 86400000) {
      return true;
    }

    return false;
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

  render() {
    const q = this.props.question;

    return (
      <div
        id="Question"
        className={this.state.hovered ? "card mt-2 shadow" : "card mt-2"}
        style={{ cursor: "pointer" }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="card-header">
          <span className="badge badge-danger">0</span> answers{" "}
          {/* clicking here should open card and scroll down to answers list*/}
          <span
            className={
              this.isOldQuestion(q.createdDate)
                ? "float-right text-danger"
                : "float-right"
            }
          >
            {this.formatDate(q.createdDate)}
          </span>
        </div>
        <div className="card-body">
          <h4 className="card-title">{q.title}</h4>
          <p className="textInheritAll card-text">{q.description}</p>
          <div className="mb-1">
            {q.tags.map((tag) => {
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
    );
  }
}

export default Question;
