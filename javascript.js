/* OpenWeatherMap is a free API which requires longitude/latitude or zip code to get weather data
/*logitude/latitude or zip code data is available from Geocoding API
/*steps 0. define variables
/* 1. handle form input (prevent default,convert to uppercase, compare city name to geocoding api
/*2. fetch weather data from OpenWeatherMap for city and display on screen
/*3. fetch 5-day forecast from OpenWeatherMap for city and display on screen
/*4. store data in local storage(setItem)
/*5. retrieve data from local storage (getItem) if user clicks same city again
*/


var apiKey = "355c56b4969485a6f6e12d1c5ad93d88";
var searchFormEl = $("#submit-button");



searchFormEl.addEventListener('submit', handleSearchFormSubmit);

function handleSearchFormSubmit(event) {
  event.preventDefault();
  var citySelected = document.GetElementById("inputcity").value;
  citySelected = citySelected[0].toUpperCase() + citySelected.slice(1).toLowerCase();

//add instructions here to retrieve data from localStorage if this city has previously been selected
//if (localStorage.getItem(dataSaved[0]) === citySelected) {
// displaysavedWeather();
// } else run function fetchCoordinates

var coordinates = function (fetchCoordinates) {

fetch("http://api.openweathermap.org/geo/1.0/direct?q=" +
citySelected + "&limit=1&appid=" + apiKey)

.then(function (response) {
  if (response.ok) {
    console.log(response);
    response.json().then(function (data) {
      const { lat , lon } = place;
      console.log(place);  
});
} else {
  alert('Error: ' + response.statusText);
}
})
.catch(function (error) {
alert('Unable to connect to WeatherMap API');
});
};
}

function getWeather() {
  fetch("https://api.openweathermap.org/data/3.0/onecall?" +
  "lat=" + lat + "&lon=" + lon + "units=imperial&appid=" + apiKey)
  .then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        var data = [ current.dt , current.weather.description , current.uvi , current.temp , current.humidity, current.wind_speed , current.weather.icon];
        console.log(data);  
  });
  } else {
    alert('Error: ' + response.statusText);
  }
  })
  .catch(function (error) {
  alert('Unable to connect to WeatherMap API');
  });

  document.GetElementById("city").innerHTML = citySelected;
  document.GetElementById("currentdate").innerHML = data[0];
  document.GetElementById("temp").innerHTML = data[3];
  document.GetElementById("wind").innerHTML = data[5];
  document.GetElementById("humidity").innerHTML = data[4];
  document.GetElementById("uvIndex").innerHTML = data[2];
}


function getForecast() {
  fetch("api.openweathermap.org/data/2.5/forecast?q=" + "lat=" + lat +
  "&lon=" + lon + "units=imperial&appid=" + apiKey)
  .then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        var data = { };
        console.log(data);  
  });
  } else {
    alert('Error: ' + response.statusText);
  }
  })
  .catch(function (error) {
  alert('Unable to connect to WeatherMap API');
  });


}
//data = JSON.stringify(data);                           stringify data, add city, change array name, store in localStorage
//data = data.unshift(citySelected);
//data = dataSaved;
//localStorage.setItem(dataSaved);
//var bodyContentEl = document.createElement('li');                        add city to page under search box
//bodyContentEl.classList.add( 'bg-seconary', 'text-white', 'rounded');
 // bodyContentEl.innerHTML = citySelected + '<br/>';





//function displaysavedWeather() {                                  retrieve array from localStorage and display saved data
// localStorage.getItem(dataSaved);
//document.GetElementById("city").innerHTML = dataSaved[0];
//document.GetElementById("currentdate").innerHTML = dataSaved[1];
//document.GetElementById("temp").innerHTML = dataSaved[4];
//document.GetElementById("wind").innerHTML = dataSaved[6];
//document.GetElementById("humidity").innerHTML = dataSaved[5] ;
//document.GetElementById("uvIndex").innerHTML = dataSaved[3];
//}