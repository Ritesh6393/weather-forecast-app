const axios = require('axios');
const cache = require('../config/cacheConfig');

const fetchWeatherData = async (city) => {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const cacheKey = `${city}-metric`; 
  const cachedWeather = cache.get(cacheKey);

  if (cachedWeather) {
    return cachedWeather;
  }
  
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
      },
    });

    const responseDate = response.headers.date;
    const date = new Date(response.data.dt * 1000);
    const dateTime = date.toLocaleString();

    const weatherData = {
      city: response.data.name,
      temperature: `${response.data.main.temp}`,
      feels_like: `${response.data.main.feels_like}`,
      humidity: `${response.data.main.humidity}%`,
      windSpeed: `${response.data.wind.speed} m/s`,
      description: response.data.weather[0].description,
      dateTime: dateTime,
      responseDate: responseDate
    };

    cache.set(cacheKey, weatherData);
    return weatherData;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // City not found
      return { error: 'City not found' };
    } else {
      // Other errors
      console.error('Error fetching weather data:', error);
      throw new Error('Unable to fetch weather data');
    }
  }
};

module.exports = { fetchWeatherData };