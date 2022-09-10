var apiKey = "355c56b4969485a6f6e12d1c5ad93d88";
var citiesSearched = [];
var citiesSearchedLocal =
  JSON.parse(localStorage.getItem("citiesSearched")) || [];

$(document).ready(function () {
  if (citiesSearched !== null) {
    citiesSearched2 = JSON.parse(localStorage.getItem("citiesSearched"));
  } else {
    $("#citysearched").empty(); //cities searched
    $("#todayweather").empty(); //5 day forecast
    $("#carddeck").empty(); //today's weather
  }
});

document.getElementById("submit-button")
  .addEventListener("click", handleSearchFormSubmit);


function handleSearchFormSubmit(event) {
  event.preventDefault();

//$("#todayweather").empty();
//$("#carddeck").empty();

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
  var queryString =
    "http://api.openweathermap.org/data/2.5/weather?q=" + citySelected + "&APPID=" + apiKey;
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
    .then(function (data) {
      var latVar = data.coord.lat;
      console.log(data);
      var longVar = data.coord.lon;
      var dayVar = moment(data.coord.dt).format("l");
      console.log(citySelected);
      $("#currentdate").innerHTML = dayVar;
      console.log(dayVar);
      var rawtemp = data.main.temp;
      console.log(rawtemp);
      var tempVar = (1.8 * (rawtemp - 273.15) + 32).toFixed(1); //convert Kelvin to Farenheit
      console.log(tempVar);
      weatherIcon = data.weather[0].icon;
      console.log(weatherIcon);
      var weatherIconURL = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
      console.log(weatherIconURL);
      document.getElementById("icon").src = weatherIconURL;
      $("#city").append(" " + citySelected + "  " + dayVar);
      $("#temp").append("Temp   " + tempVar + "   degrees");
      $("#wind").append("Wind  " + data.wind.speed + "  MPH");
      $("#humidity").append("Humidity    " + data.main.humidity + "%");

      uviURL =
        "http://api.openweathermap.org/data/2.5/uvi?&appid=" + apiKey + "&lat=" +
        latVar + "&lon=" + longVar;
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
          console.log(data.value);
          uvIndexRange = data.value;
          if (uvIndexRange < 3) {
            $("#uvindex").append(
              "MINIMAL RISK" + "<br>" + "from unprotected sun exposure");
          } else if ((uvIndexRange >= 3, uvIndexRange < 6)) {
            $("#uvindex").append(
              "LOW RISK" + "<br>" + "from unprotected sun exposure");
          } else if ((uvIndexRange >= 6, uvIndexRange < 8)) {
            $("#uvindex").append(
              "MODERATE RISK" + "<br>" + "from unprotected sun exposure");
          } else if ((uvIndexRange) => 8) {
            $("#uvindex").append(
              "HIGH RISK" + "<br>" + "from unprotected sun exposure");
          }
        });

      forecastURL =
        "http://api.openweathermap.org/data/2.5/forecast?q=" +
        citySelected +
        "&appid=" +
        apiKey;
      console.log(citySelected);
      fetch(forecastURL)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("NETWORK RESPONSE ERROR");
          }
        })
        .then((data) => {
          console.log(data);

          var forecastEl = document.getElementsByClassName("forecastDeck"); //write the 5 forecast blocks to screen line 42 html
          $("#deckheading").text("5 Day Forecast");

          for (let i = 0; i < 5; i++) {
            var dayVar2 = moment().add(i, "day").format("ll");
            console.log(dayVar2);
            var icon2 = data.list[i].weather[0].icon;
            console.log(icon2);
            var daycard = document.createElement("div");
            daycard.classList.add("card");
            daycard.classList.add("cardone");
            var dayimage = document.createElement("img");
            dayimage.classList.add("card-img-top");
            document.getElementsByClassName("card-img-top").src =
              "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";
           
            var rawtemp2 = data.list[i].main.temp;
            var tempVar2 = (1.8 * (rawtemp2 - 273.15) + 32).toFixed(1);
            var cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");
            cardTitle.append(dayVar2);

            var daycardText = document.createElement("ul");
            daycardText.classList.add("card-text", "list-group");
           var node1 = document.createElement("li");
           node1.classList.add("list-group-item");
           node1.append(data.list[i].weather[0].description);
            
            var node2 = document.createElement("li");
            node2.classList.add("list-group-item");
            node2.append(tempVar2 + "   degrees");
            
            var node3 = document.createElement("li");
            node3.classList.add("list-group-item");
            node3.append("Wind   " + data.list[i].wind.speed + "  MPH");
           
            var node4 = document.createElement("li");
            node4.classList.add("list-group-item");
            node4.append("Humidity   " + data.list[i].main.humidity + "%");
            
           daycardText.append(node1, node2, node3, node4);
           daycard.appendChild(dayimage);
           daycard.append(cardTitle);
           daycard.append(daycardText);
           document.getElementById("carddeck").append(daycard);
          }
          
          var citylistEl = document.getElementById("citysearched");
          var citysearchedEl = document.createElement("li");
          citysearchedEl.append(citySelected);
          document.getElementById("citysearched").append(citysearchedEl);
        });
    });
}
