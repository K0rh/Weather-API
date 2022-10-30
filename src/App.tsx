import React, { useState } from 'react';
import './App.css';

function App() {
  const [cityName, setCityName] = useState("London");
  const apiKey = "e5a7da137bfa07cb609ceb9e8957b235";

  fetch("http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=5&appid="+apiKey)
        .then(response => response.json())
        .then(data =>  console.log(data)); 

  return (
    <div className="App">
      <form className="searchForm">
        <label>
          Ville : <input />
        </label>
      </form>
      <button className="searchButton">Search</button>

      
    </div>
  );
}

export default App;
