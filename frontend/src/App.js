import React, { Component } from "react";

import QuestionsPanel from "./components/QuestionsPanel";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="page-header">
            <h1>QA</h1>
          </div>
          <div className="jumbotron">
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
