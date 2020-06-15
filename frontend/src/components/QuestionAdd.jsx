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
    if (e.target.name === "tag" && e.key === " ") {
      var tags = this.state.tags.concat([e.target.value]);
      this.updateList(tags);
      e.target.value = null;
      e.preventDefault();
    } else {
      console.log(e.target.name, e.target.value);
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  updateList = (tags) => {
    this.setState({ tags: tags });
    console.log(tags);
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
            {this.state.tags.map((tag) => {
              return (
                <button
                  type="button"
                  class="btn btn-outline-secondary rounded-pill m-1"
                >
                  {tag} <span aria-hidden="true">&times;</span>
                </button>
              );
            })}
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="tag"
              placeholder="Tags (space to add)"
              onKeyPress={this.onUpdate}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Submit Question"
              className="btn btn-md btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default QuestionAdd;
