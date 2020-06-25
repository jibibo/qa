import React, { Component } from "react";

import QuestionsPanel from "./components/QuestionsPanel";
import QuestionAdd from "./components/QuestionAdd";
// import Navbar from "./components/Navbar";

import Authentication from "./components/Authentication";
// import QuestionsDetail from "./components/QuestionDetail";

class App extends Component {
  render() {
    return (
      <>
        {/* <QuestionsDetail /> */}
        <div className="App">
          <div className="container">
            {/* <div className="page-header">
              <Navbar />
            </div> */}
            <div className="jumbotron shadow-lg">
              <div className="row">
                <div className="col-md-8">
                  <QuestionsPanel showSearchBar={true} />
                </div>
                <div className="col-md-4">
                  <QuestionAdd />
                  <br />
                  <Authentication />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
