import React from 'react';
import axios from 'axios';
import './App.css';

function App() {
  
  let questions = []
  
  axios.get('http://localhost:3000/questions')
  .then(r => {
    questions = r.data
  })
  .catch(error => console.log(error))

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
