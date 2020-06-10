import React, { Component } from "react";

import QuestionsPanel from "./components/QuestionsPanel";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="page-header">
            <h1>QA</h1>
          </div>
          <div className="jumbotron">
            <div className="row">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="search"
                  placeholder="Search questions..."
                />
              </div>
              <btn class="btn btn-primary">Search</btn>
            </div>
            <div className="row">
              <QuestionsPanel />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
