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

const countries = require('country-data').countries;

function App() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState<Weather | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const apiKey = "e5a7da137bfa07cb609ceb9e8957b235";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCityName(e.target.value);
    setErrorMessage("");
  }

  function handleEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchData();
    }
  }

  function fetchData() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + apiKey)
      .then(response => {
        if (response.ok) {
          response.json().then(data => setWeatherData(data));
        }
        else {
          setErrorMessage(`No city named "${cityName}" in the database...`);
        }
      })
      setCityName("");
  }

  function capitalizeFirst (str : String) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="App">
      <h1>Simple Weather App</h1>
      <div className="searchContainer">
        <form className="searchForm">
          <input
            className="cityInput"
            type="text"
            placeholder="Enter city..."
            value={cityName}
            onChange={handleChange}
            onKeyDown={handleEnterKey}
          />
        </form>
        <button className="searchButton" onClick={() => fetchData()}>Search</button>
      </div>
      {errorMessage && (
        <p className="error"> {errorMessage} </p>
      )}
      {weatherData == null ?
        <p>Please select a city</p>
        :
        <div className="weatherContainer">
          <div className="cityDetails">
            <h2 className="cityName">{weatherData.name}</h2>
            <p className="countryName">({countries[weatherData.sys.country].name})</p>
          </div>
          <div className="weatherDataMain">
            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather logo" />
            <p>{capitalizeFirst(weatherData.weather[0].description)}</p>
          </div>
          <h3>Details</h3>
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
