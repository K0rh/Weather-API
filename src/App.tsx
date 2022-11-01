import React, { useState } from 'react';
import './App.css';

type Weather = {
  "coord": {
    "lon": number,
    "lat": number
  },
  "weather": [
    {
      "id": number,
      "main": string,
      "description": string,
      "icon": string
    }
  ],
  "base": string,
  "main": {
    "temp": number,
    "feels_like": number,
    "temp_min": number,
    "temp_max": number,
    "pressure": number,
    "humidity": number,
    "sea_level": number,
    "grnd_level": number
  },
  "visibility": number,
  "wind": {
    "speed": number,
    "deg": number,
    "gust": number
  },
  "rain": {
    "1h": number
  },
  "clouds": {
    "all": number
  },
  "dt": number,
  "sys": {
    "type": number,
    "id": number,
    "country": string,
    "sunrise": number,
    "sunset": number
  },
  "timezone": number,
  "id": number,
  "name": string,
  "cod": number
};

function App() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState<Weather | null>(null);
  const apiKey = "e5a7da137bfa07cb609ceb9e8957b235";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCityName(e.target.value);
  }

  function handleEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter"){
      e.preventDefault();
      fetchData();
    }
  }

  function fetchData() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + apiKey)
      .then(response => response.json())
      .then(data => setWeatherData(data));
  }

  return (
    <div className="App">
      <div className="serachContainer">
        <form className="searchForm">
          <input
            type="text"
            placeholder="Enter city..."
            value={cityName}
            onChange={handleChange}
            onKeyDown={handleEnterKey}
          />
        </form>
        <button className="searchButton" onClick={() => fetchData()}>Search</button>
      </div>
      <div>
        {weatherData == null ?
          <p>No city selected</p>
          :
          <div className="weatherDataContainer">
            <p>{weatherData.name}</p>
            <p>{weatherData.weather[0].main}</p>
            <p>{weatherData.main.temp + " °C"}</p>
            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather image" />
          </div>
        }
      </div>
    </div>
  );
}

export default App;
