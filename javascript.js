/* OpenWeatherMap is a free API which requires longitude/latitude or zip code to get weather data
/*logitude/latitude is available from Geocoding API
/*steps: 
/*1. define variables
/*2. handle form input (prevent default,convert to uppercase, compare city name to geocoding api
/*3. fetch weather data from OpenWeatherMap for city and display on screen
/*4. fetch 5-day forecast from OpenWeatherMap for city and display on screen
/*5. store data in local storage(setItem)
/*6. retrieve data from local storage (getItem) if user clicks same city again
*/


var apiKey = "355c56b4969485a6f6e12d1c5ad93d88";
var searchFormEl = $("#submit-button");
var citiesSearched = [];


searchFormEl.addEventListener('submit', handleSearchFormSubmit);

function handleSearchFormSubmit(event) {
  event.preventDefault();
  var citySelected = document.GetElementById("inputcity").value;
  citySelected = citySelected[0].toUpperCase() + citySelected.slice(1).toLowerCase();


//add instructions here to retrieve data from localStorage if this city has previously been selected
//for (i = 0; i < citiesSearched.length; i++) {
//if (citySelected = citiesSearched(i)) {
//  getWeather();
// } else { fetchCoordinates(); }


function fetchCoordinates() {

fetch("http://api.openweathermap.org/geo/1.0/direct?q=" +
citySelected + "&limit=1&appid=" + apiKey)

.then(function (response) {
  if (response.ok) {
    console.log(response);
    response.json().then(function (data) {
      var { lat , lon } = data;
      console.log(data);  
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
        console.log(data);  
  });
  } else {
    alert('Error: ' + response.statusText);
  }
  })
  .catch(function (error) {
  alert('Unable to connect to WeatherMap API');
  });

  var dayname1 = new Date(value.dt * 1000).toLocaleDateString();

  $("#city").innerHTML = citySelected;
  $("#currentdate").innerHTML = dayname1;
  $("#weathericon").innerHTML = response.weather.icon;
  $("#temp").innerHTML = (response.current.temp + "  degrees");
  $("#wind").innerHTML = (response.current.wind_speed  + "  MPH");
  $("#humidity").innerHTML = (response.current.humidity + "%");
  $("#uvIndex").innerHTML = response.current.uvi;
}


function getForecast() {
  
  fetch("api.openweathermap.org/data/2.5/forecast?q=" + "lat=" + lat +
  "&lon=" + lon + "units=imperial&appid=" + apiKey)
  .then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);  
      });   
    } else {
      alert('Error: ' + response.statusText);
    }
    })
    .catch(function (error) {
    alert('Unable to connect to WeatherMap API');
    });

        var forecastEl = document.getElementsByClassName("forecast");   //write the 5 forecast blocks to screen
        var fday = "";
           for (i = 0; i < 5; i++) {

              var dayname2 = new Date(value.dt * 1000).toLocaleDateString();
              var icon = value.weather.icon;
              var temp = value.temp.day;
              fday = `<div class= "card  bg-primary text-white forecast-day">
                <p> class= "card-text" ${"#currentdate" + i}</p>
                <p><span class= "card-text" ${"#weathericon" + i}></span></p>
                <p> class= "card-text" ${"#temp" + i}</p>
                <p> class= "card-text" ${"#wind" + i}</p>
                <p> class= "card-text" ${"#humidity" + i}</p>
              </div>`;
            }
      
      }
        
//var bodyContentEl = document.createElement('li');                        add city to page under search box
//bodyContentEl.classList.add( 'bg-secondary', 'text-white', 'rounded');
//bodyContentEl.innerHTML = citySelected + '<br/>';
//citiesSearched = citiesSearched.push(citySelected);