
const { fetchWeatherData } = require('../services/weatherService');

const getWeather = async (req, res) => {
  const { city } = req.query;
  const initialUnit = 'metric'; 

  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    
    const weatherData = await fetchWeatherData(city, initialUnit);
    return res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
};

module.exports=getWeather;
