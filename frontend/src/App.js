import React from 'react';
import axios from 'axios';
import './App.css';

function App() {
  
  let questions = []

  axios.get('http://localhost:3000/questions')
  .then(res => {
    questions = r.data
  })

  return (
    <div className="App">
      <header className="App-header">

        <p>Test</p>
        <ul>
          {
          questions.forEach(q => {
            <li id={q._id}><b>{q.title}</b> by {q.author} (id = {q._id})</li>
          })
          }
        </ul>  
      
      </header>
    </div>
  );
}

export default App;
