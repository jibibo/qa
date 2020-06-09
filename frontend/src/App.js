import React from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const questionsList = []
  
  axios.get('http://localhost:3000/questions')
  .then(questions => {
    questions.data.forEach(question => {
      console.log(question)
    })
  })
  .catch(error => console.log(error))

  

  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
