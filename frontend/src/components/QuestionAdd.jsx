import React, { Component } from "react";

class QuestionAdd extends Component {
  state = {};

  handleSubmit = (event) => {
    console.log("Submitted search: " + this.state.searchValue);
    event.preventDefault();
  };

  render() {
    return (
      <div id="QuestionAdd" className="col-md-12">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Title*"
            />
          </div>
          <div className="row">
            <input
              type="text"
              className="form-control"
              name="author"
              placeholder="Author*"
            />
          </div>
          <div className="row">
            <input
              type="text"
              className="form-control"
              name="content"
              placeholder="Content"
            />
          </div>
          <div className="row">
            <input
              type="text"
              className="form-control"
              name="topics"
              placeholder="Topic 1, topic 2"
            />
          </div>
          <div className="row">
            <input
              type="submit"
              value="Submit question"
              className="btn btn-md btn-primary"
            />
            <p>* required</p>
          </div>
        </form>
      </div>
    );
  }
}

export default QuestionAdd;
