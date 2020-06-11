import React, { Component } from "react";

class QuestionSearch extends Component {
  // moved to questions panel
  state = {
    searchValue: "",
  };

  handleChange = (event) => {
    this.setState(
      { searchValue: event.target.value },
      this.props.fetchQuestions(event.target.value)
    );
  };

  handleSubmit = (event) => {
    console.log("Submitted: " + this.state.searchValue);
    event.preventDefault();
  };

  render() {
    return (
      <div className="row">
        <div className="col-lg-10 col-md-10">
          <form onSubmit={this.handleSubmit} autoComplete="off">
            <input
              type="text"
              name="question"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.searchValue}
              placeholder="Search questions..."
            />
          </form>
        </div>
        <div className="col-lg-2 col-md-2">
          <input
            type="submit"
            value="Search"
            className="btn btn-lg btn-primary"
          />
        </div>
      </div>
    );
  }
}

export default QuestionSearch;
