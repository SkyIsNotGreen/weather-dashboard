// global vars
const API_KEY = "fb0d69912058c05c41b41d1bf7bd6b31";
const cityInput = $("#city-input");
const searchBtn = $("#search-btn");
const clearBtn = $("#clear-btn");
const searchHistory = $("#past-searches");

const renderCities = () => {
  // get recent cities from LS []
  // if [] is empty then render alert
  // else render all recent cities
  // add an event listener on div containing all cities
};

const renderCurrentWeather = (currentWeatherData) => {
  // render the current weather data and append to section
};

const renderForecastWeather = (forecastWeatherData) => {
  // render the forecast weather data and append each card to section
};

const renderWeatherData = (cityName) => {
  // use API to fetch current weather data
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

  // from the response cherry pick all the data you want to see in the current weather card

  // get the lat and lon from current weather data API response
  const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&appid=${API_KEY}`;

  // render current weather data

  // render forecast weather data
};

  // get the city name from cityInput and pass it to renderWeatherData
  // if city name is empty handle that
  // else add city name to search history
const handleFormSubmit = (event) => {
    event.preventDefault();
    const cityName = cityInput.val().trim();
    if (cityName) {
        renderWeatherData(cityName);
        cityInput.val("");
        } else {
        alert("Please enter a city name");
    }
    console.log(cityName);
};

const onReady = () => {
  // render recent cities
};

$(document).ready(onReady);
