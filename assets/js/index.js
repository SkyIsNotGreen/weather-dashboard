// global vars
const API_KEY = "fb0d69912058c05c41b41d1bf7bd6b31";
const cityInput = $("#city-input");
const searchBtn = $("#search-btn");
const clearBtn = $("#clear-btn");
const cityBtn = $(".city-btn");
const searchHistory = $("#search-history");


// use API to fetch weather data via lat-long and render selected data on the page
const getWeather = (data) => {

  const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=current,minutely,hourly&units=metric&appid=${API_KEY}`;

  fetch(forecastWeatherUrl)
    .then((response) => {
      return response.json();
    })

    .then((data) => {

      // current weather
      const currentConditionsEl = $('#currentConditions');
      currentConditionsEl.addClass('border border-primary');
      
      // create city name h2 and append to currentConditionsEl
      const cityName = data.timezone.split("/")[1];
      const cityNameEl = $("<h2>");
      cityNameEl.text(cityName);
      currentConditionsEl.append(cityNameEl);
     
      // get date from response and append
      const date = (data.dt);
      const dateEl = $("<h4>");
      dateEl.text(moment(date).format("MMMM Do YYYY"));
      currentConditionsEl.append(dateEl);

      // get weather icon and append           
      const icon = (data.daily[0].weather[0].icon);
      const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
      const iconEl = $("<img>");
      iconEl.attr("src", iconUrl);
      iconEl.attr("alt", "weather icon");
      iconEl.attr("style", "width: 100px");
      currentConditionsEl.append(iconEl);

      // get current temp and append
      const temp = (data.daily[0].temp.day);
      const tempEl = $("<h4>");
      tempEl.text(`Temp: ${temp}°C`);
      currentConditionsEl.append(tempEl);

      // get current wind speed and append 
      const windSpeed = (data.daily[0].wind_speed);
      const windSpeedEl = $("<h4>");
      windSpeedEl.text(`Wind Speed: ${windSpeed} KPH`);
      currentConditionsEl.append(windSpeedEl);

      // get current humidity and append
      const humidity = (data.daily[0].humidity);
      const humidityEl = $("<h4>");
      humidityEl.text(`Humidity: ${humidity}%`);
      currentConditionsEl.append(humidityEl);

      // get current uv index and append, set background color based on uv index
      const uvIndex = (data.daily[0].uvi);
      const uvIndexEl = $("<h4>");
      uvIndexEl.text(`UV Index: ${uvIndex}`);
      currentConditionsEl.append(uvIndexEl);

      // if uv index is less than 3, set background color to green
      if (uvIndex < 3) {
        uvIndexEl.attr("style", "background-color: green");
      }
      // if uv index is between 3 and 7, set background color to yellow
      if (uvIndex >= 3 && uvIndex < 6) {
        uvIndexEl.attr("style", "background-color: yellow");
      }
      // if uv index is between 7 and 10, set background color to red
      if (uvIndex >= 6) {
        uvIndexEl.attr("style", "background-color: red");
      }

      // ---FIVE DAY FORECAST---

      //create header for five day forecast
      const fiveDayForecastEl = $("<h2>");
      fiveDayForecastEl.text("5-Day Forecast:");
      $("#fiveDayForecast").append(fiveDayForecastEl);

      // get key weather data for each day of the week
      for (let i = 1; i < 6; i++) {

        // create div for each day of the week
        const dayOfWeek = $("<div>");
        dayOfWeek.addClass("card bg-light mb-3");
        $("#fiveDayForecast").append(dayOfWeek);

        // create date for each day of the week
        const dayOfWeekDate = $("<p>");
        dayOfWeekDate.text(moment().add(i, 'days').format('dddd'));
        dayOfWeek.append(dayOfWeekDate);

        // create icon for each day of the week
        const dayOfWeekIcon = $("<img>");
        dayOfWeekIcon.attr("src", `https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`);
        dayOfWeekIcon.attr("alt", "weather icon");
        dayOfWeekIcon.attr("style", "width: 100px");
        dayOfWeek.append(dayOfWeekIcon);

        // create temp for each day of the week
        const dayOfWeekTemp = $("<p>");
        dayOfWeekTemp.text(`Temp: ${data.daily[i].temp.day}°C`);
        dayOfWeek.append(dayOfWeekTemp);

        // create wind speed for each day of the week
        const dayOfWeekWindSpeed = $("<p>");
        dayOfWeekWindSpeed.text(`Wind Speed: ${data.daily[i].wind_speed} KPH`);
        dayOfWeek.append(dayOfWeekWindSpeed);

        // create humidity for each day of the week
        const dayOfWeekHumidity = $("<p>");
        dayOfWeekHumidity.text(`Humidity: ${data.daily[i].humidity}%`);
        dayOfWeek.append(dayOfWeekHumidity);
      }

    });
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

    .then((data) => {
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


const handleClearHistory = () => {
  localStorage.clear();
  displaySearchHistory();
};
 
// get search history from local storage
// display search history on page as buttons
// when button is clicked get the city name attached to the button and pass it to getCoords
const displaySearchHistory = () => {
  const storedCities = JSON.parse(localStorage.getItem("cities"));
  
  if (storedCities === null) {
    searchHistory.text("No search history found");
    
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

// when button is clicked get the city name attached to the button and pass it to getCoords
const handleCityBtnClick = () => {
  $(".city-btn").on("click", (event) => {
    const cityName = $(event.currentTarget).attr("data-name");
    getCoords(cityName);
  });
};



//event listeners
searchBtn.on("click", handleFormSubmit);
clearBtn.on("click", handleClearHistory);
cityBtn.on("click", handleCityBtnClick);
$(document).ready(displaySearchHistory);
