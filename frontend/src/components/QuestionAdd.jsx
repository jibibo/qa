import React, { Component } from "react";

class QuestionAdd extends Component {
  state = {};

  handleSubmit = (event) => {
    console.log("Submitted search: " + this.state.searchValue);
    event.preventDefault();
  };

  render() {
    return (
      <div className="QuestionAdd">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Title"
          />
          <input
            type="text"
            className="form-control"
            name="content"
            placeholder="Content"
          />
          <input
            type="text"
            className="form-control"
            name="topics"
            placeholder="Topic 1, topic 2"
          />
        </form>
      </div>
    );
  }
}

export default QuestionAdd;
