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
          <div className="input-group shadow-lg">
            <span className="refresh-icon input-group-prepend">
              <button
                onClick={this.refreshClicked}
                className="btn text-white"
                style={{ backgroundColor: "#121517" }}
                type="button"
              >
                &#x21bb;
              </button>
            </span>
            <input
              type="text"
              name="question"
              className="form-control"
              style={{ backgroundColor: "#121517", border: "none" }}
              onChange={this.handleChange}
              value={this.state.searchValue}
              placeholder="Search questions..."
            />
            <span className="input-group-append">
              <button
                className="btn text-white"
                style={{ backgroundColor: "#121517" }}
                type="button"
              >
                Search
              </button>
            </span>
          </div>
          <br />
          <div className="input-group">
            <span className="refresh-icon input-group-prepend">
              <button
                onClick={() => {
                  this.props.searchQuestions(this.state.tagValue);
                }}
                className="btn"
                style={{
                  backgroundColor: "#121517",
                }}
                type="button"
              >
                ☑
              </button>
            </span>
            <input
              type="text"
              name="tag"
              className="form-control shadow-lg col-lg-3 col-md-3 col-sm-3 col-xs-3"
              style={{
                borderRadius: "0px 50px 50px 0px",
                backgroundColor: "#121517",
                border: "none",
                height: "auto",
              }}
              onChange={(e) => {
                this.setState({ tagValue: e.target.value });
                this.props.searchQuestions(e.target.value, "tag");
              }}
              value={this.state.tagValue}
              placeholder="Search tag..."
            />
            {this.state.tagValue ? (
              <span className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-light rounded-pill m-1 mb-1 ml-2"
                  onClick={this.removeTag}
                >
                  {this.state.tagValue} <span>&times;</span>
                </button>
              </span>
            ) : null}
          </div>
        </form>
      </div>
    );
  }
}

export default QuestionSearch;
