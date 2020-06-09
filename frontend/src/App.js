import React from 'react';
import axios from 'axios';
import './App.css';

function App() {
  
  

  axios.get('http://localhost:3000/questions')
  .then(questions => {
    console.log(questions)
  })

  return (
    <div className="App">
      <header className="App-header">

        <p>Test</p>  
      
      </header>
    </div>
  );
}

export default App;
