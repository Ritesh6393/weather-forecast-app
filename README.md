# Weather Forecast Application

## Overview

This application provides current weather information based on the city name entered by the user. It uses the OpenWeatherMap API to fetch weather data.
It changes backgroud color according to temperature of the selected city.

## Getting Started

To get started, you will need an API key from OpenWeatherMap. 

1. **Sign up** at [OpenWeatherMap](https://home.openweathermap.org/users/sign_up) to get your API key.
2. **Set up your environment** by creating a `.env` file in the root directory and adding your API key:
    ```
    OPENWEATHERMAP_API_KEY=your_api_key_here
    ```

## API Documentation

### **API Endpoint**

**Base URL:** `https://api.openweathermap.org/data/2.5/weather`

**Method:** `GET`

### **Query Parameters**

- **`q`**: (Required) City name. Example: `q=London`
- **`appid`**: (Required) Your OpenWeatherMap API key.
- **`units`**: (Optional) Units of measurement. `metric` for Celsius and `imperial` for Fahrenheit. Default is `metric`.

### **Request Examples**

- **Celsius:**
  ```http
  GET https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric
### ** Response Frmat **
{
  "coord": {
    "lon": -0.1257,
    "lat": 51.5085
  },
  "weather": [
    {
      "id": 802,
      "main": "Clouds",
      "description": "scattered clouds",
      "icon": "03d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 15.0,
    "feels_like": 14.3,
    "temp_min": 14.0,
    "temp_max": 16.0,
    "pressure": 1013,
    "humidity": 77
  },
  "visibility": 10000,
  "wind": {
    "speed": 4.1,
    "deg": 340
  },
  "clouds": {
    "all": 40
  },
  "dt": 1609459200,
  "sys": {
    "type": 1,
    "id": 1414,
    "country": "GB",
    "sunrise": 1609443567,
    "sunset": 1609492606
  },
  "timezone": 0,
  "id": 2643743,
  "name": "London",
  "cod": 200
}
### **Fields of Interest:**

name: City name.
main.temp: Current temperature.
main.feels_like: Feels like temperature.
main.humidity: Humidity percentage.
wind.speed: Wind speed.
weather[0].description: Weather description.

### caching is used for lesser api calls and faster user experience

