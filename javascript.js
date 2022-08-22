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



searchFormEl.addEventListener('submit', handleSearchFormSubmit);

function handleSearchFormSubmit(event) {
  event.preventDefault();
  var citySelected = document.GetElementById("inputcity").value;
  citySelected = citySelected[0].toUpperCase() + citySelected.slice(1).toLowerCase();

//add instructions here to retrieve data from localStorage if this city has previously been selected
//for (i = 0; i < datasaved.(i); i++) {}
//if (localStorage.getItem(dataSaved.(i)[0]) === citySelected) {
// displaysavedWeather();
// } else run function fetchCoordinates

function fetchCoordinates() {

fetch("http://api.openweathermap.org/geo/1.0/direct?q=" +
citySelected + "&limit=1&appid=" + apiKey)

.then(function (response) {
  if (response.ok) {
    console.log(response);
    response.json().then(function (data) {
      const { lat , lon } = data;
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
  document.GetElementById("city").innerHTML = citySelected;
  document.GetElementById("currentdate").innerHTML = dayname1;
  document.GetElementById("weathericon").innerHTML = response.weather.icon;
  document.GetElementById("temp").innerHTML = (response.current.temp + "  degrees");
  document.GetElementById("wind").innerHTML = (response.current.wind_speed  + "  MPH");
  document.GetElementById("humidity").innerHTML = (response.current.humidity + "%");
  document.GetElementById("uvIndex").innerHTML = response.current.uvi;
}


function getForecast() {
  
  fetch("api.openweathermap.org/data/2.5/forecast?q=" + "lat=" + lat +
  "&lon=" + lon + "units=imperial&appid=" + apiKey)
  .then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        var forecastEl = document.getElementsByClassName("forecast");
        forecastEl[0].classList.add('loaded');
          var fday = "";
          data.daily.forEach((value, index) => {
            if (index > 0) {
              var dayname2 = new Date(value.dt * 1000).toLocaleDateString();
              var icon = value.weather[0].icon;
              var temp = value.temp.day.toFixed(0);
              fday = `<div class= "card  bg-primary text-white forecast-day">
                <p> class= "card-text" ${dayname2}</p>
                <p><span class= "card-text" ${icon}></span></p>
                <p> class= "card-text" ${temp}</p>
                <p> class= "card-text" ${wind}</p>
                <p> class= "card-text" ${humidity}</p>
              </div>`;
              forecastEl[0].insertAdjacentHTML('beforeend', fday);
            }
          });
      })
        
  
  } else {
    alert('Error: ' + response.statusText);
  }
  })
  .catch(function (error) {
  alert('Unable to connect to WeatherMap API');
  });
}
   
//var bodyContentEl = document.createElement('li');                        add city to page under search box
//bodyContentEl.classList.add( 'bg-secondary', 'text-white', 'rounded');
//bodyContentEl.innerHTML = citySelected + '<br/>';


//for (i = 0; i < datasaved.length; i+) {
//datasaved.(i)= [citySelected, response.current.dt, response.weather.icon, response.current.temp, response.current.wind_speed, response.current.humidity, response.current.uvi]                          stringify data, add city, change array name, store in localStorage

//localStorage.setItem(dataSaved.(i));
// }



//function displaysavedWeather() {                                  retrieve array from localStorage and display saved data-I don't think this is right
// localStorage.getItem(dataSaved.(i));
//document.GetElementById("city").innerHTML = dataSaved.(i)[0];
//document.GetElementById("currentdate").innerHTML = dataSaved.(i)[1];
//document.GetElementById("weathericon").innerHTML = dataSaved.(i)[2];
//document.GetElementById("temp").innerHTML = dataSaved.(i)[3];
//document.GetElementById("wind").innerHTML = dataSaved.(i)[4];
//document.GetElementById("humidity").innerHTML = dataSaved.(i)[5] ;
//document.GetElementById("uvIndex").innerHTML = dataSaved.(i)[6];
//}