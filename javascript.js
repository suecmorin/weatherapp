//OpenWeatherMap is a free API which requires longitude/latitude or zip code to get weather data
//logitude/latitude is available from Geocoding API


var apiKey = "355c56b4969485a6f6e12d1c5ad93d88";
var citiesSearched = [];
var citiesSearchedLocal = JSON.parse(localStorage.getItem("citiesSearched")) || [];

$(document).ready(function() {
if (citiesSearched !== null) {
  citiesSearched2 = JSON.parse(localStorage.getItem("citiesSearched"));
} else {
  $(".list-group").empty();  //cities searched
  $(".card-group").empty();   //5 day forecast
  $("col-sm-10").empty();    //today's weather
}
})

document.getElementById("submit-button").addEventListener("click", handleSearchFormSubmit);

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var citySelected = document.getElementById("inputcity").value;
  citiesSearched.push.citySelected;  
  localStorage.setItem("citiesSearched", JSON.stringify(citiesSearched));
  console.log(citySelected);

  fetchWeather(citySelected);
}


function fetchWeather() {
  var citySelected = document.getElementById("inputcity").value;
  var queryString = "http://api.openweathermap.org/data/2.5/weather?q=" + citySelected + "&APPID=" + apiKey;
  fetch(queryString)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then(function(data) {
  
  var latVar = data.coord.lat;
  console.log(data);
  var longVar = data.coord.lon;
  var dayVar = moment.(data.coord.dt).format("l");
  $("#city").innerHTML = citySelected;
  $("#currentdate").innerHTML = dayVar;
  $("#weathericon").innerHTML = data.weather[0].icon;
  var rawtemp = data.main.temp;
  var tempVar = ((rawtemp - 273.15) * 1.80 + 32).toFixed(1);            //convert Kelvin to Farenheit
  $("#temp").innerHTML = tempVar + "degrees";
  $("#wind").innerHTML = data.wind.speed;
  $("#humidity").innerHTML = data.main.humidity + "%";
 console.log(rawtemp);
  

 uviURL = "http://api.openweathermap.org/data/2.5/uvi?&appid=" + apiKey + "&lat=" + latVar + "&lon=" + longVar;
 fetch(uviURL)
 .then((response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("NETWORK RESPONSE ERROR");
  }
})
.then((data) => {
  console.log(data);
  })
.catch((error) => console.error("FETCH ERROR:", error));

    $("#uvindex").innerHTML = data.value;
    console.log(data);

  forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySelected + "&appid=" + apiKey
 fetch(forecastURL)
   .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE ERROR");

    }
    })
    .then ((data) => {
      console.log(data);
    })
    .catch((error) => console.error("FETCH ERROR:", error));

  var forecastEl = document.getElementsByClassName("forecast"); //write the 5 forecast blocks to screen line 42 html
  var forecastcard = "";
  for (i = 0; i < 5; i++) {
    var dayVar2 = moment.(data.coord.dt).format("l");
    var icon2 = data.weather[0].icon;
    var temp = data.main.temp;
    //var daycard = document.createElement("div");
    //daycard.setAttribute("class","card  bg-primary text-white forecast-day");
   // var daycard-text = document.createElement("p");
   //var daycard-text.setAttribute("class", "card-text");
    forecastcard = `<div class= "card  bg-primary text-white forecast-day">
                <p> class= "card-text" ${"#currentdate" + i}</p>
                <p><span class= "card-text" ${"#weathericon" + i}></span></p>
                rawtemp = data.main.temp;
                tempVar = ((rawtemp - 273.15) * 1.80 + 32).toFixed(1);   
                <p> class= "card-text" ${"#temp" + i}</p>
                <p> class= "card-text" ${"#wind" + i}</p>
                <p> class= "card-text" ${"#humidity" + i}</p>
              </div>`;
  }

var citylistEl = document.getElementsByClassName("list-group");
var citysearchedEl = document.createElement('li');    
citysearchedEl.innerHTML = citySelected + '<br/>';



    })
  }
