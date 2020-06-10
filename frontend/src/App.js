import React, { Component } from "react";

import QuestionSearch from "./components/QuestionSearch";
import QuestionsPanel from "./components/QuestionsPanel";
import Navbar from "./components/Navbar";
import axios from "axios";

class App extends Component {
  state = {
    questions: [],
    search: "",
  };

  fetchQuestions = () => {
    axios
      .get("http://localhost:3000/question/")
      .then((r) => {
        this.setState({
          questions: r.data,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.fetchQuestions();
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="page-header">
            <Navbar />
          </div>
          <div className="jumbotron">
            <div className="row">
              <QuestionSearch />
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
