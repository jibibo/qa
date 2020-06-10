import React, { Component } from "react";

class Question extends Component {
  state = {
    id: 4,
  };
  render() {
    return <h1>Some question (id: {this.state.id})</h1>;
  }
}

export default Question;
