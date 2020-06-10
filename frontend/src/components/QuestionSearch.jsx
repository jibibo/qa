import React, { Component } from "react";

import axios from "axios";

class QuestionSearch extends Component {
  state = {};

  handleChange = (event) => {
    this.setState({ search: event.target.value });
    console.log(this.state.search);
    axios
      .get(`http://localhost:3000/question/search/`, {
        params: {
          title: this.state.search,
        },
      })
      .then((r) => {
        this.setState({ questions: r.data });
      });
  };

  render() {
    return (
      <div className="row">
        <div className="col-lg-10 col-md-10">
          <form>
            <input
              type="text"
              className="form-control"
              name="question"
              onChange={this.handleChange}
              placeholder="Search questions..."
            />
          </form>
        </div>
        <div className="col-lg-2 col-md-2">
          <div className="btn btn-lg btn-primary">Search</div>
        </div>
      </div>
    );
  }
}

export default QuestionSearch;
