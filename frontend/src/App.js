import React, { Component } from 'react';

import QuestionsPanel from "./components/QuestionsPanel";

class App extends Component {
  state = {  }
  render() { 
    return (
      <div className="App">
        <div className="container">
          <p>Test</p>
          <span className="badge badge-primary">hello</span>
          <QuestionsPanel />
        </div>
      </div>
    );
  }
}
 
export default App;
