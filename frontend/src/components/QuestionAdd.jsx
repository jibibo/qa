import React, { Component } from "react";

class QuestionAdd extends Component {
  state = {
    title: "",
    content: "",
    tag: "",
    tags: [],
  };

  handleSubmit = (event) => {
    console.log("Submitted search: " + this.state.searchValue);
    event.preventDefault();
  };

  onUpdate = (e) => {
    if (e.target.name === "tag") {
      if (e.key === " ") {
        var tags = this.state.tags.concat(e.target.value);
        this.setState({ tags: tags });
        console.log(this.state.tags);
        e.target.value = null;
        e.preventDefault();
      } else {
        this.setState({ [e.target.name]: e.target.value });
        console.log(e.target.name, e.target.value);
      }
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  render() {
    return (
      <div id="QuestionAdd" className="col-md-12">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Title (required)"
              value={this.state.title}
              onChange={this.onUpdate}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="content"
              placeholder="Content"
              value={this.state.content}
              onChange={this.onUpdate}
            />
          </div>
          <div className="form-group">
            <div className="bg-success rounded p-5 mx-10">
              topic placeholder
            </div>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="tag"
              placeholder="topic 1 topic 2"
              onKeyPress={this.onUpdate}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Submit question"
              className="btn btn-md btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default QuestionAdd;
