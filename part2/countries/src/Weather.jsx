import React, { useEffect, useState } from "react";
import axios from "axios";

const Img = ({ weatherData }) => {
  if (weatherData) {
    return (
      <img
        className="weather-icon"
        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt="Weather Icon"
      />
    );
  }
  return null;
};

const Weather = ({ country, apikey }) => {
  const lat = country.capitalInfo.latlng[0];
  const lng = country.capitalInfo.latlng[1];

  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apikey}&units=metric`
      )
      .then((res) => {
        setWeatherData(res.data);
        setError(null); // Clear any previous errors
      })
      .catch((e) => {
        setError("There was an error fetching weather data.");
        console.error("Error fetching weather data:", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [lat, lng, apikey]);

  if (isLoading) {
    return <p>Loading weather data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="weather-container">
      <h2>Weather in {country.name.common}</h2>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <Img weatherData={weatherData} />
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
