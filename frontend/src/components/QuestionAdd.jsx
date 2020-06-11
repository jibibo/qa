import React, { Component } from "react";

class QuestionAdd extends Component {
  state = {};

  handleSubmit = (event) => {
    console.log("Submitted search: " + this.state.searchValue);
    event.preventDefault();
  };

  render() {
    return (
      <div className="QuestionAdd col-md-6">
        <form onSubmit={this.handleSubmit}>
          <div className="col-md-3"></div>
        </form>
      </div>
    );
  }
}

export default QuestionAdd;
