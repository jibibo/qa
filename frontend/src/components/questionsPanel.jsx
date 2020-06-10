import React, { Component } from "react";



class QuestionsPanel extends Component {
  state = {
    
  };

 

  updateQuestions = (query) => {

  }

  render() {
    const questions = this.props.questions;
    return (
      <div className="QuestionsPanel">
        <ul>
          {questions.title} {questions.author}
        </ul>
      </div>
    );
  }
}

export default QuestionsPanel;
