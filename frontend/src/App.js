import React, { Component } from "react";

import QuestionsPanel from "./components/QuestionsPanel";
import Navbar from "./components/Navbar";
import axios from "axios";

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
              <QuestionsPanel showSearchBar={true} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
