import React, { Component } from "react";

class Question extends Component {
  state = {};

  render() {
    const question = this.props.question;

    return (
      <div className="col-md-6">
        <div className="row">
          <div className="col-md-3">
            <h3>{question.title}</h3>
          </div>
          <div className="col-md-3">0 answers</div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="btn-group btn-group-lg">
              <button type="button" className="btn btn-warning">
                ☆
              </button>
              <button type="button" className="btn btn-danger">
                ok
              </button>
            </div>
          </div>
          <div className="col-md-3">
            by <b>{question.author}</b>
          </div>
        </div>
      </div>
    );
  }
}

export default Question;
