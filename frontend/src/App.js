import React, { Component } from "react";

import QuestionsPanel from "./components/QuestionsPanel";
import axios from "axios";

class App extends Component {
  state = {
    questions: [],
    search: ''
  };

  fetchQuestions = () => {
    axios
      .get("http://localhost:3000/question/")
      .then(r => {
        this.setState({
          questions: r.data,
        });
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.fetchQuestions()
  }

  handleChange = (event) => { 
    
    this.setState({ search: event.target.value })
    console.log(this.state.search)
    axios
      .get(`http://localhost:3000/question/search/`, {
        params: {
          title: this.state.search
        }
      })
      .then(r => {
        this.setState({questions: r.data});
      })
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="page-header">
            <h1>QA</h1>
          </div>
          <div className="jumbotron">
            <div className="row">
              <div className="col-lg-11 col-md-10">
                <form onSubmit={e => { e.preventDefault(); }}>>
                  <input
                    type="text"
                    className="form-control"
                    name="question"
                    onChange={this.handleChange}
                    placeholder="Search questions..."
                  />
                </form>
              </div>
              
            </div>
            <div className="row">
              {this.state.questions.map(question => {
                return <QuestionsPanel key={question._id} questions={question}/>
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
