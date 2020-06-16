import React, { Component } from "react";

class QuestionAdd extends Component {
  state = {
    title: "",
    content: "",
    tag: "",
    tags: [],
    notHidden: true,
    alreadyAdded: "",
  };

  handleSubmit = (event) => {
    console.log("Submitted search: " + this.state.searchValue);
    event.preventDefault();
  };

  onUpdate = (e) => {
    if (e.target.name === "tag" && e.key === " ") {
      if (this.state.tags.includes(e.target.value.toLowerCase())) {
        this.setState({ notHidden: false });
        this.setState({ alreadyAdded: e.target.value });
        e.target.value = null;
        e.preventDefault();
      } else {
        this.setState({ notHidden: true });
        var tags = this.state.tags.concat([e.target.value.toLowerCase()]);
        this.updateList(tags);
        e.target.value = null;
        e.preventDefault();
      }
    } else {
      console.log(e.target.name, e.target.value);
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  updateList = (tags) => {
    this.setState({ tags: tags });
    console.log(tags);
  };

  removeFromList = (tag) => {
    var tags = this.state.tags.filter((tagItem) => tagItem !== tag);
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
                  key={tag}
                  type="button"
                  className="btn btn-outline-secondary rounded-pill m-1"
                  onClick={() => this.removeFromList(tag)}
                >
                  {tag} <span aria-hidden="true">&times;</span>
                </button>
              );
            })}
          </div>
          <div className="alert alert-danger" hidden={this.state.notHidden}>
            You've already added <b>{this.state.alreadyAdded}</b>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="tag"
              autoComplete="off"
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
