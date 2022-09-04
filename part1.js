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
  if (citySelected == null) {
    alert("City not found. Please try again.");
    $("#inputcity").reset();
  }
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
        alert("City not found. Please try again.");
        $("#inputcity").empty();
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then(function(data) {
    
    var latVar = data.coord.lat;
    console.log(data);
    var longVar = data.coord.lon;
    var dayVar = moment(data.coord.dt).format("l");
    console.log(citySelected);
    $("#currentdate").innerHTML = dayVar;
    console.log(dayVar);
    var rawtemp = data.main.temp;
    console.log(rawtemp);
    var tempVar = (1.8 * (rawtemp - 273.15) + 32).toFixed(1);            //convert Kelvin to Farenheit
    console.log(tempVar);
    weatherIcon = data.weather[0].icon;
    console.log(weatherIcon);
    var weatherIconURL = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
    console.log(weatherIconURL);
    document.getElementById("icon").src = weatherIconURL;
   $("#city").append(" " + citySelected + "  " +  dayVar);
   $("#temp").append("Temperature   " + tempVar + "   degrees");
   $("#wind").append("Wind  " + data.wind.speed + "  mph");
   $("#humidity").append("Humidity    " + data.main.humidity + "%");

    uviURL = "http://api.openweathermap.org/data/2.5/uvi?&appid=" + apiKey + "&lat=" + latVar + "&lon=" + longVar;
 fetch(uviURL)
 .then((response) => {
  if (response.ok) {
    return response.json();
  } else {
    alert("City not found. Please try again.");
        $("#inputcity").reset();
    throw new Error("NETWORK RESPONSE ERROR");
  }
})
.then((data) => {
  console.log(data);
  console.log(data.value);
  })
.catch((error) => console.error("FETCH ERROR:", error));
$("#uvindex").append("UV" + data.value);
//if (uvIndexRange < 3) {
//    $("#uvindex").append("MINIMAL RISK" + '<br>' + "from unprotected sun exposure");
//} else if (uvIndexRange >= 3, uvIndexRange < 6) {
//    $("#uvindex").append("LOW RISK" + '<br>' + "from unprotected sun exposure");
//} else if (uvIndexRange >= 6, uvIndexRange < 8) {
//    $("#uvindex").append("MODERATE RISK" + '<br>' + "from unprotected sun exposure");
// } else if (uvIndexRange => 8) { $("#uvindex").append("HIGH RISK" + '<br>' + "from unprotected sun exposure");
//}
forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySelected + "&appid=" + apiKey
fetch(forecastURL)
  .then((response) => {
   if (response.ok) {
     return response.json();
   } else {
    alert("City not found. Please try again.");
    $("#inputcity").reset();
     throw new Error("NETWORK RESPONSE ERROR");

   }
   })
   .then ((data) => {
     console.log(data);
   })
   .catch((error) => console.error("FETCH ERROR:", error));

 var forecastEl = document.getElementsByClassName("forecast"); //write the 5 forecast blocks to screen line 42 html
 forecastEl.textContent = "Five Day Forecast";
 
 for (i = 0; i < 5; i++) {
   var dayVar2 = moment().add(i).format("l");
//   var icon2 = data.list[i].weather[0].icon;
//   var weatherIconURL2 = "http://openweathermap.org/img/w/" + icon2 + ".png";
//   var temp = data.main.temp;
  // var daycard = document.createElement("div").classList.add("card");
//   var dayimage = document.createElement("img").classList.add("card-img-top src= {weatherIconURL2 + i}");
 //  var daycardText = document.createElement("p").classList.add("card-text");
 // daycardText.append(dayVar2);
//   rawtemp = data.main.temp;
//   tempVar = (1.80 * (rawtemp - 273.15) + 32).toFixed(1);
//   daycardText.append({tempVar + i});
//   daycardText.append({data.wind.speed + i});
//   daycardText.append({data.main.humidity + i});  
 // forecastEl.append.daycard;
 }

//var citylistEl = document.getElementsByClassName("list-group");
//var citysearchedEl = document.createElement('li');    
//citysearchedEl.innerHTML = citySelected + '<br/>';
   
 })
}
