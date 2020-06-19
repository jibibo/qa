import React, { Component } from "react";

import QuestionsPanel from "./components/QuestionsPanel";
import QuestionAdd from "./components/QuestionAdd";
import Navbar from "./components/Navbar";

import Authentication from "./components/Authentication";
import Register from "./components/Register";
import Login from "./components/Login";

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
              <div className="col-md-8">
                <QuestionsPanel showSearchBar={true} />
              </div>
              <div className="col-md-4">
                <QuestionAdd />
                <Authentication />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
