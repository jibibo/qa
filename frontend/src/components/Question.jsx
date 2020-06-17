import React, { Component } from "react";

class Question extends Component {
  render() {
    const question = this.props.question;

    return (
      <div id="Question" className="card">
        <div className="card-header bg-info">
          <b>0</b> answers
        </div>
        <div className="card-body">
          <h4 className="card-title">{question.title}</h4>
          <p className="card-text clearfix">{question.content}</p>
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
              Answer!
            </button>
            <button type="button" className="btn btn-secondary">
              View all
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
          <span className="float-right">15 juni 2020</span>
        </div>
      </div>
    );
  }
}

export default Question;
