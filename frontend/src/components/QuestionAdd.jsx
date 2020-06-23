import React, { Component } from "react";

import axios from "axios";

class QuestionAdd extends Component {
  state = {
    titleValue: "",
    descriptionValue: "",
    addedTags: [],
    choicesValue: [],
    duplicateTag: "",
    hideDuplicateAlert: true,
    hideAddedAlert: true,
    choicesInput: [""],
  };

  componentDidMount = () => {
    var newChoice = this.state.choicesValue.concat("");
    this.setState({ choicesValue: newChoice });
  };

  handleSubmit = (event) => {
    console.log(`Adding question: ${this.state.titleValue}`);
    
    const params = {
      title: this.state.titleValue,
      description: this.state.descriptionValue,
      tags: this.state.addedTags,
      choices: this.state.choicesValue,
      sessionToken: "5eb5b31a-0acc-450c-85c2-c5b36da29b08", // TestUserMike
    };

    axios.post(`http://localhost:3000/question/add`, params).then((r) => {
      console.log(r.data);
      this.setState({
        titleValue: "",
        descriptionValue: "",
        addedTags: [],
        choicesValue: [""],
        choicesInput: [""],
        duplicateTag: "",
        hideDuplicateAlert: true,
        addedTag: r.data.title,
        hideAddedAlert: false,
      });

      console.log(`Added question! ${r}`);
    });

    event.preventDefault();
  };

  handleStateUpdate = (event, i) => {
    if (
      event.target.name === "addTag" &&
      (event.key === " " || event.key === ",")
    ) {
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

      // answers
    } else if (event.target.name === "choices") {
      console.log(this.state.choicesValue);
      this.setState({
        choicesValue: this.state.choicesValue.map((choice, index) =>
          i === index ? event.target.value : choice
        ),
      });
    } else {
      console.log(
        `Set ${event.target.name + "Value"} to ${event.target.value}`
      );

      this.setState({ [event.target.name + "Value"]: event.target.value });
      // console.log(this.state.answersValue);
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

  addChoicesInput = () => {
    var newChoice = this.state.choicesInput.concat("");
    var newChoices = this.state.choicesValue.concat("");
    this.setState({
      choicesInput: newChoice,
      choicesValue: newChoices,
    });
  };

  displayChoicesInput = () => {
    return this.state.choicesInput.map((_, i) => (
      <textarea
        key={i}
        ref={(input) => { this.choiceRef = input; }}
        className="form-control"
        name="choices"
        value={this.state.choicesValue[i]}
        placeholder="Choices"
        rows="1"
        onKeyDown={(e) => {
          if(e.shiftKey && e.key === " ") {
            this.addChoicesInput();
            this.choiceRef.focus();
            
          }
        }}
        onChange={(event) => this.handleStateUpdate(event, i)}
      />
    ));
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
            <div
              className="alert alert-danger"
              hidden={this.state.hideDuplicateAlert}
            >
              You already used <b>{this.state.duplicateTag}</b>!
            </div>
            <div className="form-group ">
              {this.displayChoicesInput()}
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={this.addAnswersInput}
              >
                <span aria-hidden="true">&#43;</span>
              </button>
              <br />
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
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="addTag"
                placeholder="Add tags (add with space)"
                onKeyPress={this.handleStateUpdate}
              />
            </div>
            <div
              className="alert alert-success"
              hidden={this.state.hideAddedAlert}
            >
              Successfully submitted question <b>{this.state.addedTag}</b>!
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
