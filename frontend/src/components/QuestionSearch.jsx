import React, { Component } from "react";

class QuestionSearch extends Component {
  state = {
    searchValue: "",
    tagValue: "",
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

  removeTag = () => {
    console.log("Remove tag");
    this.setState({ tagValue: "" });
    this.props.refreshQuestions();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div className="input-group">
            <span className="refresh-icon input-group-prepend">
              <button
                onClick={this.refreshClicked}
                className="btn btn-primary"
                type="button"
              >
                &#x21bb;
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
          <br />
          <span className="refresh-icon input-group-prepend d-inline">
            <button
              onClick={() => {
                this.props.searchQuestions(this.state.tagValue);
              }}
              className="btn btn-primary mb-1"
              type="button"
            >
              ☑
            </button>
          </span>
          <input
            style={{ borderRadius: "0px 50px 50px 0px" }}
            type="text"
            name="tag"
            className="form-control d-inline col-lg-3 col-md-3 col-sm-3 col-xs-3 center-align"
            onChange={(e) => {
              this.setState({ tagValue: e.target.value });
              this.props.searchQuestions(e.target.value, "tag");
            }}
            value={this.state.tagValue}
            placeholder="Search tag..."
          />
          {this.state.tagValue ? (
            <button
              type="button"
              className="btn btn-outline-secondary rounded-pill m-1 mb-1 ml-2"
              onClick={this.removeTag}
            >
              {this.state.tagValue} <span>&times;</span>
            </button>
          ) : null}
        </form>
      </div>
    );
  }
}

export default QuestionSearch;
