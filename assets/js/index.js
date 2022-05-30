// global vars
const API_KEY = "fb0d69912058c05c41b41d1bf7bd6b31";
const cityInput = $("#city-input");
const searchBtn = $("#search-btn");
const clearBtn = $("#clear-btn");
const searchHistory = $("#search-history");

const renderCities = () => {
  // get recent cities from LS []
  // if [] is empty then render alert
  // else render all recent cities
  // add an event listener on div containing all cities
};

const getWeather = () => {
  const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&appid=${API_KEY}`;
};

// use API to fetch longitude and latitude and send response to getWeather
// store cityName, long and lat in local storage
const getCoords = (cityName) => {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
  const storedCities = JSON.parse(localStorage.getItem("cities")) || [];

  fetch(currentWeatherUrl)
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      const cityInfo = {
        city: cityName,
        lon: data.coord.lon,
        lat: data.coord.lat,
      };

      storedCities.push(cityInfo);
      localStorage.setItem("cities", JSON.stringify(storedCities));

      displaySearchHistory();
      
      return cityInfo;
    })

    .then(function (data) {
      getWeather(data);
    });

  return;
};

// get the city name from cityInput and pass it to renderWeatherData
// if city name is empty handle that
// else add city name to search history
const handleFormSubmit = (event) => {
  event.preventDefault();
  const cityName = cityInput.val().trim();

  if (cityName) {
    getCoords(cityName);
    cityInput.val("");

  } else {
    alert("Please enter a city name");
  }
};

 
// get search history from local storage
// display search history on page as buttons
// when button is clicked get the city name attached to the button and pass it to getCoords
const displaySearchHistory = () => {
  const storedCities = JSON.parse(localStorage.getItem("cities"));
  
  if (storedCities.length === 0) {
    searchHistory.text("No search history");
    
  } else {

    for (let i = 0; i < storedCities.length; i++) {
      const cityBtn = $("<button>");
      cityBtn.addClass("btn-outline-primary", "city-btn");
      cityBtn.attr("style", "width: 100%", "data-name", storedCities[i].city);
      cityBtn.text(storedCities[i].city);
      searchHistory.append(cityBtn);
    }
  

  }

};

//event listeners
searchBtn.on("click", handleFormSubmit);
searchHistory.on("click", ".city-btn", getCoords);

$(document).ready(displaySearchHistory);
