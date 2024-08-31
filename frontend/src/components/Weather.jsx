import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; 

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (weather) {
      document.getElementById('weather-container').style.backgroundColor = getBackgroundColor(weather.temperature);
    }
  }, [weather]);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/weather`, {
        params: { city },
      });

      const weatherData = response.data;

      // Store the original temperature and convert based on the unit
      weatherData.temperatureCelsius = parseFloat(weatherData.temperature);
      weatherData.feelsLikeInCelsius=parseFloat(weatherData.feels_like);
      if (unit === 'imperial') {
        weatherData.temperature = convertToFahrenheit(weatherData.temperatureCelsius);
        weatherData.feels_like=convertToFahrenheit(weatherData.feelsLikeInCelsius);
      }

      setWeather(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const convertToFahrenheit = (temperatureInCelsius) => {
    return (temperatureInCelsius * 9/5 + 32).toFixed(2);
  };

  const convertToCelsius = (temperatureInFahrenheit) => {
    return ((temperatureInFahrenheit - 32) * 5/9).toFixed(2);
  };

  const handleUnitToggle = () => {
    if (unit === 'metric') {
      setUnit('imperial');
      if (weather) {
        setWeather({
          ...weather,
          temperature: convertToFahrenheit(weather.temperatureCelsius),
          feels_like: convertToFahrenheit(weather.feelsLikeInCelsius)
        });
      }
    } else {
      setUnit('metric');
      if (weather) {
        setWeather({
          ...weather,
          temperature: convertToCelsius(weather.temperature),
          feels_like: convertToCelsius(weather.feels_like)
        });
      }
    }
  };

  const getBackgroundColor = (temperature) => {
    let temp = parseFloat(temperature);
    if(unit==='imperial'){
        temp=((temperature - 32) * 5/9).toFixed(2);
    }
    
    if (temp < 0) return '#00f'; 
    if (temp < 10) return '#0ff'; 
    if (temp < 20) return '#ffcc99'; 
    if (temp < 30) return '#ff9966'; 
    return '#f00'; 
  };

  return (
    <div id="weather-container" className="flex flex-col items-center p-4 min-h-screen transition-colors duration-500 rounded-xl">
      <div className="mb-4 flex w-full max-w-md">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 w-full rounded-l-md hover:bg-blue-50"
        />
        <button onClick={fetchWeather} className="bg-blue-500 text-white p-2 ml-2 rounded-r-md">
          Get Weather
        </button>
        <button onClick={handleUnitToggle} className="bg-green-500 text-white p-2 ml-2 rounded-md">
          {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
        </button>
      </div>

      {loading && (
        <div className="w-full max-w-md">
          <Skeleton height={40} count={5} className="mb-4" />
        </div>
      )}

      {weather && (
        <div className="mt-4 bg-blue-50 p-6 rounded-lg shadow-lg w-full max-w-md transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">{weather.city}</h2>
          <p className="text-lg mb-2 text-gray-700">
            Temperature: {weather.temperature}°{unit === 'metric' ? 'C' : 'F'}
          </p>
          <p className="text-lg mb-2 text-gray-700">
            Feels Like: {weather.feels_like}°{unit === 'metric' ? 'C' : 'F'}
          </p>
          <p className="text-lg mb-2 text-gray-700">Humidity: {weather.humidity}</p>
          <p className="text-lg mb-2 text-gray-700">Wind Speed: {weather.windSpeed}</p>
          <p className="text-lg mb-2 text-gray-700">Description: {weather.description}</p>
          <div className="text-lg text-gray-700 bg-blue-300 rounded-md">Date and Time
            <p className="mt-2">{weather.dateTime}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
