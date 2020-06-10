import React, { Component } from "react";



class QuestionsPanel extends Component {
  state = {
    
  };

 

  updateQuestions = (query) => {

  }

  render() {
    const questions = this.props.questions;
    return (
      <div class="col-md-12">
        <h2>Questions:</h2>
        <ul>
          {this.state.questions.map((question) => {
            return (
              <div key={question._id} className="col-md-6">
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
          })}
        </ul>
      </div>
    );
  }
}

export default QuestionsPanel;
