import React, { Component } from "react";

import axios from "axios";

class QuestionAdd extends Component {
  state = {
    titleValue: "",
    descriptionValue: "",
    addedTags: [],
    answersValue: [],
    duplicateTag: "",
    hideDuplicateAlert: true,
    hideAddedAlert: true,
  };

  handleSubmit = (event) => {
    console.log(`Adding question: ${this.state.titleValue}`);

    const params = {
      title: this.state.titleValue,
      description: this.state.descriptionValue,
      tags: this.state.addedTags,
      answers: this.state.answersValue,
      sessionToken: "deeznutsXD", // set to sessionToken in cookies
    };

    axios.post(`http://localhost:3000/question/add`, params).then((r) => {
      console.log(r.data);
      this.setState({
        titleValue: "",
        descriptionValue: "",
        addedTags: [],
        duplicateTag: "",
        hideDuplicateAlert: true,
        addedTag: r.data.title,
        hideAddedAlert: false,
      });

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
        `Set ${event.target.name + "Value"} to ${event.target.value}`
      );

      this.setState({ [event.target.name + "Value"]: event.target.value });
      console.log(this.state.answersValue);
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
      <div id="QuestionAdd" className="card">
        <div className="card-header">
          <h5 className="d-inline">Add question</h5>
        </div>

        <div className="card-body">
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
              <textarea
                className="form-control"
                name="description"
                value={this.state.descriptionValue}
                placeholder="Description"
                rows="2"
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
              className="alert alert-success"
              hidden={this.state.hideAddedAlert}
            >
              Successfully submitted question <b>{this.state.addedTag}</b>!
            </div>
            <div
              className="alert alert-danger"
              hidden={this.state.hideDuplicateAlert}
            >
              You already used <b>{this.state.duplicateTag}</b>!
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                name="answers"
                value={this.state.answersValue}
                placeholder="Answers"
                rows="2"
                onChange={this.handleStateUpdate}
              />
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
                disabled={this.state.titleValue ? false : true}
                type="submit"
                className="btn btn-primary"
                value="Ask!"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default QuestionAdd;
