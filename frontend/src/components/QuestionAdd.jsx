import React, { Component } from "react";

import axios from "axios";

class QuestionAdd extends Component {
  state = {
    titleValue: "",
    contentValue: "",
    addedTags: [],
    duplicateTag: "",
    hideDuplicateAlert: true,
  };

  handleSubmit = (event) => {
    console.log(`Adding question: ${this.state.titleValue}`);

    const params = {
      title: this.state.titleValue,
      content: this.state.contentValue,
      tags: this.state.addedTags,
      sessionToken: null, // set to sessionToken in cookies
    };

    axios
      .post(`http://localhost:3000/question/add`, {
        params,
      })
      .then((r) => {
        console.log(`Added question! ${r}`);
      });

    event.preventDefault();
  };

  handleStateUpdate = (event) => {
    if (event.target.name === "addTag" && event.key === " ") {
      // if space pressed in add tag input

      if (this.state.addedTags.includes(event.target.value.toLowerCase())) {
        // duplicate

        this.setState({
          hideDuplicateAlert: false,
          duplicateTag: event.target.value,
        });

        console.log(`Showing duplicate alert for tag ${event.target.value}`);
      } else if (event.target.value) {
        // not duplicate and tag is not empty, add to list

        this.setState({
          hideDuplicateAlert: true,
        });

        var tags = this.state.addedTags.concat([
          event.target.value.toLowerCase(),
        ]); // add tag
        this.setAddedTags(tags);
      }

      // empty the add tag input
      event.target.value = null;
      event.preventDefault();
    } else {
      console.log(
        `Set ${event.target.name + "Value "} to ${event.target.value}`
      );
      this.setState({ [event.target.name + "Value"]: event.target.value });
    }
  };

  removeTag = (tag) => {
    var tags = this.state.addedTags.filter((tagEntry) => tagEntry !== tag);
    this.setAddedTags(tags);
  };

  setAddedTags = (tags) => {
    this.setState({ addedTags: tags });
    console.log(`Set added tags to ${tags}`);
  };

  render() {
    return (
      <div id="QuestionAdd" className="col-md-12">
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="title"
              value={this.state.titleValue}
              placeholder="Title (required)"
              onChange={this.handleStateUpdate}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="content"
              value={this.state.contentValue}
              placeholder="Content"
              onChange={this.handleStateUpdate}
            />
          </div>
          <div className="form-group">
            {this.state.addedTags.map((tag) => {
              return (
                <button
                  key={tag}
                  type="button"
                  className="btn btn-outline-secondary rounded-pill m-1"
                  onClick={() => this.removeTag(tag)}
                >
                  {tag} <span>&times;</span>
                </button>
              );
            })}
          </div>
          <div
            className="alert alert-danger"
            hidden={this.state.hideDuplicateAlert}
          >
            You already used <b>{this.state.duplicateTag}</b>!
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="addTag"
              placeholder="Add tags (add with space)"
              onKeyPress={this.handleStateUpdate}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-primary"
              value="Submit Question"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default QuestionAdd;
