import React, { Component } from "react";

class QuestionSearch extends Component {
  state = {
    searchValue: "",
  };

  handleChange = (event) => {
    this.setState({ searchValue: event.target.value });
    this.props.searchQuestions(event.target.value);
  };

  handleSubmit = (event) => {
    console.log(`Submitted search for ${this.state.searchValue}`);
    event.preventDefault();
  };

  refreshClicked = (event) => {
    this.setState({ searchValue: "" });
    this.props.refreshQuestions();
  };

  render() {
    return (
      <div className="">
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div className="input-group">
            <span class="refresh-icon input-group-prepend">
              <button
                onClick={this.refreshClicked}
                class="btn btn-secondary"
                type="button"
              >
                Refresh
              </button>
            </span>
            <input
              type="text"
              name="question"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.searchValue}
              placeholder="Search questions..."
            />
            <span className="input-group-append">
              <button className="btn btn-primary" type="button">
                Search
              </button>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

export default QuestionSearch;
