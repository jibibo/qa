import React, { Component } from "react";

class Question extends Component {
  state = {};

  render() {
    const question = this.props.question;

    return (
      <div id="Question" className="col-md-4">
        <div className="row">
          <div className="col-md-10">
            <h3>{question.title}</h3>
          </div>
          <div className="col-md-2">
            <div className="btn-group btn-group-sm float-right">
              <button
                type="button"
                className="btn btn-warning"
                style={{ fontSize: 20, padding: 0 }}
              >
                ☆
              </button>
              <button
                type="button"
                className="btn btn-danger"
                style={{ fontSize: 10, padding: 0 }}
              >
                ok
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">0 answers</div>
          <div className="col-md-6">
            <div className="float-right">
              by <b>{question.author}</b>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default Question;
