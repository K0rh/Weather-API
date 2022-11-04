import React, { useState } from 'react';

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
    if (e.key === "Enter") {
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
      <div className="searchContainer">
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
      {weatherData == null ?
        <p>No city selected</p>
        :
        <div className="weatherContainer">
          <div className="cityDetails">
            <h1 className="cityName">{weatherData.name}</h1>
            <p>{weatherData.sys.country}</p>
          </div>
          <div className="weatherDataMain">
            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather logo" />
            <p>{weatherData.weather[0].description}</p>
          </div>
          <h2>Details</h2>
          <div className="weatherDataDetails">
            <p>{"Temperature : " + weatherData.main.temp + " °C"}</p>
            <p>{"Wind speed : " + weatherData.wind.speed + " m/s"}</p>
            <p>{"Humidity : " + weatherData.main.humidity + " %"}</p>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
