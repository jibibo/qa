import React, { Component } from "react";

import QuestionsPanel from "./components/QuestionsPanel";
import QuestionAdd from "./components/QuestionAdd";
import Navbar from "./components/Navbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="page-header">
            <Navbar />
          </div>
          <div className="jumbotron">
            <div className="row">
              <QuestionAdd />
              <br />
              <QuestionsPanel showSearchBar={true} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
