import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [forecast, setForecast] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const API_key = 'c6b32155da8f723b0a6fc3eb7cadb775'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_key}`
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_key}`

  // search function
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      setErrorMessage('')
      axios.get(url)
        .then((response) => {
          setData(response.data)
        })
        .catch(e => {
          setData({})
          setErrorMessage('Invalid city name. Please try again.');
        })
      axios.get(forecastURL)
        .then((response) => {
          setForecast(response.data)
        })
        .catch(e => {
          setForecast({})
          setErrorMessage('Invalid city name. Please try again.');
        })
      setLocation('')
    }
  }


  return (
    <div className="app">
      <div className="search">
        <input
          value = {location}
          onChange = {event => setLocation(event.target.value)}
          onKeyPress = {searchLocation}
          placeholder = 'Enter Location'
          type = 'text'/>
      </div>

      <div className = "error_message">
        {errorMessage}
      </div>

      <div className = "container">
        <div className = "top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1> {((data.main.temp-273.15) * 9/5 + 32).toFixed()}°F </h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {forecast.city !== undefined &&
          <div className = "middle">
            <h2>Forecast</h2>
            {forecast.list.slice(0, 7).map((item) => (
              <div key={item.dt_txt}>
                <div className = "time">
                  {item.dt_txt.slice(5, 16)}
                </div>
                <div className = "forecast_temp">
                  {((item.main.temp - 273.15) * 9/5 + 32).toFixed()}°F
                </div>
                <div className = "forecast_weather">
                  {item.weather[0].main}
                </div>
              </div>
            ))}
          </div>
        }

        {data.name !== undefined &&
          <div className = "bottom">
            <div className="feels">
              {data.main ? <p className="bold">{((data.main.feels_like-273.15) * 9/5 + 32).toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
            {data.main ? <p className="bold">{data.wind.speed.toFixed()}MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;

